import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header id="header" className="fixed-top">
        <div className="container">
          <div className="logo float-left">
            <h1 className="text-light">
              <Link to={`/`}>
                <span>Secura API</span>
              </Link>
            </h1>
          </div>

          <nav className="main-nav float-right d-none d-lg-block">
            <ul>
              <li className="drop-down">
                <a href="#">Resources</a>
                <ul>
                  <li>
                    <a href="#">Drop Down 1</a>
                  </li>
                  <li className="drop-down">
                    <a href="#">Drop Down 2</a>
                    <ul>
                      <li>
                        <a href="#">Deep Drop Down 1</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 2</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 3</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 4</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 5</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 4</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 5</a>
                  </li>
                </ul>
              </li>
              <li className="drop-down">
                <a href="">Services</a>
                <ul>
                  <li>
                    <a href="#">Drop Down 1</a>
                  </li>
                  <li className="drop-down">
                    <a href="#">Drop Down 2</a>
                    <ul>
                      <li>
                        <a href="#">Deep Drop Down 1</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 2</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 3</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 4</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 5</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 4</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 5</a>
                  </li>
                </ul>
              </li>
              <li>
                <Link to={`#`}>Platform</Link>
              </li>
              <li>
                <a href="#team">Pricing</a>
              </li>

              <li>
                <a href="#contact">Contact Us</a>
              </li>

              <li className="btn-signin">
                <Link
                  to={`/create-acount`}
                  style={{
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  START FOR FREE &nbsp;
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
