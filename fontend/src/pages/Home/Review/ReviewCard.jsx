import React from "react";
import { FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({ reviewData }) => {
  const { review, user_photoURL: image, userName, ratings } = reviewData;
  return (
    <div className="card text-primary-content w-60">
      <div className="card-body flex bg-gray-200 rounded-2xl gap-5">
        <FaQuoteRight className="text-3xl text-secondary" />
        <p className="text-gray-900">{review}</p>
        <div className="flex items-center justify-center gap-5">
          <img
            className="w-10 h-10 rounded-full bg-secondary"
            src={image}
            alt="review-profile"
          />
          <div>
            <h2 className="text-secondary text-lg font-bold">{userName}</h2>
            <p className="text-yellow-500">{ratings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
