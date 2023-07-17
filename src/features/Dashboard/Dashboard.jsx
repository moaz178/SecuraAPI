import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  // useEffect(() => {

  //   console.log("AuthenticatedUser", user);
  // }, []);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  let { firstName, lastName } = user.userBO;

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    // setCurrentUser({});
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="text-center mt-5">
        Welcome {firstName} {lastName} !
      </h1>

      <button
        type="submit"
        onClick={handleLogOut}
        style={{ marginLeft: "700px", width: "100px" }}
        className="btn btn-primary fs-15 mt-4"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
