import React from "react";
import Header from "../../components/Header/Header";
import "../../App.css";

const Landing = () => {
  return (
    <>
      <Header />

      <section id="intro" className="clearfix">
        <div className="container">
          <div className="intro-info">
            <h2>Web App and API Protection Solutions</h2>
            <p>
              The only DAST and API security testing tool that runs in CI/CD,
              enabling developers to quickly fix security issues before they hit
              production.
            </p>
            <div>
              <a href="#about" className="btn-get-started">
                Book a Demo
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
