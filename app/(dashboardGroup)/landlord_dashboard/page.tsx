import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";
import React from "react";

const LandlordDashboard = async() => {
   const profile = await getMe()
  return (
    <>
    <Navbar user={profile}/>
      <div>LandlordDashboard</div>;
    </>
  )
};

export default LandlordDashboard;
