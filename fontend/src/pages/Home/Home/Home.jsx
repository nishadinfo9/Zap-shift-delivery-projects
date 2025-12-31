import React from "react";
import Banner from "../Banner/Banner";
import WorkComp from "../Work-Component/WorkComp";
import ServiceComp from "../Service-Component/ServiceComp";
import Brand from "../Brands/Brand";
import ReviewGallary from "../Review/ReviewGallary";
import Collapse from "../Collapse/Collapse";
import TrackingCom from "../Tracking-Components/TrackingCom";
import MerchantComp from "../Merchant-Component/MerchantComp";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <WorkComp />
      <ServiceComp />
      <Brand />
      <TrackingCom />
      <MerchantComp />
      <ReviewGallary />
      <Collapse />
    </div>
  );
};

export default Home;
