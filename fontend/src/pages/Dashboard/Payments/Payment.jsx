import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../utils/Loader";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();

  const { data: parcel = [], isLoading } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  console.log(parcel);

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
    };
    const res = await axiosSecure.post(`/payment-session`, paymentInfo);
    window.location.assign(res.data.url);
  };

  return (
    <div>
      <h2>Payment {parcel.cost}</h2>
      <button
        onClick={handlePayment}
        className="btn btn-primary text-secondary"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
