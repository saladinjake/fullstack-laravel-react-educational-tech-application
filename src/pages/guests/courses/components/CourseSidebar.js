import React from "react";
import { Row, Col } from "react-bootstrap";
import CourseSearch from "./CourseSearch";
import CoursePrice from "./CoursePrice";
import CourseCategory from "./CourseCategory";
import CourseStyle from "./CourseStyle";

function CourseSidebar({
  setSearch,
  search,
  setFilterAllCourses,
}) {
  return (
    <div className="course-sidebar">
      <Row>
        <Col md="12">
          <CourseSearch setSearch={setSearch} search={search} />
        </Col>
        <Col md="12">
          <CourseCategory setFilterAllCourses={setFilterAllCourses} />
        </Col>
        <Col md="12">
          <CoursePrice setFilterAllCourses={setFilterAllCourses} />
        </Col>
        <Col md="12">
          <CourseStyle setFilterAllCourses={setFilterAllCourses} />
        </Col>
        
      </Row>
    </div>
  );
}

export default CourseSidebar;
