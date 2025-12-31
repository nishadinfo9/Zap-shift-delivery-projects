import React from "react";
import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";

const TrackingCom = () => {
  const trackItem = [
    {
      title: "Live Parcel Tracking",
      image: liveTracking,
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind",
    },
    {
      title: "100% Safe Delivery",
      image: safeDelivery,
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      title: "24/7 Call Center Support",
      image: liveTracking,
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <div className=" my-20 space-y-5">
      {trackItem.map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-center p-5 mx-auto bg-gray-200 md:w-5xl w-sm rounded-md space-y-5"
        >
          <div className="w-sm ">
            <img src={item.image} alt="" />
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="md:w-full ">
            <h3 className="md:text-3xl font-bold text-secondary mb-3">
              {item.title}
            </h3>
            <p className="">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackingCom;
