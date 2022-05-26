import React from "react";
import { Styles } from "../styles/courseCategory.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const CourseStyle = ({ course: { courses }, setFilterAllCourses }) => {

  const filterStyle = (e) => {
    if (parseInt(e.target.value) === 0) {
      setFilterAllCourses([...courses]);
    } else {
      let style = parseInt(e.target.value);
      let filtered = [];
      switch (style) {
        case 0:
          setFilterAllCourses([...courses]);
          break;
        case 1:
          filtered = courses.filter((course) => {
            return course.learning_style === "Self Paced";
          });
          setFilterAllCourses([...filtered]);
          break;
        case 2:
          filtered = courses.filter((course) => {
            return course.learning_style === "Instructor Paced";
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
      {/* Course Tag */}
      <div className="course-category">
        <h5>Learning Style</h5>

        <div className="form__group">
          <select name="category" onChange={filterStyle} required>
            <option value="">-- Choose Learning Style --</option>
            <option value="0">All</option>
            <option value="1">Self Paced</option>
            <option value="2">Instructor Paced</option>
          </select>
        </div>
      </div>
    </Styles>
  );
};

CourseStyle.propTypes = {
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps)(CourseStyle);
