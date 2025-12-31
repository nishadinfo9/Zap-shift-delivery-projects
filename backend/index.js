const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const admin = require("firebase-admin");
const serviceAccount = require("./zap-shift-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const verifyFirebaseToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split(" ")[1];
  if (!token) {
    return res.send({ message: "token does not exist" });
  }

  const decoded = await admin.auth().verifyIdToken(token);
  if (!decoded) {
    return res
      .status(403)
      .json({ message: "decoded token does not match forbeden" });
  }
  req.token_email = decoded.email;
  next();
};

//tracking Id
function generateTrackingId() {
  const prefix = "ZPSH";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  const time = Date.now().toString().slice(-5);

  return `${prefix}-${date}-${random}${time}`;
}

//db client
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("zap-shift");
    const parcelCollection = db.collection("parcel");
    const paymentsCollection = db.collection("payments");
    const userCollection = db.collection("users");
    const riderCollection = db.collection("riders");

    //controller

    //user
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      if (!newUser) {
        return res.status(401).json({ message: "user info does not exist" });
      }
      const email = newUser.email;

      const existUser = await userCollection.findOne(email);
      if (existUser) {
        return res.status(401).send({ message: "user already exist" });
      }

      newUser.createdAt = new Date();
      newUser.role = "user";
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    //get parcel
    app.get("/parcels", verifyFirebaseToken, async (req, res) => {
      const email = req.query.email;
      if (email !== req.token_email) return res.status(403);

      const query = {};
      if (email) {
        query.senderEmail = email;
      }
      const options = { sort: { createdAt: -1 } };
      const cursor = parcelCollection.find(query, options);
      const result = await cursor.toArray();
      res.send(result);
    });

    //create
    app.post("/parcel", async (req, res) => {
      const newParcel = req.body;
      if (!newParcel) return;
      newParcel.createdAt = new Date();
      const result = await parcelCollection.insertOne(newParcel);
      res.send(result);
    });

    app.delete("/parcel/:id", async (req, res) => {
      const id = req.params.id;
      if (!id) return;
      const query = { _id: new ObjectId(id) };
      const result = await parcelCollection.deleteOne(query);
      res.send(result);
    });

    //payments releted api
    app.get("/parcel/:id", async (req, res) => {
      const id = req.params.id;
      if (!id) return;
      const query = { _id: new ObjectId(id) };
      const result = await parcelCollection.findOne(query);
      res.send(result);
    });

    //payments session
    app.post("/payment-session", async (req, res) => {
      const paymentInfo = req.body;
      if (!paymentInfo) return;

      const amount = parseInt(paymentInfo.cost) * 100;

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "USD",
              unit_amount: amount,
              product_data: {
                name: paymentInfo.parcelName,
              },
            },

            quantity: 1,
          },
        ],
        customer_email: paymentInfo.senderEmail,
        metadata: {
          parcelId: paymentInfo.parcelId,
          name: paymentInfo.parcelName,
        },
        mode: "payment",
        success_url: `${process.env.DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.DOMAIN}/dashboard/payment-cancelled`,
      });
      res.send({ url: session?.url });
    });

    // verifyPayment

    app.patch("/verify-payment", async (req, res) => {
      const { session_id } = req.query;
      if (!session_id) {
        return res.status(409).json({ message: "session id does not exist" });
      }
      const session = await stripe.checkout.sessions.retrieve(session_id);
      console.log("session", session);
      if (!session) {
        return res.status(401).json({ message: "session not found" });
      }
      const trackId = generateTrackingId();
      if (session.payment_status === "paid") {
        const id = session.metadata.parcelId;
        const query = { _id: new ObjectId(id) };

        const updated = {
          $set: {
            paymentStatus: "paid",
            trackingId: trackId,
          },
        };
        await parcelCollection.updateOne(query, updated);

        const payments = {
          parcelId: session.metadata.parcelId,
          parcelName: session.metadata.parcelName,
          transactionId: session.payment_intent,
          senderEmail: session.customer_email,
          paymentStatus: session.payment_status,
          currency: session.currency,
          amount: session.amount_total / 100,
          paidAt: new Date(),
          trackingId: trackId,
        };

        const existPayments = await paymentsCollection.findOne({
          parcelId: session.metadata.parcelId,
          transactionId: session.payment_intent,
        });

        console.log("existPayments", existPayments);

        if (!existPayments) {
          await paymentsCollection.insertOne(payments);
        }
      }
      res.status(200).json({
        success: true,
        trackingId: trackId,
        transactionId: session.payment_intent,
      });
    });

    app.get("/payments", verifyFirebaseToken, async (req, res) => {
      const email = req.query.email;
      if (email !== req.token_email) return res.status(403);

      const query = {};
      if (email) {
        query.senderEmail = email;
      }

      const options = { sort: { paidAt: -1 } };
      const cursor = paymentsCollection.find(query, options);
      const result = await cursor.toArray();
      res.send(result);
    });

    //rider releted apis
    app.post("/rider", async (req, res) => {
      const newRider = req.body;
      if (!newRider) return;
      const query = { riderEmail: newRider.riderEmail };
      const existRider = await riderCollection.findOne(query);
      if (existRider) {
        return res.status(401).json({ message: "rider already exist" });
      }

      newRider.status = "pending";
      newRider.appliedAt = new Date();

      const result = await riderCollection.insertOne(newRider);
      res.send(result);
    });

    app.get("/riders", async (req, res) => {
      const query = {};
      if (req.query.status) {
        query.status = req.query.status;
      }

      const options = { sort: { appliedAt: -1 } };
      const cursor = riderCollection.find(query, options);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.delete("/rider/delete/:id", async (req, res) => {
      const id = req.params.id;
      if (!id) return;
      const query = { _id: new ObjectId(id) };
      const result = await riderCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/rider/update/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      const query = { _id: new ObjectId(id) };

      const updatedRider = {
        $set: {
          status,
        },
      };

      const result = await riderCollection.updateOne(query, updatedRider);
      res.send(result);
    });

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  } finally {
  }
}
run();

// call batabases
client
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running now on port: ${port}`);
    });
  })
  .catch(console.dir);
