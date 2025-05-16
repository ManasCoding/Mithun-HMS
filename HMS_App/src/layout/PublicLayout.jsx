// import React from 'react'

import PublicNav from "@/components/ui/PublicNav";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="w-full h-screen">
      <PublicNav />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
