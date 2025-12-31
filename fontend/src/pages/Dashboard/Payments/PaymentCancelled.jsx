import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card bg-base-100 shadow-xl p-8 max-w-md text-center">
        <AiOutlineCloseCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />

        <h2 className="text-3xl font-bold mb-2">Payment Cancelled</h2>
        <p className="text-base-content/70 mb-6">
          The payment was cancelled. You can try again anytime.
        </p>

        <button
          className="btn btn-error w-full"
          onClick={() => (window.location.href = "/")}
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentCancelled;
