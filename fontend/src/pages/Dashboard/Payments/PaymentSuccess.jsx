import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../utils/Loader";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({});
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("session id does not exist");
      return;
    }
    if (sessionId) {
      axiosSecure
        .patch(`/verify-payment?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            trackingId: res.data?.trackingId,
            transactionId: res.data?.transactionId,
          });
          setError(null);
        })
        .catch((err) => {
          console.log(err);
          setError("Failed to verify payment.");
        })
        .finally(() => setLoading(false));
    }
  }, [sessionId]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card bg-base-100 shadow-xl p-8 max-w-md text-center">
        <AiOutlineCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />

        <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>

        <p className="text-base-content/70 mb-6">
          Thank you! Your payment has been processed successfully.
        </p>

        {/* Tracking Details */}
        <div className="bg-base-200 p-4 space-y-2 rounded-lg text-left mb-6">
          <p className="font-semibold text-sm">
            Tracking ID:{" "}
            <span className="text-secondary">{paymentInfo.trackingId}</span>
          </p>
          <p className="font-semibold text-sm">
            Transaction ID:{" "}
            <span className="text-secondary">{paymentInfo.transactionId}</span>
          </p>
        </div>

        <button
          className="btn btn-primary text-secondary w-full"
          onClick={() => (window.location.href = "/dashboard/payment-history")}
        >
          Track Your Parcel
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
