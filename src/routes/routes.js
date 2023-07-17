import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import Login from "../features/SignIn/Login";
import Landing from "../features/Landing/Landing";
import Registration from "../features/Registration/Registration";
import Dashboard from "../features/Dashboard/Dashboard";
import UpdatePassword from "../features/UpdatePassword/UpdatePassword";
import { useAuth } from '../features/SignIn/authContext/authContext'

const AppRoutes = () => {
  const { isLoggedIn } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/create-acount" element={<Registration />}></Route>
        <Route path="/dashboard"   element={isLoggedIn ? <Dashboard /> : <Login />}></Route>
        <Route path="/update-password" element={<UpdatePassword/>}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
