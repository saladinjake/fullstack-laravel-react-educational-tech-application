import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Search from "./common/Search";
import StickyMenu from "./common/StickyMenu";
import MobileMenu from "./common/MobileMenu";
import { Styles } from "./styles/header.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../../redux/actions/authActions";

const HeaderTwo = ({ cart: { cart }, auth: { isAuthenticated }, logOut }) => {
  return (
    <Styles>
      {/* Topbar 2 */}

      {/* Logo Area 2 */}
      <section className="logo-area2">
        <Container>
          <Row>
            <Col md="3">
              <div className="logo">
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/questence-logo.png"} alt="" width="171px"/></Link>
              </div>
            </Col>
            <Col md="9">
              <div className="menu-box d-flex justify-content-end">
                <ul className="nav menu-nav">
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
                          <Link className="nav-link" to="#" onClick={logOut}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link "
                      to={process.env.PUBLIC_URL + "/"}
                     
                    >
                      Home <i className="las la-angle-down"></i>
                    </Link>
                    
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={process.env.PUBLIC_URL + "/"}
                      data-toggle="dropdown"
                    >
                      Categories <i className="las la-angle-down"></i>
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
                      
                    </ul>
                  </li>
                  
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      to={process.env.PUBLIC_URL + "/cart"}
                    >
                      Cart {` (${cart.length})`}
                    </Link>
                  </li>
                </ul>
                <div className="search-box">
                  <Search />
                </div>
                <div className="apply-btn">
                  <Link to={process.env.PUBLIC_URL + "/login"}> <i className="las la-user"></i>Log In</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sticky Menu */}
      <StickyMenu
        isAuthenticated={isAuthenticated}
        logOut={logOut}
        cart={cart}
      />

      {/* Mobile Menu */}
      <MobileMenu />
    </Styles>
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
