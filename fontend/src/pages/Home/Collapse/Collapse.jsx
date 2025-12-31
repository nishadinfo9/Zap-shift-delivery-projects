import React from "react";
import CollapseCard from "./CollapseCard";

const Collapse = () => {
  return (
    <div className="text-center ">
      <div className="space-y-5 mb-10">
        <h2 className="md:text-5xl font-bold text-secondary text-center">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-md mx-auto text-center md:w-3xl">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <CollapseCard
        question="How does this posture corrector work?"
        answer=" A posture corrector works by providing support and gentle alignment to
        your shoulders, back, and spine, encouraging you to maintain proper
        posture throughout the day. Here’s how it typically functions: A posture
        corrector works by providing support and gentle alignment to your
        shoulders."
      />
      ;
      <CollapseCard
        question="Is it suitable for all ages and body types?"
        answer=""
      />
      ;
      <CollapseCard
        question="Does it really help with back pain and posture improvement?"
        answer=""
      />
      ;
      <CollapseCard
        question="Does it have smart features like vibration alerts?"
        answer=""
      />
      ;
      <CollapseCard
        question="How will I be notified when the product is back in stock?"
        answer=""
      />
      ;
    </div>
  );
};

export default Collapse;
