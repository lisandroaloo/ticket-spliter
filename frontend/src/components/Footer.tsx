import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" w-full h-[17vh] flex items-center  justify-center  bg-green-800 text-green-200">
      <div className="flex flex-col md:flex-row md:gap-4 gap-3 items-center justify-center md:justify-around w-full  ">
        <h3 className="m-0 text-sm">Ticket Spliter</h3>
        <ul className="flex flex-col md:flex-row md:gap-4 mb-0 p-0">
          <Link  className="no-underline text-green-200" to={"/"}>Home</Link>
          <Link className="no-underline text-green-200  " to={"/signup"}>Comenzar</Link>
        </ul>
        <h4 className="m-0 text-sm">copyright reservado</h4>
      </div>
    </footer>
  );
};

export default Footer;
