import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./Pagination";

function CourseItemGrid({ allCourses, courses }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerPage] = useState(5);
  const [currentCourses, setCurrCourses] = useState([]);

  // Get current course
  var indexOfLastCourse = currentPage * coursePerPage;
  var indexOfFirstCourse = indexOfLastCourse - coursePerPage;

  useEffect(() => {
    if (allCourses.length > 0) {
      setCurrCourses(allCourses.slice(indexOfFirstCourse, indexOfLastCourse));
    } else {
      setCurrCourses([]);
    }
    // eslint-disable-next-line
  }, [allCourses]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    indexOfLastCourse = pageNumber * coursePerPage;
    indexOfFirstCourse = indexOfLastCourse - coursePerPage;
    setCurrCourses(allCourses.slice(indexOfFirstCourse, indexOfLastCourse));
  };

  return (
    <Fragment>
      {currentCourses.length > 0 ? (
        <Fragment>
          {currentCourses.map((data, i) => {
            return (
              <Col lg="6" md="12" key={i}>
                <div className="course-item">
                  <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                    <div
                      className="course-image"
                      style={{
                        backgroundImage: data
                          ? `url(${data.course_cover_image})`
                          : "",
                      }}
                    >
                      <div className="author-img d-flex">
                        <div className="img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/${data.authorImg}`
                            }
                            alt=""
                          />
                        </div>
                        <div className="title">
                          <p>{data.authorName}</p>
                          <span>{data.authorCourses}</span>
                        </div>
                      </div>
                      <div className="course-price">
                        <p> ₦{data.course_fee}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="course-content">
                    <h6 className="heading">
                      <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                        {data.course_name}
                      </Link>
                    </h6>
                    <p className="desc">{data.course_description}</p>
                    <div className="course-face d-flex justify-content-between">
                      <div className="duration">
                        <p>
                          <i className="las la-clock"></i> {data.duration}
                        </p>
                      </div>
                      <div className="rating">
                        <ul className="list-unstyled list-inline">
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="las la-star-half-alt"></i>
                          </li>
                          <li className="list-inline-item">(4.5)</li>
                        </ul>
                      </div>
                      <div className="student">
                        <p>
                          <i className="las la-chair"></i>60
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Fragment>
      ) : (
        <p>No courses yet.</p>
      )}

      <Col md="12" className="text-center">
        <Pagination
          coursePerPage={coursePerPage}
          totalCourses={allCourses}
          // totalCourses={courses}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Col>
    </Fragment>
  );
}

export default CourseItemGrid;
