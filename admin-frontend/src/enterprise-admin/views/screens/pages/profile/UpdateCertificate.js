import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "../../components/Footer";
//from "./styles/account.js";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { getCertificateDetails, updateCertificate } from "../../../../api/services/admin";
import Loader from "../../components/Loader/Loader";
import * as Yup from "yup";

const UpdateCertificate = ({ match }) => {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState({});

  let initialValues = useMemo(() => {
    return Object.entries(certificate).length !== 0
      ? {
          name: certificate.name || "",
          description: certificate.description || "",
        }
      : {};
  }, [certificate]);

  useEffect(() => {
    (async function loadContent() {
      await fetchContent();
    })();
    // eslint-disable-next-line
  }, []);

  const fetchContent = async () => {
    try {
      let res = await getCertificateDetails(match.params.id);
      setCertificate({ ...res.data.data });
    } catch (err) {
      toast.error("Error Occured");
    }
    setLoading(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await updateCertificate(match.params.id, values);
      toast.success("certificate updated.");
      history.push("/admin/certificates");
    } catch (err) {
      toast.error("Error occured updating certificate");
    }
    setSubmitting(false);
    setLoading(false);
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        {/* Header 2 */}


        {/* Breadcroumb */}
        <BreadcrumbBox title="Update Profile" />

        {/* Registration Area */}
        <section className="registration-area">
          <Container>
            {loading ? (
              <Loader width="70" />
            ) : Object.entries(certificate).length !== 0 ? (
              <Fragment>
                <Row>
                  <Col lg="12">
                    <div className="registration-box instructorregister">
                      <div className="registration-title text-center">
                        <h3>Update certificate</h3>
                      </div>

                      <Formik
                        initialValues={initialValues}
                        validationSchema={certificateSchema}
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
                          <form
                            id="form_registration"
                            className="form"
                            onSubmit={handleSubmit}
                          >
                            <Row>
                              <p className="">
                                <label htmlFor="registration_email">Name</label>
                                <input className="form-control"
                                  type="text"
                                  required
                                  placeholder="name"
                                  name="name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.name}
                                  id="registration_email"
                                />
                                {touched.name && errors.name ? (
                                  <span className="registration_input-msg">
                                    {errors.name}
                                  </span>
                                ) : null}
                              </p>

                              <p className="">
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

                                {touched.description && errors.description ? (
                                  <span className="registration_input-msg">
                                    {errors.description}
                                  </span>
                                ) : null}
                              </p>
                            </Row>

                            <button type="submit" disabled={isSubmitting}>
                              {loading ? (
                                <div className="spinner-border" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                              ) : (
                                "Update certificate"
                              )}
                            </button>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </Col>
                </Row>
              </Fragment>
            ) : (
              <p>No Details for this user yet</p>
            )}
          </Container>
        </section>

        {/* Footer 2 */}
        <Footer />
      </div>
    </>
  );
};

export default UpdateCertificate;


const certificateSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});
