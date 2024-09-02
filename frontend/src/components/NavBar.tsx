import React from 'react'
import { Link } from 'react-router-dom'



const NavBar = () => {
  return (
    <nav className="w-full bg-gray-900 h-[60px] absolute top-0 flex items-center justify-between ">
      <div className='pl-4'>
        <Link to="/" className="flex items-center" >
          <WalletIcon className="text-white" />

        </Link>
      </div>
      <div className="flex gap-4 items-center pr-6">
        <Link
          to="/LogIn"
          className="text-sm font-medium text-white hover:text-gray-300"
        >
          Login
        </Link>
        <Link
          to="/SignUp"
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm "
        >
          Sign Up
        </Link>
      </div>
    </nav>
  )
}

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
  )
}

export default NavBar