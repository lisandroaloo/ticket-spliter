import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useLogOut from "../../hooks/UseLogout";

const NavBarNotLogged = () => {




  return (
    <nav className="w-full bg-green-200 text-green-950 h-[8vh] top-0 flex items-center justify-between ">
      <div className="pl-4">
        <Link
          to="/"
          className="flex items-center"
        >
          <WalletIcon className="text-green-950 hover:text-green-500" />
        </Link>
      </div>
      <div className="flex gap-4 items-center pr-6">
        <Link
          to="/LogIn"
          className="text-sm font-medium text-green-950 no-underline hover:text-green-500"
        >
          Iniciar Sesion
        </Link>
        <Link
          to="/SignUp"
          className="rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-950 shadow-sm no-underline hover:text-green-500"
        >
          Registrarse
        </Link>
      </div>
    </nav>
  )
};

function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

export default NavBarNotLogged;
