import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col} from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import InstructorNavBar from "components/Navbar/AdminNavbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
// import Pagination from "./../../components/Pagination";
//from "./styles/product.js.js";
import { getInstructorCourses } from "services/instructor.js";
import Loader from "components/Loader/Loader";
import toast from "react-hot-toast";
import InstructorBtns from "./InsructorBtns";


const InstructorPendingCourses = () => {
  const [activeCourses, setActiveCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // let history = useHistory();

  useEffect(() => {
    fetchAuthProfile();
  }, []);

  const fetchAuthProfile = async () => {
    try {
     let allCourses = await getInstructorCourses();
     setActiveCourses(
       allCourses.data.data.data.length > 0 &&
         allCourses.data.data.data.filter((course) => {
           return parseInt(course.status) === 0;
         })
     );
    } catch (err) {
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );
    }
    setLoading(false);
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper product-page">
        {/* Header 2 */}
        <InstructorNavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="My Courses" />

        {/* New Poducts Area */}
        <Container>
          <InstructorBtns />
          <Row>
            <Col md="12">
              <div className="sec-title text-center">
                <h4>My Pending Courses</h4>
              </div>
              <Row className="filter-items">
                {loading ? (
                  <Loader width="70" />
                ) : activeCourses.length > 0 ? (
                  <Fragment>
                    {activeCourses.map((data, i) => (
                      <Col lg="4" md="6" key={i} data-id={data.id}>
                        <div className="course-item">
                          <Link to={process.env.PUBLIC_URL + data.id}>
                            <div
                              className="course-image"
                              style={{
                                backgroundImage: `url(${data?.course_thumbnail})`,
                              }}
                            >
                              <div className="author-img d-flex"></div>
                            </div>
                          </Link>
                          <div className="course-content">
                            <h6 className="heading">
                              <Link to={process.env.PUBLIC_URL + data.id}>
                                {data?.course_name}
                              </Link>
                            </h6>
                            <p className="author">
                              {/* A Course by {data.authorName} */}
                            </p>
                            <p className="desc">{data.course_description}</p>
                            <div className="course-face d-flex justify-content-between">
                              <div className="duration">
                                <p>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.9583 6.13748C15.8536 5.81349 15.5662 5.58339 15.2262 5.55275L10.6082 5.13342L8.78208 0.859266C8.64744 0.546026 8.34079 0.343262 8.00008 0.343262C7.65937 0.343262 7.35273 0.546026 7.21808 0.859999L5.39198 5.13342L0.773211 5.55275C0.433847 5.58412 0.147219 5.81349 0.0418692 6.13748C-0.0634802 6.46146 0.0338123 6.81682 0.290533 7.04082L3.78122 10.1022L2.7519 14.6364C2.67658 14.9697 2.80598 15.3143 3.0826 15.5143C3.23128 15.6217 3.40524 15.6764 3.58066 15.6764C3.7319 15.6764 3.88193 15.6356 4.01658 15.5551L8.00008 13.1743L11.9821 15.5551C12.2735 15.7304 12.6408 15.7144 12.9168 15.5143C13.1936 15.3137 13.3228 14.969 13.2475 14.6364L12.2182 10.1022L15.7089 7.04143C15.9656 6.81682 16.0636 6.46207 15.9583 6.13748Z"
                                      fill="#FFC107"
                                    />
                                  </svg>
                                </p>
                              </div>
                              <div className="student">
                                <p>#{data.price}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Fragment>
                ) : (
                  <p>No pending course yet.</p>
                )}
              </Row>
            </Col>
          </Row>
        </Container>

        {/* <Footer /> */}
        <Footer />
      </div>
    </>
  );
};

export default InstructorPendingCourses;
