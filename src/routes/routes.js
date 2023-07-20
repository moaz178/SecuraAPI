import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import Login from "../features/SignIn/Login";
import Landing from "../features/Landing/Landing";
import Registration from "../features/Registration/Registration";
import Dashboard from "../features/Dashboard/Dashboard";
import Layout from "../features/Layout/Layout";
import UpdatePassword from "../features/UpdatePassword/UpdatePassword";
import { useAuth } from '../features/SignIn/authContext/authContext'
import Payment from "../features/Payment/Payment";

const AppRoutes = () => {
  const { isLoggedIn } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/create-acount" element={<Registration />}></Route>
        <Route
          exact
          path="/home"
          element={isLoggedIn ? <Layout /> : <Login />}
        >
          <Route index  element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/payment" element={<Payment/>}></Route>

        <Route path="/update-password" element={<UpdatePassword/>}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
