import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/stickyMenu.js";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: sticky menu component

*/
function StickyMenu({ cart, isAuthenticated, logOut }) {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const stickyMenu = document.querySelector(".sticky-menu");

      if (window.scrollY > 160) {
        stickyMenu.classList.add("sticky");
      } else {
        stickyMenu.classList.remove("sticky");
      }
    });
  });

  return (
    <Styles>
      {/* Sticky Menu */}
      <section className="sticky-menu">
        <Container>
          <Row>
            <Col md="3">
              <div className="logo">
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                    alt=""
                  />
                </Link>
              </div>
            </Col>
            <Col md="9">
              <div className="menu-box d-flex justify-content-end">
                <ul className="nav menu-nav">
                  
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={process.env.PUBLIC_URL + "/"}
                      data-toggle="dropdown"
                    >
                      Pages <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/login"}
                        >
                          Log In
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/registration"}
                        >
                          Registration
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={process.env.PUBLIC_URL + "/"}
                      data-toggle="dropdown"
                    >
                      Courses <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/courses"}
                        >
                          Courses
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/courses/category/1"}
                        >
                          Technology
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/courses/category/4"}
                        >
                          Engineering
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={process.env.PUBLIC_URL + "/instructors"}
                    >
                      Instructors
                    </Link>
                  </li>
                
                  {isAuthenticated && (
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to={process.env.PUBLIC_URL + "/"}
                        data-toggle="dropdown"
                      >
                        Account <i className="las la-angle-down"></i>
                      </Link>
                      <ul className="dropdown list-unstyled">
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to={process.env.PUBLIC_URL + "/products"}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to={"/cart"}>
                            Cart {cart !== undefined && `(${cart?.length})`}{" "}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to='#'
                            onClick={logOut}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}

                  <li className="nav-item">
                    <Link className="nav-link" to={"/cart"}>
                      Cart {cart !== undefined && `(${cart?.length})`}{" "}
                    </Link>
                  </li>
                </ul>
                <div className="apply-btn">
                  <Link to={process.env.PUBLIC_URL + "/registration"}>
                    <i className="las la-clipboard-list"></i>Apply Now
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Styles>
  );
}

export default StickyMenu;
