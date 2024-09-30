import React from "react";
import { ICard } from "../../interfaces"

const FeatureCard = ({ icon, title, description }: ICard) => {
  return (
    <div className="bg-gradient-to-br items-center from-emerald-400 to-green-500 text-emerald-50 flex flex-col p-6 gap-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
        <i className={`${icon} text-emerald-600 text-2xl`}></i>
      </div>
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <p className="text-lg text-emerald-100 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
