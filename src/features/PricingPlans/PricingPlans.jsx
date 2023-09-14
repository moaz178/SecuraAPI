import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Payment from "../Payment/Payment";
const PricingPlan = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: " 30px 70px 0px 70px",
      }}
    >
      <h5 style={{ fontWeight: "500" }}>Secura API Enterprise Free Trial !</h5>
      <span>
        Now that you got a chance to try Secura API Enterprise, how would you
        like to continue?
      </span>
      <br />
      <br />

      <section>
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="pricing-card">
              <div class="card shadow-sm border-light text-center mt-1">
                <header class="card-header bg-white p-3">
                  <h2 class="h5 text-primary mb-4">Free</h2>
                  <span class="d-block">
                    <span
                      class="display-1 text-dark font-weight-bold"
                      style={{ fontSize: "49px" }}
                    >
                      <span class="align-top font-medium">$</span>0
                    </span>
                    <span class="d-block text-dark font-small">14 days</span>
                  </span>
                </header>

                <div class="card-body">
                  <ul class="list-group mb-4">
                    <li class="list-group-item fs-13">
                      <strong>API Security Pen Testing</strong>
                      <br />
                      5M API request/month
                    </li>
                    <li class="list-group-item fs-13">
                      <strong>API Security Dome</strong>
                      <br />
                      Q1 Availiblity
                      <br />
                      API security Sunlight
                    </li>
                    <li class="list-group-item fs-13">
                      <strong>API Security Dome </strong>
                      <br />
                      50M API request/month
                      <br />
                      API security Dome
                    </li>
                  </ul>
                  <button
                    type="button"
                    class="btn btn-primary btn-block animate-up-1"
                    tabindex="0"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="pricing-card">
              <div class="card shadow-sm border-light text-center mt-1">
                <header class="card-header bg-white p-3">
                  <h2 class="h5 text-tertiary mb-4">Bundles</h2>
                  <span class="d-block">
                    <span
                      class="display-1 text-dark font-weight-bold"
                      style={{ fontSize: "49px" }}
                    >
                      <span class="align-top font-medium">$</span>89
                    </span>
                    <span class="d-block text-dark font-small">/ month</span>
                  </span>
                </header>

                <div class="card-body">
                  <ul class="list-group mb-4">
                    <li class="list-group-item fs-13">
                      <strong>Kick - Start</strong>
                      <br />
                      50M API request/month
                      <br />
                      API security Sunlight
                    </li>
                    <li class="list-group-item fs-13">
                      <strong>Security Dome Pack</strong>
                      <br />
                      50M API request/month
                      <br />
                      API security Dome
                    </li>
                    <li class="list-group-item fs-13">
                      <strong>Advance Cluster</strong>
                      <br />
                      All 4 engine Upto 50M/ API request{" "}
                    </li>
                  </ul>
                  <button
                    type="button"
                    class="btn btn-secondary btn-block animate-up-1"
                    onClick={() => setShow(true)}
                  >
                    Buy Now
                  </button>
                  <Payment show={show} setShow={setShow} />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="pricing-card">
              <div class="card shadow-sm border-light text-center mt-1">
                <header class="card-header bg-white p-3">
                  <h2 class="h5 text-tertiary mb-4">Capacity Cluster</h2>
                  <span class="d-block">
                    <span
                      class="display-1 text-dark font-weight-bold"
                      style={{ fontSize: "49px" }}
                    >
                      <span class="align-top font-medium">$</span>120
                    </span>
                    <span class="d-block text-dark font-small">/ month</span>
                  </span>
                </header>

                <div class="card-body">
                  <ul class="list-group mb-4">
                    <li class="list-group-item fs-13">
                      <strong>Processing Unit</strong>
                      <br />
                      +100M API request/month
                    </li>
                    <li class="list-group-item fs-13">
                      <strong>Enterprise Cluster</strong>
                      <br />
                      All 4 engine Upto 150M/ API request
                    </li>
                    <li class="list-group-item fs-13">
                      <strong>Advance Cluster</strong>
                      <br />
                      All 4 engine Upto 50M/ API request{" "}
                    </li>
                    <li class="list-group-item fs-13">
                      <strong>Base Cluster</strong>
                      <br />
                      All 4 engine Upto 10M/ API request{" "}
                    </li>
                  </ul>
                  <button
                    type="button"
                    class="btn btn-secondary btn-block animate-up-1"
                    onClick={() => setShow(true)}
                  >
                    Buy Now
                  </button>
                  <Payment show={show} setShow={setShow} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPlan;
