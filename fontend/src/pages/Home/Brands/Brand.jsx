import React from "react";
import Marquee from "react-fast-marquee";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";

const brandsItems = [
  casio,
  moonstar,
  randstad,
  star,
  start_people,
  amazon_vector,
];

const Brand = () => {
  return (
    <div className="md:my-30 my-10">
      <h2 className="md:text-2xl text-lg font-bold my-10 text-secondary text-center">
        We've helped thousands of sales teams
      </h2>
      <Marquee play={true} pauseOnHover={true} gradient={true}>
        <div className="flex md:gap-20 gap-5">
          {brandsItems.map((item, i) => (
            <img className="" key={i} src={item} alt={item} />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Brand;
