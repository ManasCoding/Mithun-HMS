// import React from 'react'

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import { useEffect, useState } from "react";
import PublicNav from "@/components/ui/PublicNav";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

const Authentication = () => {
  const { user } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const location = useLocation();
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setVerified(true);
    } else {
      setVerified(false);
      Navigate("/login");
    }
  }, [Navigate]);
  if (
    location.pathname == "/register/otp-verify" ||
    location.pathname == "/user/password/change"
  ) {
    return (
      verified && (
        <div className="w-full h-screen">
          <PublicNav />
          <Outlet />
        </div>
      )
    );
  } else {
    return (
      verified && (
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      )
    );
  }
};

export default Authentication;
