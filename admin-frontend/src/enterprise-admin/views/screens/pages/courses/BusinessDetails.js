import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";

import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./styles/course.js";
// import moment from "moment";
// import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import {
  getBusinessDetails,
  activateBusiness,
  deactivateBusiness,
} from "../../../../api/services/admin";

const BusinessDetails = ({ match }) => {
  const [businessDetails, setbusinessDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  const [acloading, setAcLoading] = useState(false);

  const init = async () => {
    setStatus("loading");
    let businessId = parseInt(match.params.id);
    try {
      let response = await getBusinessDetails(businessId);
      setbusinessDetails({ ...response.data.data });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

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
      await activateBusiness(id);
      toast.success("Business Approved");
    } catch (err) {
      toast.error("Error updating Business");
    }
    setAcLoading(false);
  };

  const handleDectivate = async (id) => {
    setAcLoading(true);
    try {
      await deactivateBusiness(id);
      toast.success("Business Deactivated");
    } catch (err) {
      toast.error("Error updating Business");
    }
    setAcLoading(false);
  };

  return (
    <div className="main-wrapper course-details-page">
      {/* Header 2 */}


      {/* Breadcroumb */}
      {Object.entries(businessDetails).length !== 0 && (
        <BreadcrumbBox title={businessDetails?.company_name} />
      )}

      <>
        {/* Course Details */}
        {loading ? (
          <Loader width="70" />
        ) : Object.entries(businessDetails).length !== 0 ? (
          <Fragment>
            <section className="course-details-area">
              <Container>
                <Row>
                  <Col lg="9" md="8" sm="12">
                    <div className="course-details-top">
                      <div className="heading">
                        <h4>{businessDetails?.company_name}</h4>
                      </div>
                      <div className="course-top-overview">
                        <div className="d-flex overviews">
                          <div className="author">
                            <img
                              src={businessDetails?.user?.image_url}
                              alt="author"
                            />
                            <div className="author-name">
                              <h6>Company</h6>
                              <p>{businessDetails?.company_name}</p>
                            </div>
                          </div>
                          <div className="category">
                            <h6>Countryy</h6>
                            <p>
                              {businessDetails
                                ? businessDetails?.country?.name
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
                            <h6>Company Address</h6>
                            <p>{businessDetails?.hq_address}</p>
                          </div>
                        </div>
                      </div>

                      <div className="course-tab-list">
                        <Tab.Container defaultActiveKey="overview">
                          <Nav className="flex-column">
                            <Nav.Item>
                              <Nav.Link eventKey="overview">Overview</Nav.Link>
                            </Nav.Item>
                          </Nav>
                          <Tab.Content>
                            <Tab.Pane
                              eventKey="overview"
                              className="overview-tab"
                            >
                              <div className="course-desc">
                                <h5>Comapny Description</h5>
                                <p>
                                  {businessDetails
                                    ? businessDetails.company_description
                                    : ""}
                                </p>
                              </div>
                              <div className="course-feature">
                                <h5>Company Registration</h5>
                                <p>{businessDetails?.registration_number}</p>
                              </div>
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

                            {/* <div>
                              <ul className="list-unstyled feature-list">
                                <li>
                                  <i className="las la-calendar"></i> Start
                                  Date:
                                  <span>
                                    {moment(
                                      `${
                                        businessDetails && businessDetails
                                          ? businessDetails.start_date
                                          : ""
                                      }`
                                    ).format("ll")}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-clock"></i> Duration:
                                  <span>
                                    {businessDetails && businessDetails
                                      ? businessDetails.duration
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
                                    {businessDetails && businessDetails
                                      ? businessDetails.learning_style
                                      : ""}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-certificate"></i>
                                  Certification: <span>Yes</span>
                                </li>
                              </ul>
                            </div> */}

                            {parseInt(businessDetails.status) === -1 && (
                              <Fragment>
                                <Button
                                  className="mt-4 w-100 enroll-btn"
                                  variant="success"
                                  type="button"
                                  onClick={handleActivate.bind(
                                    this,
                                    businessDetails.id
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

                            {/* {parseInt(businessDetails.status) === 0 && (
                              <Fragment>
                                <Button
                                  className="mt-4 w-100 enroll-btn"
                                  variant="success"
                                  type="button"
                                  onClick={handleActivate.bind(
                                    this,
                                    businessDetails.id
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
                                    businessDetails.id
                                  )}
                                >
                                  {acloading ? (
                                    <Loader fill="white" width="70" />
                                  ) : (
                                    "Dectivate Course"
                                  )}
                                </Button>
                              </Fragment>
                            )} */}

                            {parseInt(businessDetails.status) === 1 && (
                              <Fragment>
                                <Button
                                  className="mt-4 w-100 enroll-btn"
                                  variant="danger"
                                  type="button"
                                  onClick={handleDectivate.bind(
                                    this,
                                    businessDetails.id
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

      {/* Footer 2 */}
      <Footer />
    </div>
  );
};

export default BusinessDetails;
