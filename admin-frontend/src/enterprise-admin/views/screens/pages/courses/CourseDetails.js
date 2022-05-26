import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";

import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./styles/course.js";
import moment from "moment";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { getCourse } from "../../../../api/services/course";
import { activateCourse, deactivateCourse, pendCourse } from "../../../../api/services/admin";


// import EditCourse from "../admin/EditCourse"

import EditCourse from "../dashboard/actions/create/NewEditForm"

const CourseDetails = ({ match }) => {
  const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  const [acloading, setAcLoading] = useState(false);

  const [editClicked, setEditClicked] = useState(false)

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
console.log(coursedetails?.data)


  const initialValues = {
    id: coursedetails?.data?.id || "",
    course_name: coursedetails?.data?.course_name || "",
    learning_style: coursedetails?.data?.learning_style || "",
    duration: coursedetails?.data?.duration || "",
    language_id: coursedetails?.data?.language_id || "",
    certificate_id:coursedetails?.data?.certificate_id || "",
    course_code:coursedetails?.data?.course_code || "",
    price:coursedetails?.data?.price || "",
    category_id: coursedetails?.data?.category_id || "",
    course_description: coursedetails?.data?.course_description || "",
    course_thumbnail: coursedetails?.data?.course_thumbnail || "",
    business_id: coursedetails?.data?.business_id || "",
    introduction_video: coursedetails?.data?.introduction_video || "",
    start_date: coursedetails?.data?.start_date,
    end_date: coursedetails?.data?.end_date || "",
    enrollment_start: coursedetails?.data?.enrollment_start || "",
    enrollment_end: coursedetails?.data?.enrollment_end || "",
    course_overview: coursedetails?.data?.course_overview || "",
    prerequisite_course: coursedetails?.data?.prerequisite_course || "",
    entrance_exam: coursedetails?.data?.entrance_exam || "",
    license: coursedetails?.data?.license || "",
    overall_grade_range: coursedetails?.data?.overall_grade_range || "",
    grace_period_on_deadline: coursedetails?.data?.grace_period_on_deadline || "",
    course_cover_image: coursedetails?.data?.course_cover_image || "",
    topics:coursedetails?.data?.topics || "",
    curriculum:coursedetails?.data?.topics || "",
    outcomes:coursedetails?.data?.outcomes || "",
    instructors: coursedetails?.data?.instructors || [],
    instructor_id:  coursedetails?.data?.instructor_id || "",
    instructor: coursedetails?.data?.instructor || {}
  };


  console.log(initialValues)

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

  const handleActivate = async (id) => {
    setAcLoading(true);
    try {
      await activateCourse(id);
      toast.success("Course Approved");
    } catch (err) {
      toast.error("Error updating Course");
    }
    setAcLoading(false);
  };

  const handleDectivate = async (id) => {
    setAcLoading(true);
    try {
      await deactivateCourse(id);
      toast.success("Course Deactivated");
    } catch (err) {
      toast.error("Error updating Course");
    }
    setAcLoading(false);
  };


  const handlePending = async (id) => {
    setAcLoading(true);
    try {
      await pendCourse(id);
      toast.success("Course Pended");
    } catch (err) {
      toast.error("Error updating Course");
    }
    setAcLoading(false);
  };

  return (
    <div className="main-wrapper course-details-page" style={{background:"#fff"}}>
      {/* Header 2 */}



      {editClicked == true ? (
           <EditCourse initialValues={initialValues} />

      ) : (




      

      <div>

      {/* Breadcroumb */}
      {/*Object.entries(coursedetails).length !== 0 && (
        <BreadcrumbBox title={coursedetails.data.category.name} />
      )*/}

      <>
        {/* Course Details */}
        {loading ? (
          <Loader width="70" />
        ) : Object.entries(coursedetails).length !== 0 ? (
          <Fragment>
            <section className="course-details-area"  style={{height:"2600px", background:"#fff"}} >
              <Container>
                <Row>
                  <Col lg="9" md="8" sm="12">
                    <div className="course-details-top" >
                      <div className="heading">
                        <h4> Course Title {coursedetails?.data?.course_name}  </h4>
                        <br/>
                        <h6>Admin Course Preview</h6>
                        <br/>
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
                            <p>NGN{coursedetails?.data?.price}</p>
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
                              <Nav.Link eventKey="announcements">
                                Announcements
                              </Nav.Link>
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

                                {coursedetails?.data?.course_description.length > 0 &&  (
                              <section
                                  className="not-found-controller"
                                  dangerouslySetInnerHTML={{ __html: coursedetails?.data?.course_description }}
                              />
                          )}

                                  
                                </p>
                              </div>
                              <div className="course-feature">
                                <h5>What you will learn</h5>
                              


                                {coursedetails?.data?.outcomes?.length > 0 &&  (
                              <section
                                  className="not-found-controller"
                                  dangerouslySetInnerHTML={{ __html: coursedetails?.data?.outcomes }}
                              />
                          )}

                              </div>
                            </Tab.Pane>
                            <Tab.Pane
                              eventKey="curriculum"
                              className="curriculum-tab"
                            >
                              <div className="course-element">

                                <h5>Pre requisites for this course</h5>

                                  {coursedetails?.data?.prerequisite_course?.length > 0 &&  (
                              <section
                                  className="not-found-controller"
                                  dangerouslySetInnerHTML={{ __html: coursedetails?.data?.prerequisite_course }}
                              />
                          )}

                                <h5>Course Curriculum</h5>


                                   {coursedetails?.data?.topics?.length > 0 &&  (
                              <section
                                  className="not-found-controller"
                                  dangerouslySetInnerHTML={{ __html: coursedetails?.data?.topics }}
                              />
                          )}

                                


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
                                          `/assets/images/questone.jpg`
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
                                              to={`/instructors/${coursedetails?.data?.instructor?.id}`}
                                            >
                                              <h6>
                                                {
                                                  coursedetails?.data
                                                    ?.instructor
                                                    ?.first_name
                                                }

                                                {
                                                  coursedetails?.data
                                                    ?.instructor
                                                    ?.last_name
                                                }
                                              </h6>
                                            </Link>
                                             
                                            <Link
                                              to={`/instructors/${coursedetails?.data?.instructor?.id}`}
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
                                                        ?.instructor
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
                                                        ?.instructor
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
                                                      coursedetails?.data?.instructor?.linkedin_url,
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
                                            place biography here
                                          </p>
                                        </div>
                                      </div>
                                    </div>







                                    
                                  </Col>
                                  <br/><br/><br/><br/><br/><br/>
                                  <Col md="12">
                                    <h5> Collaborators</h5>
                                  {coursedetails?.data?.instructors?.length > 0 && coursedetails?.data?.instructors.map(collaborators =>{
                                       return (

                                            <div className="DIVCARD">
                                                  <div className="divHEADER" style={{


                                                    background:"url(" + `${process.env.PUBLIC_URL}` + `/assets/images/questone.jpg` + ")",
                                                  }}>

                                                      <div className="cardHeaderHidden">
                                                          <div className="dateHEADER">
                                                              <div className="cardHeaderDay">14</div>
                                                              <div className="cardHeaderMonth">June</div>
                                                              <div className="cardHeaderYear">2016</div>
                                                          </div>
                                                      </div>   
                                                  </div>
                                                  
                                                  <div className="mainBODY">
                                                      <div className="bodyHeader">
                                                          <div className="bannerBODY">{collaborators.first_name} {collaborators.last_name}</div>  
                                                          <h5>{collaborators?.instructor_profile?.short_description}</h5>
                                                              
                                                      </div>
                                                  </div>
                                                     
                                                      <p className="BodyDescription">
                                                         <p className="bodySentence">
                                                                  <h2>{collaborators?.instructor_profile?.detailed_introduction} Senior software engineer</h2>
                                                              </p>
                                                      </p>

                                                 
                                                  <div className="divFOOTER">
                                                      {/*<i className="icon icon-time"></i> 2min. read
                                                      <i className="icon icon-comment"></i> 2139 comments*/}
                                                  </div>
                                        </div>


                                       )

                                  })}


                                  </Col>



                                </Row>
                              </div>
                            </Tab.Pane>

                            <Tab.Pane
                              eventKey="announcements"
                              className="annoncements-tab"
                            >
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
                                  Learning Style:{" "}
                                  <span>
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

                            {parseInt(coursedetails.data.status) === -1 && (
                              <Fragment>
                                <Button
                                  className="mt-4 w-100 enroll-btn"
                                  variant="success"
                                  type="button"
                                  onClick={handleActivate.bind(
                                    this,
                                    coursedetails.data.id
                                  )}
                                >
                                  {acloading ? (
                                    <Loader fill="white" width="70" />
                                  ) : (
                                    "Activate Course"
                                  )}
                                </Button>




                                

                              </Fragment>
                            )}

                            {parseInt(coursedetails.data.status) === 0 && (
                              <Fragment>
                                <Button
                                  className="mt-4 w-100 enroll-btn"
                                  variant="success"
                                  type="button"
                                  onClick={handleActivate.bind(
                                    this,
                                    coursedetails.data.id
                                  )}
                                >
                                  {acloading ? (
                                    <Loader fill="white" width="70" />
                                  ) : (
                                    "Activate Course"
                                  )}
                                </Button>

                                <Button
                                  className="mt-4 w-100 enroll-btn"
                                  variant="danger"
                                  type="button"
                                  onClick={handleDectivate.bind(
                                    this,
                                    coursedetails.data.id
                                  )}
                                >
                                  {acloading ? (
                                    <Loader fill="white" width="70" />
                                  ) : (
                                    "Dectivate Course"
                                  )}
                                </Button>
                              </Fragment>
                            )}

                            {parseInt(coursedetails.data.status) === 1 && (
                              <Fragment>
                                <Button
                                  className="mt-4 w-100 enroll-btn"
                                  variant="danger"
                                  type="button"
                                  onClick={handleDectivate.bind(
                                    this,
                                    coursedetails.data.id
                                  )}
                                >
                                  {acloading ? (
                                    <Loader fill="white" width="70" />
                                  ) : (
                                    "Dectivate Course"
                                  )}
                                </Button>



                              

                              </Fragment>
                            )}





                            <Button
                                  className="mt-4 w-100 enroll-btn"
                                  variant="success"
                                  type="button"
                                  onClick={()=>{
                                    setEditClicked(true)
                                  }}
                                >
                                  Edit Course
                                </Button>
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
      </>

        </div>

      )}

      {/* Footer 2 */}
      <Footer />


    </div>
  );
};

export default CourseDetails;
