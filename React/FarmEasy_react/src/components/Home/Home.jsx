import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Weather from "./Weather";
import RecommendationForm from "../Crop/RecommendationForm";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <Weather/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
