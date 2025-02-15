// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import store from "./components/Redux/store.jsx";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import App from "./App.jsx";
import ProfileSetup from "./components/Profile/ProfileSetup.jsx";
import ListProduct from "./components/Product/ListProduct.jsx";
import Layout from "./components/Layout/Layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>  {/* Wrap all pages inside Layout */}
      {/* Public Routes */}
      <Route index element={<App />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="profile-check" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
      <Route path="sell" element={<ProtectedRoute><ListProduct /></ProtectedRoute>} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
