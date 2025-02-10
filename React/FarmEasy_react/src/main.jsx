// src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import SignUp from './components/SignUp/SignUp.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import store from './components/Redux/store.jsx';
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import App from './App.jsx';
import ProfileSetup from './components/Profile/ProfileSetup.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    
    
    <Route>
      {/* Public Routes */}
      <Route path='/' element={<App />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login/>}/>
      {/* Protected Routes */}
      <Route path='/home' element={ <ProtectedRoute><Home /></ProtectedRoute> }/>
      <Route path='/profile-check' element={<ProtectedRoute><ProfileSetup/></ProtectedRoute>}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
