import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../../components/Header";
import { BreadcrumbBox } from "../../../components/common/Breadcrumb";
import FooterTwo from "../../../components/Footer";
import { Styles } from "./styles/account.js";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { registerLearner } from "services/auth";

const Register = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password_confirmation: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await registerLearner(values);
      toast.success("We have sent a verification mail to your email.");
      setTimeout(() => {
        history.push("/login");
      }, 2000);
      setSubmitting(false);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setSubmitting(false);
    }
    setLoading(false);
  };

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        {/* Header 2 */}
        <HeaderTwo />

        
        {/* Registration Area */}
        <section className="registration-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="registration-box">
                  <div className="registration-title text-center">
                    <h3>Registration</h3>
                  </div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterSchema}
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
                        <p className="form-control">
                          <label htmlFor="registration_fname">First Name</label>
                          <input
                            type="text"
                            placeholder="First name"
                            name="first_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                            id="registration_fname"
                          />
                          <span className="registration_input-msg">
                            {" "}
                            {errors.first_name &&
                              touched.first_name &&
                              errors.first_name}
                          </span>
                        </p>
                        <p className="form-control">
                          <label htmlFor="registration_lname">Last Name</label>
                          <input
                            type="text"
                            placeholder="Last name"
                            name="last_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
                            id="registration_lname"
                          />
                          <span className="registration_input-msg">
                            {errors.last_name &&
                              touched.last_name &&
                              errors.last_name}
                          </span>
                        </p>
                        <p className="form-control">
                          <label htmlFor="registration_email">
                            Email Address
                          </label>
                          <input
                            type="email"
                            placeholder="Email here"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            id="registration_email"
                          />
                          <span className="registration_input-msg">
                            {errors.email && touched.email && errors.email}
                          </span>
                        </p>
                        <p className="form-control">
                          <label htmlFor="registration_user">
                            Phone Number
                          </label>
                          <input
                            type="number"
                            id="phone_number"
                            name="phone_number"
                            placeholder="Your phone_number here"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone_number}
                          />
                          <span className="registration_input-msg">
                            {errors.phone_number &&
                              touched.phone_number &&
                              errors.phone_number}
                          </span>
                        </p>
                        <p className="form-control">
                          <label htmlFor="registration_password">
                            Password
                          </label>
                          <input
                            type="password"
                            placeholder="*******"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <span className="registration_input-msg">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                        </p>
                        <p className="form-control">
                          <label htmlFor="registration_cpassword">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            placeholder="Confirm password"
                            id="password_confirmation"
                            name="password_confirmation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password_confirmation}
                          />
                          <span className="registration_input-msg">
                            {errors.password_confirmation &&
                              touched.password_confirmation &&
                              errors.password_confirmation}
                          </span>
                        </p>
                        <button type="submit" disabled={isSubmitting}>
                          {loading ? (
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            "Register"
                          )}
                        </button>
                      </form>
                    )}
                  </Formik>
                  <div className="have_account-btn text-center">
                    <p>
                      Already have an account? <Link to="/login"> Login Here</Link>
                    </p>
                  </div>
                  <div className="have_account-btn text-center">
                    <p>
                      <Link to="/register/instructor"> Register as an Instructor </Link>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </Styles>
  );
};

export default Register;

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name Required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name Required"),
  email: Yup.string()
    .email("Invalid email")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Valid Email Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  phone_number: Yup.number()
    .required("Required")
    .positive("No negative number")
    .integer(),
});
