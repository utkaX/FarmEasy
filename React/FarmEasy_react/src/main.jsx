import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import { CartProvider } from "./components/Marketplace/Cart/CartContext.jsx";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import SignUp from "./components/SignUp/SignUp.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import store from "./components/Redux/store.jsx";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import App from "./App.jsx";
import ProfileSetup from "./components/Profile/ProfileSetup.jsx";
import ListProduct from "./components/Product/ListProduct.jsx";
import Layout from "./components/Layout/Layout.jsx";
import SellerLayout from "./components/Marketplace/Layout/SellerLayout.jsx";  // Import Seller Layout
import MarketPlaceHome from "./components/Marketplace/Home/Home.jsx";
import ListProducts from "./components/Marketplace/Products/ListProducts.jsx";
import AllProducts from "./components/Marketplace/Products/AllProducts.jsx";
import MyProducts from "./components/Marketplace/Products/MyProducts.jsx";
import ProductDetails from "./components/Marketplace/Products/ProductDetails.jsx";
import ProfileSetupSeller from "./components/Marketplace/Profile/ProfileSetup.jsx";
import MyOrder from "./components/Marketplace/Order/MyOrder.jsx";
import SellerListProducts from "./components/Marketplace/Products/ListProducts.jsx";
import SearchResults from "./components/Marketplace/Header/SearchResults.jsx";
import MyProfile from "./components/Profile/MyProfile.jsx";
import SellerProfile from "./components/Marketplace/Profile/MyProfile"
import Cart from "./components/Marketplace/Cart/Cart.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Farmer & General Routes inside Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        {/* Protected Farmer Routes */}
        <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="profile-check" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
        <Route path="sell" element={<ProtectedRoute><ListProduct /></ProtectedRoute>} />        <Route path="sell" element={<ProtectedRoute><ListProduct /></ProtectedRoute>} />
        <Route path="myprofile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />


      </Route>
      {/* Separate Seller Routes inside SellerLayout */}
      <Route path="/seller" element={<SellerLayout />}>
        <Route index element={<ProtectedRoute><MarketPlaceHome/></ProtectedRoute>} />
        <Route path="products" element={<ProtectedRoute><MyProducts /></ProtectedRoute>} />
        <Route path="AllProducts" element={<ProtectedRoute><AllProducts/></ProtectedRoute>}/>
        <Route path="product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="profile-setup" element={<ProtectedRoute><ProfileSetupSeller /></ProtectedRoute>} />
        <Route path="myorders" element={<ProtectedRoute><MyOrder/></ProtectedRoute>}/>
        <Route path="addproduct" element={<ProtectedRoute> <SellerListProducts/></ProtectedRoute>}/>
        <Route path="search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
        <Route path="myprofile" element={<ProtectedRoute><SellerProfile /></ProtectedRoute>} />
        <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

      </Route>

    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <CartProvider> 
        <RouterProvider router={router} />
      </CartProvider>    </Provider>
  </StrictMode>
);
