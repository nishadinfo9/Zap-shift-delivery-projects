import React from "react";
import location from "../../../assets/location-merchant.png";
import merchant from "../../../assets/be-a-merchant-bg.png";

const MerchantComp = () => {
  return (
    <div className="relative bg-secondary flex items-center py-10 justify-start md:h-80 md:w-5xl  mx-auto rounded-lg">
      <img src={merchant} alt="" className="absolute top-0 w-auto" />
      <div className="flex flex-col gap-8 md:gap-5 md:w-2xl px-5 md:px-10 ">
        <h2 className="md:text-3xl font-bold text-white">
          Merchant and Customer Satisfaction is Our First Priority
        </h2>
        <p className="text-gray-200 md:text-sm text-xs ">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex items-center gap-5">
          <button className="btn btn-primary text-secondary rounded-3xl">
            Become a Merchant
          </button>
          <button className="btn bg-transparent border-primary rounded-3xl text-primary">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>
      <img
        className="w-32 md:w-80 absolute md:right-5 right-2"
        src={location}
        alt=""
      />
    </div>
  );
};

export default MerchantComp;
