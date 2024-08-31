import React from 'react'
import { Link } from 'react-router-dom'



const NavBar = () => {
  return (
    <nav className="w-full bg-gray-600 h-[60px] absolute top-0 flex items-center justify-between">
      <div>
        <Link
          to="/"
          className="text-sm font-medium hover:text-gray-200 text-gray-950 pl-8"
        >
          Home
        </Link>
      </div>
      <div className="flex gap-4">
        <Link
          to="/LogIn"
          className="text-sm font-medium hover:text-gray-200 text-gray-950"
        >
          Login
        </Link>
        <Link
          to="/SignUp"
          className="text-sm font-medium hover:text-gray-200 text-gray-950 pr-8"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  )
}

export default NavBar