import React, { useState } from "react";
import "./CustomCollapse.css";
const CustomCollapse = ({ scanResults, key }) => {
  // Create an array of collapse states
  const [collapseStates, setCollapseStates] = useState(
    Array(scanResults.vulnerability[key].length).fill(true)
  );

  // Create a toggle function based on index
  const toggleCollapse = (index) => {
    setCollapseStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className="card-body">
      <div className="flex flex-column faq-section">
        <div className="row">
          <div className="col-md-12">
            <div id="accordion">
              {scanResults.vulnerability[key].map((subKey, index) => (
                <div className="card" key={subKey}>
                  <div className="card-header" id={`heading-${index}`}>
                    <h5 className="mb-0">
                      <a
                        role="button"
                        onClick={() => toggleCollapse(index)}
                        data-toggle="collapse"
                        href={`#collapse-${index}`}
                        aria-expanded={collapseStates[index]}
                        aria-controls={`collapse-${index}`}
                      >
                        <strong>{subKey}</strong>
                      </a>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${index}`}
                    className={`collapse ${
                      collapseStates[index] ? "show" : ""
                    }`}
                    data-parent="#accordion"
                    aria-labelledby={`heading-${index}`}
                  >
                    <div className="card-body">
                      <ul>
                        {Object.entries(
                          scanResults.vulnerability[key][subKey]
                        ).map(([property, value]) => (
                          <li
                            key={property}
                            style={{
                              wordWrap: "break-word",
                            }}
                          >
                            <strong>{property}:</strong> {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCollapse;
