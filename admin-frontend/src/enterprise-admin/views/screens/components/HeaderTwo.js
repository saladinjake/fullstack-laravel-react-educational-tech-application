import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// import Search from "./common/Search";
import StickyMenu from "./common/StickyMenu";
import MobileMenu from "./common/MobileMenu";
//from "./styles/headerTwo.js";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";

const HeaderTwo = ({
  cart: { cart },
  auth: { isAuthenticated, user },
  logOut,
}) => {
  let history = useHistory();

  const handleLogout = async () => {
    await logOut();
    history.push("/login");
  };

  return (
    <>
      {/* Topbar 2 */}

      {/* Logo Area 2 */}
      <section className="logo-area2">
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
                      Courses & Programs <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/courses"}
                        >
                          All Courses
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/"}
                        >
                          By Category
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/"}
                        >
                          By Programs
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/"}
                        >
                          By Training Partner
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/"}
                        >
                          By Learning Style
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
                      For Institutions <i className="las la-angle-down"></i>
                    </Link>
                    <ul className="dropdown list-unstyled">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/"}
                        >
                          For Businesses
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/institutions"}
                        >
                          For Schools
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to={process.env.PUBLIC_URL + "/instructors"}
                        >
                          For Government
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                {/* <div className="search-box">
                  <Search />
                </div> */}

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
                      className="btn outline"
                    >
                      Register
                    </Link>
                  )}
                </div>

                <div className="apply-btn">
                  {isAuthenticated ? (
                    ""
                  ) : (
                    <Link
                      to={process.env.PUBLIC_URL + "/login"}
                      className="btn"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sticky Menu */}
      <StickyMenu
        user={user}
        isAuthenticated={isAuthenticated}
        logOut={logOut}
        cart={cart}
      />

      {/* Mobile Menu */}
      <MobileMenu />
    </>
  );
};

// export default HeaderTwo;
HeaderTwo.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(HeaderTwo);
