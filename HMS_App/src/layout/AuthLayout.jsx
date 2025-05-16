// import React from 'react'
import { AppSidebar } from "@/components/custom/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import logo from "../assets/Hi2.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const [route, setRoute] = useState("Dashboard");
  useEffect(() => {
    // console.log(location.pathname.split("/")[2]);
    setRoute(location.pathname.split("/").slice(2).join("-"));
  }, [location]);
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* <AuthNav /> */}
      <SidebarProvider>
        <AppSidebar />
        <main className="relative w-full h-screen overflow-y-auto">
          <div className="z-100 fixed flex  w-full h-20">
            <SidebarTrigger className="hover:bg-transparent" />
            <div className="bg-[#0077ff3a] w-full h-full flex items-center">
              <Link
                to={"/user/dashboard"}
                className="image-container hover:scale-105 duration-300 w-44 h-28 rounded-md overflow-hidden"
              >
                <img
                  src={logo}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </Link>
              <div className="h-full w-1 bg-[#0077ff]"></div>
              <h1
                key={route}
                className="animate-opacityFade underline-offset-2 rounded-lg shadow-xl shadow-white text-lg font-alice font-bold ml-1 text-[#0077ff94]"
              >
                {route.toUpperCase()}
              </h1>
            </div>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AuthLayout;
