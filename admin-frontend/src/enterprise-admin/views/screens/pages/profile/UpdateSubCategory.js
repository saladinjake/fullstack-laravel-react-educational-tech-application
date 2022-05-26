import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "../../components/Footer";
//from "./styles/account.js";
// import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { getCategories, updateSubCategory } from "../../../../api/services/admin";
import Loader from "../../components/Loader/Loader";
import * as Yup from "yup";

const UpdateSubCategory = ({ match, history }) => {
  // let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});

  let initialValues = {
    name: history.location?.state?.name,
    parent_id: history.location?.state?.parent_id,
  };

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getCategories();
        setCategory([...res.data.data]);
      } catch (err) {
        toast.error(`Error fetching categories`);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await updateSubCategory(history.location?.state?.parent_id, values);
      toast.success("SubCategory updated.");
    } catch (err) {
      toast.error("Error occured updating subcategory");
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
            ) : Object.entries(category).length !== 0 ? (
              <Fragment>
                <Row>
                  <Col lg="12">
                    <div className="registration-box instructorregister">
                      <div className="registration-title text-center">
                        <h3>Update SubCategory</h3>
                      </div>

                      <Formik
                        initialValues={initialValues}
                        validationSchema={SubCategorySchema}
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
                                <label htmlFor="registration_user">
                                  Category
                                </label>
                                <select
                                  name="parent_id"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.parent_id}
                                  required
                                >
                                  {category.length > 0 &&
                                    category.map((catItem, i) => {
                                      return (
                                        <option key={i} value={catItem.id}>
                                          {catItem.name}
                                        </option>
                                      );
                                    })}
                                </select>
                                {touched.parent_id && errors.parent_id ? (
                                  <span className="registration_input-msg">
                                    {errors.parent_id}
                                  </span>
                                ) : null}
                              </p>

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

export default UpdateSubCategory;

const SubCategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  parent_id: Yup.string().required("Required"),
});
