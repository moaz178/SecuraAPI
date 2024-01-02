import React, { useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import Login from "../features/SignIn/Login";
import Landing from "../features/Landing/Landing";
import Registration from "../features/Registration/Registration";
import Dashboard from "../features/Dashboard/Dashboard";
import Layout from "../features/Layout/Layout";
import UpdatePassword from "../features/UpdatePassword/UpdatePassword";
import { useAuth } from "../features/SignIn/authContext/authContext";
import Payment from "../features/Payment/Payment";
import PricingPlan from "../features/PricingPlans/PricingPlans";
import Scans from "../features/Scans/Scans";
import Authentication from "../features/Authentication/Authentication";
import Reports from "../features/Reports/Reports";
import ReportPdf from "../features/Reports/PDFGenerator/ReportPdf";
const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/create-acount" element={<Registration />}></Route>
        {/* <Route
          exact
          path="/home"
          element={isLoggedIn ? <Layout /> : <Login />}
        > */}
        <Route exact path="/home" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scans" element={<Scans />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/:id" element={<ReportPdf />} />
          <Route path="authentication" element={<Authentication />} />
          <Route path="plans" element={<PricingPlan />} />
        </Route>

        <Route path="/update-password" element={<UpdatePassword />}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
