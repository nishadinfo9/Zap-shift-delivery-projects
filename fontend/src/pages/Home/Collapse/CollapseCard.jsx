import React from "react";

const CollapseCard = ({ question = "", answer = "" }) => {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-plus border-base-300 border mx-auto bg-gray-200 w-sm md:w-5xl"
    >
      <div className="collapse-title font-bold">{question}</div>
      <div className="collapse-content text-sm">{answer}</div>
    </div>
  );
};

export default CollapseCard;
