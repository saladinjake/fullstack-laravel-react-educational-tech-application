import React from "react";
import { Styles } from "../styles/courseCategory.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CoursePrice = ({ course: { courses }, setFilterAllCourses }) => {
  const filterPrice = (e) => {
    if (parseInt(e.target.value) === 0) {
      setFilterAllCourses([...courses]);
    } else {
      let price = parseInt(e.target.value);
      let filtered = [];
      switch (price) {
        case 2:
          filtered = courses.filter((course) => {
            return parseInt(course.course_fee) === parseInt(0);
          });
          setFilterAllCourses([...filtered]);
          break;
        case 1:
          filtered = courses.filter((course) => {
            return parseInt(course.course_fee) > parseInt(0);
          });
          setFilterAllCourses([...filtered]);
          break;
        default:
          return true;
      }
    }
  };

  return (
    <Styles>
      {/* Course Price */}
      <div className="course-category">
        <h5>Course Price</h5>
        <div className="form__group">
          <select name="category" onChange={filterPrice} required>
            <option value="">-- Filter By Price --</option>
            <option value="0">All</option>
            <option value="1">Paid</option>
            <option value="2">Free</option>
          </select>
        </div>
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
