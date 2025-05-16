// import React from 'react'
import { FaCog } from "react-icons/fa";
import { TbLockCog } from "react-icons/tb";

import avatar from "../../assets/profile.png";
// import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();

  useEffect(() => {
    // Check if a message was passed via navigate
    // console.log(user.usertype);
    if (location?.state?.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <ToastContainer />
      <div className="relative w-[80%] p-5 shadow-lg shadow-black">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="relative z-10 grid auto-rows-min gap-4 md:grid-cols-3 w-full">
          {/* <Skeleton className="aspect-video rounded-xl" />{" "} */}
          {user.usertype == "Admin" ? (
            <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around hover:p-1 hover:bg-[#ffffffac]">
              <h1 className="font-bold text-[#0077ff94]">Doctors</h1>
              <div className="text-4xl text-red-600 font-bold">
                {user?.doctorsNum}
              </div>
              <NavLink
                to={"/user/doctors/record"}
                className="cursor-pointer hover:underline decoration-2 decoration-blue-500 hover:underline-offset-4 hover:underline-blue"
              >
                View ➡️
              </NavLink>
            </div>
          ) : (
            <></>
          )}

          {user.usertype == "Doctor" || user.usertype == "Admin" ? (
            <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around hover:p-1 hover:bg-[#ffffffac]">
              <h1 className="font-bold text-[#0077ff94]">Patients</h1>
              <div className="text-4xl text-red-600 font-bold">
                {user?.patientsNum || 0}
              </div>
              <NavLink
                to={"/user/patients/record"}
                className="cursor-pointer hover:underline decoration-2 decoration-blue-500 hover:underline-offset-4 hover:underline-blue"
              >
                View ➡️
              </NavLink>
            </div>
          ) : (
            <></>
          )}

          <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around hover:p-1 hover:bg-[#ffffffac]">
            <h1 className="font-bold text-[#0077ff94]">Appointments</h1>
            <div className="text-4xl text-red-600 font-bold">
              {user?.appointmentsNum || 0}
            </div>
            <NavLink
              to={"/user/appointments"}
              className="cursor-pointer hover:underline decoration-2 decoration-blue-500 hover:underline-offset-4 hover:underline-blue"
            >
              View ➡️
            </NavLink>
          </div>

          {user.usertype == "Admin" || user.usertype == "Doctor" ? (
            <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around hover:p-1 hover:bg-[#ffffffac]">
              <h1 className="font-bold text-[#0077ff94]">Outbreaks</h1>
              <div className="text-4xl text-red-600 font-bold">
                {user?.outbreaksNum || 0}
              </div>
              <NavLink
                to={"/user/likely/outbreaks"}
                className="cursor-pointer hover:underline decoration-2 decoration-blue-500 hover:underline-offset-4 hover:underline-blue"
              >
                View ➡️
              </NavLink>
            </div>
          ) : (
            <></>
          )}

          <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around hover:p-1 hover:bg-[#ffffffac]">
            <h1 className="font-bold text-[#0077ff94]">Profile Updation</h1>
            <div className="relative text-4xl text-red-600 font-bold">
              <span>
                <img
                  src={user.profilePicture || avatar}
                  alt="profile Img"
                  className="border-2 border-gray-100 w-[80px] h-[80px] object-cover rounded-full shadow-lg cursor-pointer"
                />
              </span>
              <span className="absolute bottom-[-2px] right-[-6px] text-[#0077ffae]">
                <FaCog />
              </span>
            </div>
            <NavLink
              to={"/user/profile/update"}
              className="cursor-pointer hover:underline decoration-2 decoration-blue-500 hover:underline-offset-4 hover:underline-blue"
            >
              View ➡️
            </NavLink>
          </div>
          {/* <Skeleton className="aspect-video rounded-xl" />{" "} */}
          <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around hover:p-1 hover:bg-[#ffffffac]">
            <h1 className="font-bold text-[#0077ff94]">Change Password</h1>
            <div className="text-4xl text-red-600 font-bold">
              <span className="text-black text-5xl font-black">
                <TbLockCog />
              </span>
            </div>
            <NavLink
              to={"/user/password/update"}
              className="cursor-pointer hover:underline decoration-2 decoration-blue-500 hover:underline-offset-4 hover:underline-blue"
            >
              View ➡️
            </NavLink>
          </div>

          {user.usertype == "Patient" ? (
            <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around hover:p-1 hover:bg-[#ffffffac]">
              <h1 className="font-bold text-[#0077ff94]">Book Appointment</h1>
              <div className="text-4xl text-red-600 font-bold">
                {user?.outbreaksNum || 0}
              </div>
              <NavLink
                to={"/user/book/appt"}
                className="cursor-pointer hover:underline decoration-2 decoration-blue-500 hover:underline-offset-4 hover:underline-blue"
              >
                View ➡️
              </NavLink>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
