import React, { useEffect } from "react";
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  let { firstName, lastName } = user.userBO;

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
    </div>
  );
};

export default Dashboard;
