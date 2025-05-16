// import React from 'react'

import { refreshUserType } from "@/store/reducers/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/HI2.png";

const PublicNav = () => {
  const Dispatch = useDispatch();
  const { userType } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  // console.log(userType);
  const handleOptionChange = (e) => {
    Dispatch(refreshUserType(e.target.value));
  };
  return (
    <nav className="w-full h-[12%] bg-[#65adff] flex justify-between items-center px-5">
      <Link
        to={"/"}
        className="image-container hover:scale-110 w-44 h-28 rounded-md overflow-hidden"
      >
        <img src={logo} alt="logo" className="w-full h-full object-contain" />
      </Link>

      {pathname === "/register" ? (
        <div className="button-holder h-[90%] w-40 ml-[20%] bg-secondarylite rounded-md flex justify-around items-center  border-2 overflow-hidden">
          <div className="admin-container h-20 w-10 flex flex-col justify-center gap-1">
            <div className="image h-10 w-10 overflow-hidden rounded-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7TKHo1NrGHSRkso1dt1oE04qoPOGEKCiUA&s"
                alt="admin-image"
                className="object-cover bg-white"
              />
            </div>
            {/* This radio input is checked after changing of state value from central redux store */}
            <input
              type="radio"
              name="admin"
              value="A"
              onChange={handleOptionChange}
              checked={userType === "A"}
            />
          </div>
          <div className="admin-container h-20 w-10 flex flex-col justify-center gap-1">
            <div className="image h-10 w-10 overflow-hidden rounded-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnRq8BM8VIsSVPCy3ragERgTK892-oYfhx_Q&s"
                alt="admin-image"
                className="object-cover "
              />
            </div>
            <input
              type="radio"
              name="doctor"
              value="D"
              onChange={handleOptionChange}
              checked={userType === "D"}
            />
          </div>
          <div className="admin-container h-20 w-10 flex flex-col justify-center gap-1">
            <div className="image h-10 w-10 overflow-hidden rounded-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx4WPMRwUZHH4CIYhmmhdmOPjBP03sSfRshQ&s"
                alt="admin-image"
                className="object-cover "
              />
            </div>
            <input
              type="radio"
              name="patient"
              value="P"
              onChange={handleOptionChange}
              checked={userType === "P"}
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="nav-content">
        <ul className="flex justify-between gap-2 h-10">
          <NavLink
            to="/"
            className={(e) =>
              `group relative inline-block overflow-hidden rounded  px-5 py-3 text-sm font-medium text-slate-800 hover:text-white focus:outline-none ${
                e.isActive ? "shadow-md shadow-white " : ""
              }`
            }
          >
            <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-200 group-hover:h-full"></span>
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-200 group-hover:h-full"></span>
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className={(e) =>
              `group relative inline-block overflow-hidden rounded  px-5 py-3 text-sm font-medium text-slate-800 hover:text-white focus:outline-none ${
                e.isActive ? "shadow-md shadow-white " : ""
              }`
            }
          >
            <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-200 group-hover:h-full"></span>
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-200 group-hover:h-full"></span>
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            className={(e) =>
              `group relative inline-block overflow-hidden rounded  px-5 py-3 text-sm font-medium text-slate-800 hover:text-white focus:outline-none ${
                e.isActive ? "shadow-md shadow-white " : ""
              }`
            }
          >
            <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-200 group-hover:h-full"></span>
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-200 group-hover:h-full"></span>
            Contact
          </NavLink>
          <NavLink
            to="/login"
            className={(e) =>
              `group relative inline-block overflow-hidden rounded  px-5 py-3 text-sm font-medium text-slate-800 hover:text-white focus:outline-none ${
                e.isActive ? "shadow-md shadow-white " : ""
              }`
            }
          >
            <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-200 group-hover:h-full"></span>
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-200 group-hover:h-full"></span>
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={(e) =>
              `group relative inline-block overflow-hidden rounded  px-5 py-3 text-sm font-medium text-slate-800 hover:text-white focus:outline-none ${
                e.isActive ? "shadow-md shadow-white text-slate-50" : ""
              }`
            }
          >
            <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-200 group-hover:h-full"></span>
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-200 group-hover:h-full"></span>
            Register
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default PublicNav;
