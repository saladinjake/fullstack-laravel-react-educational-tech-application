import React, { useState } from "react";
import { Styles } from "../styles/coursePrice.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CoursePrice = ({ course: { courses }, setFilterAllCourses }) => {
  const [filter, setFilter] = useState("");
  const [prevFilter, setPrevFilter] = useState("");

  const filterPrice = (e) => {
    if (e.target.value === prevFilter) {
      setFilterAllCourses([...courses]);
      setPrevFilter("");
      setFilter("");
    } else {
      setFilter(e.target.value);
      let price = e.target.value;
      let filtered = [];
      switch (price) {
        case "all":
          setFilterAllCourses([...courses]);
          break;
        case "free":
          filtered = courses.filter((course) => {
            return parseInt(course.course_fee) === parseInt(0);
          });
          setFilterAllCourses([...filtered]);
          break;
        case "paid":
          filtered = courses.filter((course) => {
            return parseInt(course.course_fee) > parseInt(0);
          });
          setFilterAllCourses([...filtered]);
          break;
        default:
          return true;
      }
    }
    setPrevFilter(e.target.value);
  };
  return (
    <Styles>
      {/* Course Price */}
      <div className="course-price">
        <h5>Course Price</h5>
        <ul className="price-item list-unstyled">
          <li className="check-btn">
            <label htmlFor="price1">
              <input
                onClick={filterPrice}
                type="checkbox"
                id="all"
                value="all"
                checked={filter === "all" ? true : false}
                className="check-box"
              />
              All<span>(121)</span>
            </label>
          </li>
          <li className="check-btn">
            <label htmlFor="price2">
              <input
                onClick={filterPrice}
                type="checkbox"
                className="check-box"
                id="free"
                checked={filter === "free" ? true : false}
                value="free"
              />
              Free<span>(09)</span>
            </label>
          </li>
          <li className="check-btn">
            <label htmlFor="price3">
              <input
                onClick={filterPrice}
                type="checkbox"
                className="check-box"
                id="paid"
                checked={filter === "paid" ? true : false}
                value="paid"
              />
              Paid<span>(77)</span>
            </label>
          </li>
        </ul>
      </div>
    </Styles>
  );
};

CoursePrice.propTypes = {
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps)(CoursePrice);
