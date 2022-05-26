import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";

import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./styles/course.js"; 
import { useHistory } from 'react-router-dom';

import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { getCertificateDetails } from "../../../../api/services/admin";

const CertificateDetails = ({ match }) => {


  let history = useHistory();
  const [certificateDetails, setcertificateDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  const init = async () => {
    setStatus("loading");
    try {
      let response = await getCertificateDetails(match.params.id);
      setcertificateDetails({ ...response.data.data });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      toast.error("Error occured fetching details")
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

 

  return (
    <div className="main-wrapper course-details-page">
      {/* Header 2 */}


      {/* Breadcroumb */}
      {Object.entries(certificateDetails).length !== 0 && (
        <BreadcrumbBox title={certificateDetails?.name} />
      )}

      <>
        {/* Course Details */}
        {loading ? (
          <Loader width="70" />
        ) : Object.entries(certificateDetails).length !== 0 ? (
          <Fragment>
            <section className="course-details-area">
              <Container>
                <Row>
                  <Col lg="9" md="8" sm="12">
                    <div className="course-details-top">
                      <div className="heading">
                        <h4>{certificateDetails?.name}</h4>
                      </div>
                      <div className="course-top-overview">
                        <div className="d-flex overviews">
                          <div className="category">
                            <h6>Description</h6>
                            <p>
                              {certificateDetails
                                ? certificateDetails?.description
                                : ""}
                            </p>
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
                                <h5>Certificate Description</h5>
                                <p>
                                  {certificateDetails
                                    ? certificateDetails.description
                                    : ""}
                                </p>
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
                            <h5 className="title">Certificate Action</h5>

                              <Fragment>
                                <Button
                                  className="mt-4 w-100 enroll-btn"
                                  variant="info"
                                  type="button"
                                  onClick={() =>
                                    history.push(`/admin/certificates/update/${certificateDetails?.id}`)
                                  }
                                >
                                  Update Certificate
                                </Button>
                              </Fragment>
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

export default CertificateDetails;
