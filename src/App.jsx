import React from "react";
import AppRoutes from "./routes/routes";
import AuthProvider from "./features/SignIn/authContext/authContext";
import ScanProvider from "./contexts/scanContext/scanContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <ScanProvider>
        <AppRoutes />
      </ScanProvider>
    </AuthProvider>
  );
};

export default App;
