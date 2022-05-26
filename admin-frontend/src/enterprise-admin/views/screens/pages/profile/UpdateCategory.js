import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Footer from "../../components/Footer";
//from "./styles/account.js";
// import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { getCategoryDetails, updateParentCategory } from "../../../../api/services/admin";
import Loader from "../../components/Loader/Loader";
import * as Yup from "yup";

const UpdateCategory = ({ match }) => {
  // let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});

  let initialValues = useMemo(() => {
    return Object.entries(category).length !== 0
      ? {
          name: category.name || "",
        }
      : {};
  }, [category]);

  useEffect(() => {
    (async function loadContent() {
      await fetchContent();
    })();
    // eslint-disable-next-line
  }, []);

  const fetchContent = async () => {
    try {
      let res = await getCategoryDetails(match.params.id);
      setCategory({ ...res.data.data[0] });
    } catch (err) {
      toast.error("Error Occured");
    }
    setLoading(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await updateParentCategory(match.params.id, values);
      let res = await getCategoryDetails(match.params.id);
      setCategory({ ...res.data.data[0] });
      toast.success("Category updated.");
    } catch (err) {
      toast.error("Error occured updating category");
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


        {/* Registration Area */}
        <section className="registration-area">
          <Container>
            {loading ? (
              <Loader width="70" />
            ) : Object.entries(category).length !== 0 ? (
              <Fragment>
                <Row>
                  <Col lg="12">
                    <div className="">
                      <div className="registration-title text-center">
                        <h3>Update Category</h3>
                      </div>

                      <Formik
                        initialValues={initialValues}
                        validationSchema={CategorySchema}
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
                            </Row>

                            <button type="submit" disabled={isSubmitting}>
                              {loading ? (
                                <div className="spinner-border" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                              ) : (
                                "Update Category"
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

export default UpdateCategory;

const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
