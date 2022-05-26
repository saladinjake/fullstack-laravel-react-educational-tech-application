import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
//from "./styles/account.js";
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
    console.log(values);
    try {
      await registerLearner(values);
      toast.success("Learner created Successfully");
      
      setSubmitting(false);
    } catch (err) {
      console.log(
        err?.response?.data?.errors?.email[0] || err?.response?.data?.message
      );
      toast.error(
        err?.response?.data?.errors?.email[0] || err?.response?.data?.message
      );
      setSubmitting(false);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        {/* Header 2 */}
     


        {/* Registration Area */}
        <section className="registration-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="card-box col-md-12">
                  <div className="registration-title text-center">
                    <h3>Create User</h3>
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
                        id="form_contact2"
                        className="form"
                        onSubmit={handleSubmit}
                      >
                        <p className="">
                          <label htmlFor="registration_fname">First Name</label>
                          <input className="form-control"
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
                        <p className="">
                          <label htmlFor="registration_lname">Last Name</label>
                          <input className="form-control"
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
                        <p className="">
                          <label htmlFor="registration_email">
                            Email Address
                          </label>
                          <input className="form-control"
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
                        <p className="">
                          <label htmlFor="registration_user">
                            Phone Number
                          </label>
                          <input className="form-control"
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
                        <p className="">
                          <label htmlFor="registration_password">
                            Password
                          </label>
                          <label htmlFor="registration_password">
                            <i>
                              At least eight chatracters,one letter and one
                              number
                            </i>
                          </label>
                          <input className="form-control"
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
                        <p className="">
                          <label htmlFor="registration_cpassword">
                            Confirm Password
                          </label>
                          <input className="form-control"
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
                  
                </div>
              </Col>
            </Row>



            <form  id="form_contact3" style={{display:"none"}}>
                                           <input className="form-control" style={{display:"none"}}
                                                              type="text"
                                                              placeholder="Subject"
                                                              id="contact_subject"
                                                              value="Invitation To Questence E-Learning Platform"
                                                            /><span className="contact_input-msg"></span>


                                                    <textarea style={{display:"none"}}
                                                              name="message"
                                                              id="contact_message"
                                                              placeholder="Enter Message"
                                                            >
                                                            You are here by invited to Join
                                                            Questence. please follow the Link
                                                            http://q.tqfe.net/register
                                                            to sign up


                                                            </textarea>
                                                            <span className="contact_input-msg"></span>

                                            <input className="form-control"     
                                            id="contact_email"  
                                            type="text" name="email" 
                                            placeholder="Enter your email address" /><span className="contact_input-msg"></span>
                                            <input className="form-control" type="submit" value="Send Invite" />
                                          </form>
          </Container>
        </section>

       
      </div>
    </>
  );
};

export default Register;

// var passwordRegex = new RegExp(
//   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
// );
var passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})");

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
    .min(8, "Minimum of eight characters!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(
      passwordRegex,
      "Password must contain One letter, One Number with a minimum of eight characters"
    ),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  phone_number: Yup.number()
    .required("Required")
    .positive("No negative number")
    .integer(),
});
