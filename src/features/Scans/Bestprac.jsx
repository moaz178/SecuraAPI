import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { yaml } from "@codemirror/lang-yaml";
import { basicSetup } from "codemirror";
import { andromeda } from "@uiw/codemirror-theme-andromeda";
import { IoIosCloseCircle, IoIosArrowBack } from "react-icons/io";
import "./BestPractices.css";

const BestPractices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bestPracticesData, temporary_spec, contentType } = location.state || {};

  const handleBack = () => {
    navigate(-1);
  };

  if (!bestPracticesData) {
    return <h1 className="no-data">No Best Practices Found or Data Unavailable.</h1>;
  }

  return (
    <>
      <div className="best-practices-container">
        <h2 className="header">
          <i className="fas fa-book-open" style={{ color: "black", marginRight: "10px" }} />
          API Best Practices
        </h2>
        <div className="main-content">
          {/* Best Practices Information on the left */}
          <div className="best-practices-info">
            <h5 className="best-practices-title">Best Practices</h5>
            {Object.entries(bestPracticesData).map(([key, value], index) => (
              <div key={index} className="practice-item">
                <IoIosCloseCircle className="practice-icon" />
                <div className="practice-content">
                  <strong>{key}:</strong>
                  <p>{value}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Code block on the right */}
          <div className="spec-preview">
            <h5 className="best-practices-title">Spec URL</h5>
            <pre className="code-container">
              <CodeMirror
                value={temporary_spec || ""}
                className="editor-scroll"
                theme={andromeda}
                extensions={
                  contentType === "application/json"
                    ? [json()]
                    : contentType === "application/raml+yaml"
                    ? [yaml()]
                    : [basicSetup]
                }
              />
            </pre>
          </div>
        </div>
      </div>
      {/* Back Button Fixed at Bottom Right */}
      <button className="back-button-fixed" onClick={handleBack}>
        <IoIosArrowBack style={{ verticalAlign: "middle", marginRight: "8px" }} />
        Back
      </button>
    </>
  );
};

export default BestPractices;
