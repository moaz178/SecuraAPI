import React from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <section id="intro" className="clearfix">
        <div className="container">
          <div className="intro-info">
            <h2> API Protection Solutions</h2>
            <p>
              The only DAST and API security testing tool that runs in CI/CD,
              enabling developers to quickly fix security issues before they hit
              production.
            </p>
            <div>
              <a className="btn-get-started" onClick={() => navigate("/home")}>
                Try a Scan <i class="fa-solid fa-arrows-rotate ml-1"></i>
              </a>
              <a href="#services" className="btn-services">
                Find out more
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
