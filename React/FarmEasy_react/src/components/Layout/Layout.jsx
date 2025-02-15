// src/components/Layout/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Header from '../Header/Header'
import Footer from "../Footer/Footer";

const Layout = () => {
    const location = useLocation();
    const hideHeaderRoutes = ["/login"]; // Add more routes if needed
  
  return (
    <div>
        {
        !hideHeaderRoutes.includes(location.pathname) && (
        <Header/>
      )}
      <main className="p-4">
        <Outlet />  {/* This renders the active route's component */}
      </main>

      {
        !hideHeaderRoutes.includes(location.pathname) && (
        <Footer/>
      )}
    </div>
  );
};

export default Layout;
