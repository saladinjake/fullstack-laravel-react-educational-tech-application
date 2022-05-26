import React, { useState } from "react";
import { Nav, Container, Row, Col, Tab, Button } from "react-bootstrap";
import InstructorNavBar from "components/Navbar/AdminNavbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./learners/styles/product.js";

import Active from "./certificates/active";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";

import { createCertificate } from "services/admin";

const AdminCertificates = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = { name: "" };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await createCertificate(values);
      toast.success("Certifcate Created");
      setSubmitting(false);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setSubmitting(false);
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
        <BreadcrumbBox title="Certificates" />

        {/* New Poducts Area */}
        <Container>
          <Row>
            <Col lg="12">
              <div className="course-tab-list">
                <Tab.Container defaultActiveKey="active">
                  <Nav className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="active">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="create">New</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="active" className="active-tab">
                      <Row>
                        <Active />
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="create" className="active-tab">
                      <Row>
                        <Col md="12">
                          <Formik
                            initialValues={initialValues}
                            validationSchema={CertificateSchema}
                            onSubmit={handleSubmit}
                          >
                            {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                            }) => (
                              <div className="login-box">
                                <div className="login-title text-center">
                                  <h3>Create Category</h3>
                                </div>
                                <form
                                  id="form_login"
                                  className="form"
                                  onSubmit={handleSubmit}
                                >
                                  <p className="form-control">
                                    <label htmlFor="email">Name</label>
                                    <input
                                      type="text"
                                      placeholder="Certificate Name"
                                      id="name"
                                      name="name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.name}
                                    />
                                    <span className="login_input-msg">
                                      {errors.name &&
                                        touched.name &&
                                        errors.name}
                                    </span>
                                  </p>

                                  <p className="form-control">
                                    <label htmlFor="registration_email">
                                      Description
                                    </label>
                                    <textarea
                                      placeholder="Description here"
                                      name="description"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.description}
                                      id="registration_description"
                                    ></textarea>

                                    {touched.description &&
                                    errors.description ? (
                                      <span className="registration_input-msg">
                                        {errors.description}
                                      </span>
                                    ) : null}
                                  </p>

                                  <Button
                                    varirant="info"
                                    type="submit"
                                    disabled={isSubmitting}
                                  >
                                    {loading ? (
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Creating...
                                        </span>
                                      </div>
                                    ) : (
                                      "Create Certifcate"
                                    )}
                                  </Button>
                                </form>
                              </div>
                            )}
                          </Formik>
                        </Col>
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </Col>
          </Row>
        </Container>

        {/* <Footer /> */}
        <Footer />
      </div>
    </>
  );
};

export default AdminCertificates;

const CertificateSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});
