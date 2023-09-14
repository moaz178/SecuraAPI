import React, { useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Dashboard = () => {
  const user = JSON.parse(window.localStorage.getItem("userInfo"));
  // let { firstName, lastName } = user.userBO;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="text-center mt-5">
        {/* Welcome {firstName} {lastName} !{" "} */}
        Welcome !
      </h1>
      <i
        className="fa-solid fa-mug-hot mt-1 text-center"
        style={{ fontSize: "50px" }}
      ></i>

      <p className="text-center" style={{ padding: "20px 230px" }}>
        Your dashboard will begin to be populated once you run your first scan.
        Got a scan in progress? If so grab a coffee and check back soon to see
        the results. &nbsp;
        {/* <i className="fa-solid fa-mug-hot" style={{ fontSize: "23px" }}></i> */}
      </p>

      <br />
      <br />
    </div>
  );
};

export default Dashboard;
