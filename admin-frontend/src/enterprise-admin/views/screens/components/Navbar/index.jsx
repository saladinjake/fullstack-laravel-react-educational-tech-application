import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import questence from "assets/svgs/questence-logo.svg";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";

import { CATEGORIES, PACES, FEES, AUTHLINKS } from "./data";

const NavBar = ({
  cart: { cart },
  auth: { isAuthenticated, user },
  logOut,
}) => {
  const toogleBtn = useRef();
  const mobileNav = useRef();

  const openNav = () => {
    toogleBtn.current.classList.toggle("mobActive");
    mobileNav.current.classList.toggle("mobactive");
  };

  let history = useHistory();

  const handleLogout = async () => {
    await logOut();
    history.push("/login");
  };

  const showSubMenu = (e) => {
    var subMenus = Array.from(document.querySelectorAll(".DropDown__submenu"));
    subMenus.forEach((menu) => {
      menu.classList.remove("showActive");
    });
    e.target.nextElementSibling.classList.toggle("showActive");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchVal = document.getElementById("search")?.value;
    if (searchVal.length > 0) {
      history.push(`/courses?method=name&search=${searchVal}&filter=course`);
    }
  };

  return (
    <Fragment>
      <nav className="desktop">
        <figure className="logo">
          <Link to="/">
            <img src={questence} alt="" width="171px" />
          </Link>
        </figure>

        <ul className="mainNav" ref={mobileNav}>
          <li className="DropDown">
            <input className="form-control"
              type="checkbox"
              className="DropDown__checkbox"
              id="navi-toggle"
            />
            <label for="navi-toggle" className="DropDown__button">
              Courses and Programs
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z"
                  fill="#30415A"
                />
              </svg>
            </label>

            <ul className="DropDown__list">
              <li className="DropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/courses"}
                >
                  All Courses
                </Link>
              </li>
              <li className="DropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/"}
                >
                  By Programs
                </Link>
              </li>
              <li className="DropDown__item">
                <a className="DropDown__link" onClick={showSubMenu} href="/#">
                  By Category
                </a>

                <ul className="DropDown__submenu">
                  {CATEGORIES.length > 0 &&
                    CATEGORIES.map((item, i) => {
                      return (
                        <li>
                          <Link
                            to={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
              <li className="DropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/courses"}
                >
                  By Trainning Partner
                </Link>
              </li>
              <li className="DropDown__item">
                <a className="DropDown__link" onClick={showSubMenu} href="/#">
                  By Learning Style
                </a>
                <ul className="DropDown__submenu">
                  {PACES.length > 0 &&
                    PACES.map((item, i) => {
                      return (
                        <li>
                          <Link to={`${item.link}`}>{item.name}</Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
              <li className="DropDown__item">
                <a className="DropDown__link" onClick={showSubMenu} href="/#">
                  By Fee
                </a>
                <ul className="DropDown__submenu">
                  {FEES.length > 0 &&
                    FEES.map((item, i) => {
                      return (
                        <li>
                          <Link to={`${item.link}`}>{item.name}</Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
            </ul>
          </li>

          {/* <li>
            <a href="/#services">
              Courses and Programs
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z"
                  fill="#30415A"
                />
              </svg>
            </a>
          </li> */}

          <li className="DropDown">
            <input className="form-control"
              type="checkbox"
              className="DropDown__checkbox"
              id="navi-toggle2"
            />
            <label for="navi-toggle2" className="DropDown__button">
              For Institutions
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z"
                  fill="#30415A"
                />
              </svg>
            </label>

            <ul className="DropDown__list">
              <li className="DropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/courses"}
                >
                  For Schools
                </Link>
              </li>
              <li className="DropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/government"}
                >
                  For Government
                </Link>
              </li>
              <li className="DropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/business"}
                >
                  For Businesses
                </Link>
              </li>
            </ul>
          </li>

          <li className="search__group">
            <div className="search__form">
              {/* <form onSubmit={handleSearch}> */}
              <input className="form-control"
                type="text"
                name="search"
                id="search"
                placeholder="Search for a course"
              />
              <button onClick={handleSearch} type="button">
                Search
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0057 8.80503H9.37336L9.14923 8.58891C9.93368 7.67639 10.4059 6.49171 10.4059 5.20297C10.4059 2.32933 8.07662 0 5.20297 0C2.32933 0 0 2.32933 0 5.20297C0 8.07662 2.32933 10.4059 5.20297 10.4059C6.49171 10.4059 7.67639 9.93368 8.58891 9.14923L8.80503 9.37336V10.0057L12.8073 14L14 12.8073L10.0057 8.80503ZM5.20297 8.80503C3.20983 8.80503 1.60091 7.19611 1.60091 5.20297C1.60091 3.20983 3.20983 1.60091 5.20297 1.60091C7.19611 1.60091 8.80503 3.20983 8.80503 5.20297C8.80503 7.19611 7.19611 8.80503 5.20297 8.80503Z"
                    fill="white"
                  />
                </svg>
              </button>
              {/* </form> */}
            </div>
          </li>

          {!isAuthenticated ? (
            <Fragment>
              <li>
                <Link to="/login" className="auth outline">
                  Log In
                </Link>
              </li>
              <li>
                <button
                  className="btnMobileFull"
                  onClick={() => history.push("register")}
                >
                  Sign Up
                </button>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="DropDown">
                <input className="form-control"
                  type="checkbox"
                  className="DropDown__checkbox"
                  id="navi-toggle3"
                />

                <label
                  for="navi-toggle3"
                  className="DropDown__button useracount"
                >
                  <figure>
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/questone.jpg"
                      }
                      alt=""
                      width="20px"
                    />
                  </figure>
                  {`${user?.first_name} ${user?.last_name}`}
                </label>

                <ul className="DropDown__list userdropdown">
                  {AUTHLINKS.length > 0 &&
                    AUTHLINKS.map((item, i) => {
                      return (
                        <li className="DropDown__item">
                          <Link className="DropDown__link" to={`${item.link}`}>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}

                  <li className="DropDown__item">
                    <Link
                      className="DropDown__link"
                      to={process.env.PUBLIC_URL + "/cart"}
                    >
                      Cart {cart !== undefined && `(${cart?.length})`}
                    </Link>
                  </li>

                  <li className="DropDown__item">
                    <Link className="DropDown__link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </Fragment>
          )}
        </ul>

        <button ref={toogleBtn} onClick={openNav} className="nav-icon">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
      </nav>
    </Fragment>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(NavBar);
