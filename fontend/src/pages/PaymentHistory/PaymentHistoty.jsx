import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentHistoty = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [] } = useQuery({
    queryKey: "payments",
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2>Payments</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Sender Email</th>
              <th>Amount</th>
              <th>Tracking No</th>
              <th>Transation Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, i) => (
              <tr>
                <td>{payment.parcelName}</td>
                <td>{payment.senderEmail}</td>
                <td>{payment.amount}</td>
                <td>{payment.trackingId}</td>
                <td>{payment.transactionId}</td>
                <td>
                  <button className="btn">Action</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoty;
