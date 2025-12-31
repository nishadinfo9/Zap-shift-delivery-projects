import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";

const WorkComp = () => {
  const workItems = [
    {
      icons: <CiDeliveryTruck />,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icons: <CiDeliveryTruck />,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icons: <CiDeliveryTruck />,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icons: <CiDeliveryTruck />,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <div className="my-15 md:mx-20 ">
      <h2 className="text-3xl font-bold text-secondary">How it Works</h2>
      <div className="flex flex-wrap mx-auto gap-10 mt-5 w-full items-center justify-center md:justify-between">
        {workItems.map((item, i) => (
          <div
            key={i}
            className="md:w-60 md:h-60 w-80 h-80 mx-auto flex flex-col justify-center md:justify-start bg-gray-200 rounded-2xl space-y-10 md:space-y-2 p-5"
          >
            <p className="text-7xl text-secondary ">{item.icons}</p>
            <div className="text-lg text-secondary font-semibold">
              {item.title}
            </div>
            <div className="text-sm text-secondary-content">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkComp;
