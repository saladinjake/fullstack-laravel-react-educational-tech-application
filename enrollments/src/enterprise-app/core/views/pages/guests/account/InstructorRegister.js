import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../../components/Header";
import { BreadcrumbBox } from "../../../components/common/Breadcrumb";
import FooterTwo from "../../../components/Footer";
import { Styles } from "./styles/account.js";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { registerInstructor } from "../../../../api/services/auth";
import { getCountries } from "../../../../api/services/country";
import { getIndustries } from "../../../../api/services/industry";
import { getLanguages } from "../../../../api/services/language";
import { instructorSchema } from "../../../../helpers/common/validations";
import {
  Degrees,
  EducationLevel,
  EmploymentStatus,
  ExperienceLevel,
  MaritalStatus,
} from "../../../../helpers/common/data";

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: instructor register page

*/

const InstructorRegister = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [languages, setLanguages] = useState([]);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    country_id: 0,
    industry_id: 0,
    biography: "",
    employment_status: "",
    marital_status: "",
    experience_level: "",
    education_level: "",
    degree_obtained: "",
    language: "",
    facebook_url: "",
    linkedin_url: "",
    twitter_url: "",
    current_employer_name: "",
    current_employer_designation: "",
    previous_employer_name: "",
    previous_employer_designation: "",
  };

  useEffect(() => {
    Promise.all(
      [getCountries(), getIndustries(), getLanguages()].map((err) =>
        err.catch(() => err)
      )
    )
      .then((res) => {
        setCountries([...res[0].data.data]);
        setIndustries([...res[1].data.data]);
        setLanguages([...res[2].data.data]);
      })
      .catch((err) => {
        toast.error("Error Occured fetchong data");
      });
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    values.phone_number = values.phone_number.toString();
    values.country_id = parseInt(values.country_id);
    values.industry_id = parseInt(values.industry_id);
    try {
      await registerInstructor(values);
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: instructorSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Registration" />

        {/* Registration Area */}
        <section className="registration-area">
          <Container>
            <Row>
              <Col lg="12">
                <div className="registration-box instructorregister">
                  <div className="registration-title text-center">
                    <h3>Registration</h3>
                  </div>

                  <form
                    id="form_registration"
                    className="form"
                    onSubmit={formik.handleSubmit}
                  >
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_fname">First Name</label>
                        <input
                          type="text"
                          required
                          placeholder="First name"
                          name="first_name"
                          {...formik.getFieldProps("first_name")}
                          id="registration_fname"
                        />
                        {formik.touched.first_name &&
                        formik.errors.first_name ? (
                          <span className="registration_input-msg">
                            {formik.errors.first_name}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_lname">Last Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Last name"
                          name="last_name"
                          {...formik.getFieldProps("last_name")}
                          id="registration_lname"
                        />
                        {formik.touched.last_name && formik.errors.last_name ? (
                          <span className="registration_input-msg">
                            {formik.errors.last_name}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Email here"
                          name="email"
                          {...formik.getFieldProps("email")}
                          id="registration_email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <span className="registration_input-msg">
                            {formik.errors.email}
                          </span>
                        ) : null}
                      </p>
                    </Row>
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_user">Phone Number</label>
                        <input
                          type="number"
                          id="phone_number"
                          name="phone_number"
                          placeholder="08112345687"
                          {...formik.getFieldProps("phone_number")}
                        />
                        {formik.touched.phone_number &&
                        formik.errors.phone_number ? (
                          <span className="registration_input-msg">
                            {formik.errors.phone_number}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">Biography</label>
                        <textarea
                          placeholder="Biography here"
                          name="biography"
                          {...formik.getFieldProps("biography")}
                          id="registration_biography"
                        ></textarea>

                        {formik.touched.biography && formik.errors.biography ? (
                          <span className="registration_input-msg">
                            {formik.errors.biography}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">Date Of Birth</label>
                        <input
                          type="date"
                          required
                          id="date_of_birth"
                          name="date_of_birth"
                          placeholder="Your date_of_birth here"
                          {...formik.getFieldProps("date_of_birth")}
                        />
                        {formik.touched.phone_number &&
                        formik.errors.phone_number ? (
                          <span className="registration_input-msg">
                            {formik.errors.date_of_birth}
                          </span>
                        ) : null}
                      </p>
                    </Row>
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_user">Gender</label>
                        <select
                          name="gender"
                          {...formik.getFieldProps("gender")}
                          required
                        >
                          <option>-- Gender --</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender ? (
                          <span className="registration_input-msg">
                            {formik.errors.gender}
                          </span>
                        ) : null}
                      </p>

                      <p className="form-control">
                        <label htmlFor="registration_user">Country</label>
                        <select
                          name="country_id"
                          {...formik.getFieldProps("country_id")}
                          required
                        >
                          <option>-- Country --</option>
                          {countries.length > 0 &&
                            countries.map((country, i) => {
                              return (
                                <option value={country.id}>
                                  {country.name}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.country_id &&
                        formik.errors.country_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.country_id}
                          </span>
                        ) : null}
                      </p>

                      <p className="form-control">
                        <label htmlFor="registration_user">Industry</label>
                        <select
                          name="industry_id"
                          {...formik.getFieldProps("industry_id")}
                          required
                        >
                          <option>-- Industry --</option>
                          {industries.length > 0 &&
                            industries.map((industry, i) => {
                              return (
                                <option value={industry.id}>
                                  {industry.name}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.industry_id &&
                        formik.errors.industry_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.industry_id}
                          </span>
                        ) : null}
                      </p>
                    </Row>
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_user">Language</label>
                        <select
                          name="language"
                          {...formik.getFieldProps("language")}
                          required
                        >
                          <option>-- Language --</option>
                          {languages.length > 0 &&
                            languages.map((language, i) => {
                              return (
                                <option key={i} value={language.id}>
                                  {language.english}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.language && formik.errors.language ? (
                          <span className="registration_input-msg">
                            {formik.errors.language}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">
                          Educational Level
                        </label>
                        <select
                          name="education_level"
                          {...formik.getFieldProps("education_level")}
                          required
                        >
                          <option>-- Education Level --</option>
                          {EducationLevel.length > 0 &&
                            EducationLevel.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                        </select>
                        {formik.touched.education_level &&
                        formik.errors.education_level ? (
                          <span className="registration_input-msg">
                            {formik.errors.education_level}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">
                          Degree Obtained
                        </label>
                        <select
                          name="degree_obtained"
                          {...formik.getFieldProps("degree_obtained")}
                          required
                        >
                          <option>-- Degree Obtained --</option>
                          {Degrees.length > 0 &&
                            Degrees.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                        </select>
                        {formik.touched.degree_obtained &&
                        formik.errors.degree_obtained ? (
                          <span className="registration_input-msg">
                            {formik.errors.degree_obtained}
                          </span>
                        ) : null}
                      </p>
                    </Row>
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_user">
                          Employment Status
                        </label>
                        <select
                          name="employment_status"
                          {...formik.getFieldProps("employment_status")}
                          required
                        >
                          <option>-- Employment Status --</option>
                          {EmploymentStatus.length > 0 &&
                            EmploymentStatus.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                        </select>
                        {formik.touched.language && formik.errors.language ? (
                          <span className="registration_input-msg">
                            {formik.errors.language}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">
                          Experience Level
                        </label>
                        <select
                          name="experience_level"
                          {...formik.getFieldProps("experience_level")}
                          required
                        >
                          <option>-- Experience Level --</option>
                          {ExperienceLevel.length > 0 &&
                            ExperienceLevel.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                        </select>
                        {formik.touched.experience_level &&
                        formik.errors.experience_level ? (
                          <span className="registration_input-msg">
                            {formik.errors.experience_level}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">
                          Marital Status
                        </label>
                        <select
                          name="marital_status"
                          {...formik.getFieldProps("marital_status")}
                          required
                        >
                          <option>-- Marital Status --</option>
                          {MaritalStatus.length > 0 &&
                            MaritalStatus.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                        </select>
                        {formik.touched.marital_status &&
                        formik.errors.marital_status ? (
                          <span className="registration_input-msg">
                            {formik.errors.marital_status}
                          </span>
                        ) : null}
                      </p>
                    </Row>
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_email">Facebook Url</label>
                        <input
                          type="url"
                          placeholder="https://facebook.com"
                          name="facebook_url"
                          {...formik.getFieldProps("facebook_url")}
                          id="registration_email"
                        />
                        {formik.touched.facebook_url &&
                        formik.errors.facebook_url ? (
                          <span className="registration_input-msg">
                            {formik.errors.facebook_url}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">Twitter Url</label>
                        <input
                          type="url"
                          placeholder="https://twitter.com"
                          name="twitter_url"
                          {...formik.getFieldProps("twitter_url")}
                          id="registration_email"
                        />
                        {formik.touched.twitter_url &&
                        formik.errors.twitter_url ? (
                          <span className="registration_input-msg">
                            {formik.errors.twitter_url}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">Linkedin Url</label>
                        <input
                          type="url"
                          placeholder="https://linkedin.com"
                          name="linkedin_url"
                          {...formik.getFieldProps("linkedin_url")}
                          id="registration_email"
                        />
                        {formik.touched.linkedin_url &&
                        formik.errors.linkedin_url ? (
                          <span className="registration_input-msg">
                            {formik.errors.linkedin_url}
                          </span>
                        ) : null}
                      </p>
                    </Row>

                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Current Employer Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Current employer name"
                          name="current_employer_name"
                          {...formik.getFieldProps("current_employer_name")}
                          id="registration_email"
                        />
                        {formik.touched.current_employer_name &&
                        formik.errors.current_employer_name ? (
                          <span className="registration_input-msg">
                            {formik.errors.current_employer_name}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Current Employer Designation
                        </label>
                        <input
                          type="text"
                          placeholder="Current employer designation"
                          name="current_employer_designation"
                          required
                          {...formik.getFieldProps(
                            "current_employer_designation"
                          )}
                          id="registration_email"
                        />
                        {formik.touched.current_employer_designation &&
                        formik.errors.current_employer_designation ? (
                          <span className="registration_input-msg">
                            {formik.errors.current_employer_designation}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Previous Employer Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Previous employer name"
                          name="previous_employer_name"
                          {...formik.getFieldProps("previous_employer_name")}
                          id="registration_email"
                        />
                        {formik.touched.previous_employer_name &&
                        formik.errors.previous_employer_name ? (
                          <span className="registration_input-msg">
                            {formik.errors.previous_employer_name}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Previous Employer Designation
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Previous employer designation"
                          name="previous_employer_designation"
                          {...formik.getFieldProps(
                            "previous_employer_designation"
                          )}
                          id="registration_email"
                        />
                        {formik.touched.previous_employer_designation &&
                        formik.errors.previous_employer_designation ? (
                          <span className="registration_input-msg">
                            {formik.errors.previous_employer_designation}
                          </span>
                        ) : null}
                      </p>
                    </Row>

                    <button type="submit" disabled={formik.isSubmitting}>
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </form>
                  <div className="have_account-btn text-center">
                    <p>
                      Already have an account? <Link to="/login"> Login Here</Link></p>
                  </div>
                  <div className="have_account-btn text-center">
                    <p>
                      <Link to="/register">
                        Register as a Learner
                      </Link>
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

export default InstructorRegister;
