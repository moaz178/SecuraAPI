import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import Login from "../features/SignIn/Login";
import Landing from "../features/Landing/Landing";
import Registration from "../features/Registration/Registration";
import Dashboard from "../features/Dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/create-acount" element={<Registration />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
