import React, { useState, useEffect } from "react";
import { Styles } from "../styles/courseCategory.js";
import { getCategories } from "services/category";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const CourseCategory = ({ course: { courses }, setFilterAllCourses }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      await fetchCategories();
    })();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    try {
      let res = await getCategories();
      await setCategories([...res.data.data]);
    } catch (err) {}
  };

  const filterCategory = (e) => {
    if (parseInt(e.target.value) === 0) {
      setFilterAllCourses([...courses]);
    } else {
      const filtered = courses.filter((course) => {
        return parseInt(course.category_id) === parseInt(e.target.value);
      });
      setFilterAllCourses([...filtered]);
    }
  };

  return (
    <Styles>
      {/* Course Tag */}
      <div className="course-category">
        <h5>Course Category</h5>

        <div className="form__group">
          <select name="category" onChange={filterCategory} required>
            <option value="">-- Choose Category --</option>
            <option value="0">All</option>
            {categories.length > 0 &&
              categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </Styles>
  );
};

CourseCategory.propTypes = {
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps)(CourseCategory);
