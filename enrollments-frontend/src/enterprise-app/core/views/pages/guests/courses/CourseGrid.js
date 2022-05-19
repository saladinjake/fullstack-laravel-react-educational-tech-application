import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../../components/Header";
import { PageTitle } from "../../../components/common/PageTitle";
import CourseSidebar from "./components/CourseSidebar";
import CourseItemGrid from "./components/CourseItemsGrid";
import FooterTwo from "../../../components/Footer";
import { Styles } from "./styles/course.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses } from "../../../../redux/actions/coursesActions";

import Loader from "../../../components/Loader/Loader";
import { useQuery } from "../../../../helpers/hooks/useQuery.js";

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: course display in grids

*/

const CourseGrid = ({
  course: { courses, courseLoading },
  fetchCourses,
  match,
}) => {
  const [search, setSearch] = useState("");
  const [filterAllCourses, setFilterAllCourses] = useState([]);
  const [queryVal, setQueryVal] = useState("");
  const query = useQuery();

  useEffect(() => {
    let routeQuery = query.get("search");
    if (routeQuery !== null && routeQuery.length > 0)
      return setQueryVal(routeQuery);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    FilterAll();
    // eslint-disable-next-line
  }, [match, courses, search]);

  const FilterAll = async () => {
    let catId = parseInt(match.params.id);

    if (catId > 0) {
      courses.length > 0 &&
        setFilterAllCourses(
          courses.filter((course) => {
            return parseInt(course.category_id) === catId;
          })
        );
    } else {
      let searchVal;
      if (queryVal.length > 0) {
        searchVal = queryVal;
        setQueryVal("");
      } else {
        searchVal = search;
      }
      setFilterAllCourses(
        courses.length > 0 &&
          courses.filter((course) => {
            return course.course_name
              .toLowerCase()
              .includes(searchVal.toLowerCase());
          })
      );
    }
  };

  return (
    <div className="main-wrapper course-page">
      {/* Header 2 */}
      <HeaderTwo />
      <PageTitle />

      <Styles>
        {/* Course Grid */}
        <section className="course-grid-area">
          <Container>
            <Row>
              <Col lg="3" md="4" sm="5">
                <CourseSidebar
                  setFilterAllCourses={setFilterAllCourses}
                  setSearch={setSearch}
                  search={search}
                />
              </Col>
              <Col lg="9" md="8" sm="7">
                <div className="course-items">
                  <Row>
                    {courseLoading ? (
                      <Loader width="70" />
                    ) : courses.length > 0 ? (
                      <Fragment>
                        <CourseItemGrid
                          courses={courses}
                          allCourses={filterAllCourses}
                        />
                      </Fragment>
                    ) : (
                      <Row>
                        <h1>No courses yet</h1>
                      </Row>
                    )}
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>

      {/* Footer 2 */}
      <FooterTwo />
    </div>
  );
};

// export default CourseGrid;
CourseGrid.propTypes = {
  course: PropTypes.object.isRequired,
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, {
  fetchCourses,
})(CourseGrid);
