import React from "react";
import service from "../../../assets/service.png";

const ServiceComp = () => {
  const serviceItems = [
    {
      image: service,
      title: "Express  & Standard Delivery",
      description:
        "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
    },
    {
      image: service,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
    },
    {
      image: service,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      image: service,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      image: service,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      image: service,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <div className="bg-secondary p-10 rounded-2xl my-15">
      <div className="flex items-center justify-center flex-col space-y-10 md:space-y-3">
        <h2 className="text-5xl text-white font-bold">Our Services</h2>
        <h3 className="md:text-lg text-gray-300 text-center font-medium md:w-4xl ">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  w-full  justify-between">
        {serviceItems.map((item, i) => (
          <div
            key={i}
            className="mt-10 w-80 mx-auto bg-gray-200 hover:bg-primary transition-all flex flex-col items-center justify-center rounded-2xl  p-5 space-y-3"
          >
            <img className="w-10" src={item.image} alt="image" />
            <div className="text-2xl text-secondary font-bold">
              {item.title}
            </div>
            <div className="text-md text-center text-secondary-content">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceComp;
