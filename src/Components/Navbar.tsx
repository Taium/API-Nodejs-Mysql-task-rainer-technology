import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [tbutton,setTbutton]=useState<boolean>(false)
  const [user,setUser]=useState<any>()
  
  let navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();

    navigate("/login");
  };

  const handleclick=()=>{
    setTbutton(!tbutton)
  }
  useEffect(() => {
    setUser(localStorage.userInfo ? JSON.parse( localStorage.userInfo):null)
  }, [localStorage.userInfo])
 
  return (
    <div>
      {/* <header className="py-5 shadow">
        <div className="navbar bg-base-100 container mx-auto md:px-20">
          <div className="navbar-start flex-1">
            <div className="dropdown">
              <label className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"></ul>
            </div>
            <Link to="/" className="font-semibold text-2xl">
              Doctors Portal
            </Link>
          </div>

          <div className="flex-none gap-2 ">
            <div className="hidden lg:flex">
              <ul className="flex gap-5 p-0 mr-5">
                <li>
                  <NavLink className="px-3 py-2" to="appointment">
                    Appointments
                  </NavLink>
                </li>

                <li>
                  <NavLink className="px-3 py-2" to="/login">
                    Login
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="dropdown dropdown-end ">
              <label className="btn btn-ghost btn-circle avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img className="" alt="" />
                </div>
              </label>
              <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <NavLink to="/profile" className="justify-between">
                    Profile
                    <span className="badge">taium</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                    }}
                    to="/login"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header> */}
     

<nav className="container flex justify-around py-8 mx-auto bg-white">
  <div className="flex items-center">
    <h3 className="text-2xl font-medium text-blue-500">LOGO</h3>
  </div>
  {/* <!-- left header section --> */}
  <div className="items-center hidden space-x-8 lg:flex">
  <NavLink className="px-3 py-2" to="/">
  <a >Home</a>
                  </NavLink>
    
                  <NavLink className="px-3 py-2" to="/appointment">
  <a href="">Appointment</a>
                  </NavLink>
    <a href="">Blogs</a>
    <a href="">Our Team</a>
    <NavLink className="px-3 py-2" to="/signup">
  <a href="">Registration</a>
                  </NavLink>
    {!localStorage.userID &&
      <NavLink className="px-3 py-2" to="/login">
  <a href="">Login</a>
                  </NavLink>}
  </div>
  {/* <!-- right header section --> */}
  <div className="flex items-center space-x-2">
    <a href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    </a>
    <a href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>

    </a>
    
    
 
        {localStorage.userID &&
          <div className="inline-flex bg-white border rounded-md">
            <a
                
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"
            >
                {user?.name}
            </a>

            <div className="relative">
                <button
                onClick={handleclick}
                    type="button"
                    className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                { tbutton &&
                  <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                    <div className="p-2">
                    <NavLink  to="/appointmentlist">
                        <a
                            
                            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                        >
                            My Appointment List
                        </a>
                        </NavLink>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                        >
                           Edit profile
                        </a>
                        <a
                            
                            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                        >
                          <button
                          onClick={handleLogOut}>
                            LogOut
                            </button>
                        </a>
                    </div>
                </div>}
            </div>
        </div>}

    

  </div>
</nav>

    </div>
  );
};

export default Navbar;
