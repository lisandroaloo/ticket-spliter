import React from "react";
import {ICard} from "../../interfaces"

const FeatureCard = ({ icon, title, description }: ICard) => {
  return (
    <div className="bg-green-300 text-green-950 flex flex-col p-4 gap-4 rounded-xl shadow-md ">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
        <i className={`${icon} text-black text-xl`}></i>
      </div>
      <h3 className="text-xl2">{title}</h3>
      <h4 className="text-xl">{description}</h4>
    </div>
  );
};

export default FeatureCard;
