import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
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
import Connectors from "../features/AWSConnectors/Connectors";
import Settings from "../features/Settings/Settings";
import StartScan from "../features/StartScan/StartScan";
import BestPractices from "../features/Scans/Bestprac";

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/create-acount" element={<Registration />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scans" element={<Scans />} />
          <Route path="bestpractices" element={<BestPractices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/:id" element={<ReportPdf />} />
          <Route path="connectors" element={<Connectors />} />
          <Route path="settings" element={<Settings />} />
          <Route path="plans" element={<PricingPlan />} />
        </Route>
        <Route path="startscan" element={<StartScan />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
