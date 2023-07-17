import React from "react";
import AppRoutes from "./routes/routes";
import AuthProvider from "./features/SignIn/authContext/authContext";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
