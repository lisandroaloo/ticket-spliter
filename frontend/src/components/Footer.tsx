import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" w-full h-[17vh] flex items-center  justify-center  bg-neutral-800 text-white">
      <div className="flex flex-col md:flex-row md:gap-4 gap-3 items-center justify-center md:justify-around w-full  ">
        <h3 className="m-0 text-sm">Ticket Splitter</h3>
        <ul className="flex flex-col md:flex-row md:gap-4  mb-0 p-0">
          <Link  className="no-underline text-white" to={"/"}>Home</Link>
          <Link className="no-underline text-white  " to={"/signup"}>Get Started</Link>
        </ul>
        <h4 className="m-0 text-sm">copyright reservado :value</h4>
      </div>
    </footer>
  );
};

export default Footer;