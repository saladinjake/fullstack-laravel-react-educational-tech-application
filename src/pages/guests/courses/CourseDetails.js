import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import HeaderTwo from "../../../components/Header";
import { BreadcrumbBox } from "../../../components/common/Breadcrumb";
import FooterTwo from "../../../components/Footer";
import { Styles } from "./styles/course.js";
import moment from "moment";
import { Link } from "react-router-dom";

import Loader from "components/Loader/Loader";
import { getCourse } from "services/course";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses, addToCart } from "actions/cartActions";

const CourseDetails = ({ match, cart: { cart }, addToCart, fetchCourses }) => {
  const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);

  const init = async () => {
    setStatus("loading");
    let courseId = parseInt(match.params.id);
    try {
      let response = await getCourse(courseId);
      setCourseDetails(response.data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    init();
    const courseButton = document.querySelectorAll(".course-button");
    courseButton.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");
        const content = button.nextElementSibling;

        if (button.classList.contains("active")) {
          content.className = "course-content show";
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.className = "course-content";
          content.style.maxHeight = "0";
        }
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main-wrapper course-details-page">
      {/* Header 2 */}
      <HeaderTwo />

      {/* Breadcroumb */}
      {Object.entries(coursedetails).length !== 0 && (
        <BreadcrumbBox title={coursedetails.data.category.name} />
      )}

      <Styles>
        {/* Course Details */}
        {loading ? (
          <Loader width="70" />
        ) : Object.entries(coursedetails).length !== 0 ? (
          <Fragment>
            <section className="course-details-area">
              <Container>
                <Row>
                  <Col lg="9" md="8" sm="12">
                    <div className="course-details-top">
                      <div className="heading">
                        <h4>{coursedetails?.data?.course_name}</h4>
                      </div>
                      <div className="course-top-overview">
                        <div className="d-flex overviews">
                          <div className="author">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                `/assets/images/author.jpg`
                              }
                              alt="author"
                            />
                            <div className="author-name">
                              <h6>Author</h6>
                              <p>
                                {
                                  coursedetails?.data?.instructor?.user
                                    ?.first_name
                                }
                              </p>
                            </div>
                          </div>
                          <div className="category">
                            <h6>Category</h6>
                            <p>
                              {coursedetails && coursedetails.data
                                ? coursedetails.data.category.name
                                : ""}
                            </p>
                          </div>
                          <div className="rating">
                            <h6>Rating</h6>
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
                          <div className="price">
                            <h6>Price</h6>
                            <p>NGN{coursedetails?.data?.course_fee}</p>
                          </div>
                        </div>
                      </div>
                      <div className="course-details-banner">
                        <img
                          src={`${
                            coursedetails && coursedetails.data
                              ? coursedetails.data.course_cover_image
                              : ""
                          }`}
                          alt="No Wrapper"
                          className="img-fluid"
                        />
                      </div>
                      <div className="course-tab-list">
                        <Tab.Container defaultActiveKey="overview">
                          <Nav className="flex-column">
                            <Nav.Item>
                              <Nav.Link eventKey="overview">Overview</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="curriculum">
                                Curriculum
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="instructor">
                                Instructors
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="review">Reviews</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="announcements">Announcements</Nav.Link>
                            </Nav.Item>
                          </Nav>
                          <Tab.Content>
                            <Tab.Pane
                              eventKey="overview"
                              className="overview-tab"
                            >
                              <div className="course-desc">
                                <h5>Course Description</h5>
                                <p>
                                  {coursedetails && coursedetails.data
                                    ? coursedetails.data.course_description
                                    : ""}
                                </p>
                              </div>
                              <div className="course-feature">
                                <h5>Course Summary</h5>
                                <p>{coursedetails?.data?.course_overview}</p>
                                {/* <ul className="list-unstyled">
                              <li>
                                <i className="las la-arrow-right"></i> Lorem
                                ipsum dolor sit amet, consectetur adipisicing
                                elit. Voluptatum amet quo eius saepe et quis
                                necessitatibus hic natus facere excepturi
                                aliquid dolor ducimus.
                              </li>
                            </ul> */}
                              </div>
                              {/* <div className="course-learn">
                            <h5>Learning Outcome</h5>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Quae impedit eligendi
                              perspiciatis animi maxime ab minus corporis omnis
                              similique excepturi, quidem facere quisquam
                              aperiam neque dolorem saepe. Laboriosam, quam
                              aliquam odit modi harum libero culpa distinctio.
                            </p>
                            <ul className="list-unstyled">
                              <li>
                                <i className="fa fa-check"></i> Lorem ipsum
                                dolor sit amet, consectetur adipisicing elit.
                                Voluptatum amet quo eius saepe et quis
                                necessitatibus hic natus facere Quae impedit
                                eligendi perspiciatis animi maxime ab minus
                                corporis omnis similique excepturi.
                              </li>
                            </ul>
                          </div> */}
                              {/* <div className="course-share">
                            <h5>Share This Course</h5>
                            <ul className="social list-unstyled list-inline">
                              <li className="list-inline-item">
                                <a href={process.env.PUBLIC_URL + "/"}>
                                  <i className="fab fa-facebook-f"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href={process.env.PUBLIC_URL + "/"}>
                                  <i className="fab fa-twitter"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href={process.env.PUBLIC_URL + "/"}>
                                  <i className="fab fa-linkedin-in"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href={process.env.PUBLIC_URL + "/"}>
                                  <i className="fab fa-youtube"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href={process.env.PUBLIC_URL + "/"}>
                                  <i className="fab fa-dribbble"></i>
                                </a>
                              </li>
                            </ul>
                          </div> */}
                            </Tab.Pane>
                            <Tab.Pane
                              eventKey="curriculum"
                              className="curriculum-tab"
                            >
                              <div className="course-element">
                                <h5>Course Content</h5>
                                <div className="course-item">
                                  <button className="course-button active">
                                    Topic 1: Topic Header
                                  </button>
                                  <div className="course-content show">
                                    <ul className="list-unstyled">
                                      <li>
                                        <span className="play-icon">
                                          <i className="las la-play"></i>{" "}
                                          Lesson: 01
                                        </span>
                                        <span className="lecture-title">
                                        Lesson 1 title
                                        </span>
                                      </li>
                                      <li>
                                        <span className="play-icon">
                                          <i className="las la-play"></i>{" "}
                                          Lesson: 02
                                        </span>
                                        <span className="lecture-title">
                                        Lesson 2 title
                                        </span>
                                      </li>
                                      <li>
                                        <span className="play-icon">
                                          <i className="las la-play"></i>{" "}
                                          Lesson: 03
                                        </span>
                                        <span className="lecture-title">
                                          Lesson 3 title
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="course-item">
                                  <button className="course-button active">
                                  Topic 2: Topic Header
                                    <span>03 Lectures - 43 Min</span>
                                  </button>
                                  <div className="course-content show">
                                    <ul className="list-unstyled">
                                      <li>
                                        <span className="play-icon">
                                          <i className="las la-play"></i>{" "}
                                          Lesson: 01
                                        </span>
                                        <span className="lecture-title">
                                        Lesson 1 title
                                        </span>
                                      </li>
                                      <li>
                                        <span className="play-icon">
                                          <i className="las la-play"></i>{" "}
                                          Lesson: 02
                                        </span>
                                        <span className="lecture-title">
                                        Lesson 2 title
                                        </span>
                                      </li>
                                      <li>
                                        <span className="play-icon">
                                          <i className="las la-play"></i>{" "}
                                          Lesson: 03
                                        </span>
                                        <span className="lecture-title">
                                          Lesson 3 title
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="course-item">
                                  <button className="course-button active">
                                  Topic 3: Topic Header
                                    <span>04 Lectures - 59 Min</span>
                                  </button>
                                  <div className="course-content show">
                                    <ul className="list-unstyled">
                                      <li>
                                        <span className="play-icon">
                                          <i className="las la-play"></i>{" "}
                                          Lesson: 01
                                        </span>
                                        <span className="lecture-title">
                                        Lesson 1 title
                                        </span>
                                      </li>
                                      <li>
                                        <span className="play-icon">
                                          <i className="las la-play"></i>{" "}
                                          Lesson: 02
                                        </span>
                                        <span className="lecture-title">
                                        Lesson 2 title
                                        </span>
                                      </li>
                                      <li>
                                        <span className="play-icon">
                                          <i className="las la-play"></i>{" "}
                                          Lesson: 03
                                        </span>
                                        <span className="lecture-title">
                                          Lesson 3 title
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane
                              eventKey="instructor"
                              className="instructor-tab"
                            >
                              <h5>Course Instructor</h5>
                              <div className="instructor-item">
                                <Row>
                                  <Col md="4">
                                    <div className="instructor-img">
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          `/assets/images/instructor-1.jpg`
                                        }
                                        alt=""
                                        className="img-fluid"
                                      />
                                    </div>
                                  </Col>
                                  <Col md="8">
                                    <div className="instructor-content">
                                      <div className="instructor-box">
                                        <div className="top-content d-flex justify-content-between">
                                          <div className="instructor-name">
                                            <Link
                                              to={`/instructors/${coursedetails?.data?.instructor?.user?.id}`}
                                            >
                                              <h6>
                                                {
                                                  coursedetails?.data
                                                    ?.instructor?.user
                                                    ?.first_name
                                                }
                                              </h6>
                                            </Link>

                                            <Link
                                              to={`/instructors/${coursedetails?.data?.instructor?.user?.id}`}
                                            >
                                              {`${coursedetails?.data?.instructor?.current_employer_designation}`}
                                            </Link>
                                          </div>
                                          <div className="instructor-social">
                                            <ul className="social list-unstyled list-inline">
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      coursedetails?.data
                                                        ?.instructor_profile
                                                        ?.facebook_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fab fa-facebook-f"></i>
                                                </Link>
                                              </li>
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      coursedetails?.data
                                                        ?.instructor_profile
                                                        ?.twitter_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fab fa-twitter"></i>
                                                </Link>
                                              </li>
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      coursedetails?.data
                                                        ?.instructor_profile
                                                        ?.linkedin_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fab fa-linkedin-in"></i>
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="instructor-desk">
                                          <p>
                                            {
                                              coursedetails?.data?.instructor
                                                ?.biography
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </Tab.Pane>
                            {/* <Tab.Pane eventKey="review" className="review-tab">
                          <Row>
                            <Col md="12">
                              <div className="review-comments">
                                <h5>Course Reviews</h5>
                                <div className="comment-box d-flex">
                                  <div className="comment-image">
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        `/assets/images/testimonial-2.jpg`
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="comment-content">
                                    <div className="content-title d-flex justify-content-between">
                                      <div className="comment-writer">
                                        <h6>Mark Shadow</h6>
                                        <p>Mar 26, 2020 | 06:30pm</p>
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
                                          <li className="list-inline-item">
                                            (4.5)
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="reply-btn">
                                        <button type="button">
                                          <i className="las la-reply-all"></i>
                                          Reply
                                        </button>
                                      </div>
                                    </div>
                                    <div className="comment-desc">
                                      <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Architecto laborum
                                        quas placeat perspiciatis est, nisi
                                        expedita consectetur sit minus illum
                                        laudantium nostrum dolore odit
                                        asperiores quisquam ad enim iusto
                                        laborum quas placeat perspiciatis saepe.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              
                              </div>
                              <div className="review-form">
                                <h5>Submit Review</h5>
                                <ReviewForm />
                              </div>
                            </Col>
                          </Row>
                        </Tab.Pane> */}
                        <Tab.Pane eventKey="announcements" className="annoncements-tab">
                          <Row>
                            <Col md="12">
                              <div className="review-comments">
                                <h4>No new announcements</h4>
                              </div>
                            </Col>
                          </Row>
                        </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>
                      </div>
                    </div>
                  </Col>
                  <Col lg="3" md="4" sm="12">
                    <div className="single-details-sidbar">
                      <Row>
                        <Col md="12">
                          <div className="course-details-feature">
                            <h5 className="title">Course Details</h5>

                            <div>
                              <ul className="list-unstyled feature-list">
                                <li>
                                  <i className="las la-calendar"></i> Start
                                  Date:
                                  <span>
                                    {moment(
                                      `${
                                        coursedetails && coursedetails.data
                                          ? coursedetails.data.start_date
                                          : ""
                                      }`
                                    ).format("ll")}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-clock"></i> Duration:
                                  <span>
                                    {coursedetails && coursedetails.data
                                      ? coursedetails.data.duration
                                      : ""}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-globe"></i> Language:
                                  <span>English</span>
                                </li>
                                <li>
                                  <i className="las la-sort-amount-up"></i>{" "}
                                  Skill Level: <span>Beginner</span>
                                </li>
                                <li>
                                  <i className="las la-graduation-cap"></i>{" "}
                                  Learning Partner:
                                  <span>Questence</span>
                                </li>
                                <li>
                                  <i className="las la-certificate"></i>
                                  Learning Style: <span>
                                    {coursedetails && coursedetails.data
                                      ? coursedetails.data.learning_style
                                      : ""}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-certificate"></i>
                                  Certification: <span>Yes</span>
                                </li>
                              </ul>
                            </div>

                            <button
                              type="button"
                              onClick={addToCart.bind(
                                this,
                                coursedetails?.data?.id
                              )}
                              className="enroll-btn"
                            >
                              Enroll Course
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Fragment>
        ) : (
          <p>No Details for this course yet</p>
        )}
      </Styles>

      {/* Footer 2 */}
      <FooterTwo />
    </div>
  );
};

CourseDetails.propTypes = {
  cart: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {
  addToCart,
  fetchCourses,
})(CourseDetails);
