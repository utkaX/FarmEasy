import React from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

const SellerLayout = () => {

  const location = useLocation();
  const hideHeaderRoutes = ["/seller/profile-setup"]; // Add more routes if needed

  return (
    <div className="bg-yellow-100 min-h-screen">
       {
        !hideHeaderRoutes.includes(location.pathname) && (
        <Header/>
      )}
      <main className="p-6">
        <Outlet /> 
      </main>

      {/* {
        !hideHeaderRoutes.includes(location.pathname) && (
        <Footer/>
      )} */}
    </div>
  );
};

export default SellerLayout;
