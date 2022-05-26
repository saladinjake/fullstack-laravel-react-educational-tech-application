import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
//from "./styles/stickyMenu.js";
import { useHistory } from "react-router-dom";

function StickyMenu({ cart, isAuthenticated, user, logOut }) {
  let history = useHistory();

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

  const handleLogout = async () => {
    await logOut();
    history.push("/login");
  };

  return (
    <>
      {/* Sticky Menu */}
      <section className="sticky-menu">
        <Container>
          <Row>
            <Col md="3">
              <div className="logo">
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/questence-logo.png"
                    }
                    alt=""
                    width="171px"
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
                      className="nav-link dropdown-toggle"
                      to={process.env.PUBLIC_URL + "/instructors"}
                    >
                      For Institutions <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/"}
                        >
                          For Corporates{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/institutions"}
                        >
                          For Institutions{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/instructors"}
                        >
                          For Instructors{" "}
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* <li className="nav-item">
                    <Link className="nav-link" to={"/cart"}>
                      Cart {cart !== undefined && `(${cart?.length})`}{" "}
                    </Link>
                  </li> */}
                </ul>

                {/* Idea */}
                <ul className="nav menu-nav">
                  {isAuthenticated && (
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle useraccount"
                        to={process.env.PUBLIC_URL + "/"}
                        data-toggle="dropdown"
                      >
                        <figure>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/questone.jpg"
                            }
                            alt=""
                            width="20px"
                          />
                        </figure>
                        {`${user?.first_name} ${user?.last_name}`}
                      </Link>
                      <ul className="dropdown list-unstyled">
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to={process.env.PUBLIC_URL + "/dashboard"}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to={process.env.PUBLIC_URL + "/learner/profile"}
                          >
                            Profile
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to={process.env.PUBLIC_URL + "/products"}
                          >
                            My learning
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
                            to={process.env.PUBLIC_URL + "/"}
                          >
                            Notifications
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to={process.env.PUBLIC_URL + "/"}
                          >
                            Messages
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to={process.env.PUBLIC_URL + "/"}
                          >
                            Billing
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to="#"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
                {/* Idea */}

                <div className="apply-btn">
                  {isAuthenticated ? (
                    ""
                  ) : (
                    <Link
                      to={process.env.PUBLIC_URL + "/register"}
                      className="outline"
                    >
                      Register
                    </Link>
                  )}
                </div>
                <div className="apply-btn">
                  {isAuthenticated ? (
                    ""
                  ) : (
                    <Link to={process.env.PUBLIC_URL + "/login"}>
                      <i className="las la-user"></i>Log In
                    </Link>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default StickyMenu;
