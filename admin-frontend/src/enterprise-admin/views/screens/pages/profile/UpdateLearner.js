import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
//from "./styles/account.js";
// import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { updateLearnerProfile } from "services/profile";
import { getCountries } from "services/country";
import { getLanguages } from "services/language";
import { getLearnerProfile } from "services/profile";
import { learnerSchema } from "helper/validations";
import {
  Degrees,
  EducationLevel,
  EmploymentStatus,
  ExperienceLevel,
  MaritalStatus,
} from "helper/data";
import "./avatar.css"

import Loader from "components/Loader/Loader";
import { connect } from "react-redux";

const UpdateLearner = ({ auth: { user } }) => {
  // let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [profile, setProfile] = useState({});

  let initialValues = useMemo(() => {
    return Object.entries(profile).length !== 0
      ? {
          username: profile?.username || "",
          first_name: profile?.first_name || "",
          middle_name: profile?.middle_name || "",
          last_name: profile?.last_name || "",
          phone_number: profile?.phone_number || "",
          // image_url: profile?.image_url || "",
          gender: profile?.learner_profile.gender || "",
          date_of_birth: profile?.learner_profile.date_of_birth || "",
          country_id: profile?.learner_profile.country_id || "",
          biography: profile?.learner_profile.biography || "",
          employment_status: profile?.learner_profile.employment_status || "",
          marital_status: profile?.learner_profile.marital_status || "",
          experience_level: profile?.learner_profile.experience_level || "",
          education_level: profile?.learner_profile.education_level || "",
          degree_obtained: profile?.learner_profile.degree_obtained || "",
          language: profile?.learner_profile.language || "",
          facebook_url: profile?.learner_profile.facebook_url || "",
          linkedin_url: profile?.learner_profile.linkedin_url || "",
          twitter_url: profile?.learner_profile.twitter_url || "",
        }
      : {};
  }, [profile]);

  useEffect(() => {
    (async function loadContent() {
      setLoading(true);
      await fetchContent();
      setLoading(false);
    })();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    Promise.all(
      [getCountries(), getLanguages(), getLearnerProfile()].map((err) =>
        err.catch(() => err)
      )
    )
      .then((res) => {
        setCountries([...res[0].data.data]);
        setLanguages([...res[1].data.data]);
        setProfile({ ...res[2].data.data });
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");
      });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    values.email = user.email;
    try {
      await updateLearnerProfile(user.id, values);
      toast.success("Your Profile has been updated.");
    } catch (err) {
      toast.error("Error occured updating Profile");
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
            ) : Object.entries(profile).length !== 0 ? (
              <Fragment>
                <Row>
                  <Col lg="12">
                    <div className="registration-box instructorregister">
                      <div className="registration-title text-center">
                        <h3>Update Profile</h3>
                      </div>

                      <Formik
                        initialValues={initialValues}
                        validationSchema={learnerSchema}
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
                          setFieldValue,
                        }) => (
                          <form
                            id="form_registration"
                            className="form"
                            onSubmit={handleSubmit}
                          >
                            <Row>
                              <p className="">
                                <label htmlFor="registration_fname">
                                  First Name
                                </label>
                                <input className="form-control"
                                  type="text"
                                  required
                                  placeholder="First name"
                                  name="first_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.first_name}
                                />

                                <span className="registration_input-msg">
                                  {errors.first_name &&
                                    touched.first_name &&
                                    errors.first_name}
                                </span>
                              </p>
                              <p className="">
                                <label htmlFor="registration_lname">
                                  Last Name
                                </label>
                                <input className="form-control"
                                  type="text"
                                  required
                                  placeholder="Last name"
                                  name="last_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.last_name}
                                  id="registration_lname"
                                />
                                {touched.last_name && errors.last_name ? (
                                  <span className="registration_input-msg">
                                    {errors.last_name}
                                  </span>
                                ) : null}
                              </p>
                              <p className="">
                                <label htmlFor="registration_email">
                                  Middle Name
                                </label>
                                <input className="form-control"
                                  type="text"
                                  required
                                  placeholder="Middle name"
                                  name="middle_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.middle_name}
                                  id="registration_email"
                                />
                                {touched.middle_name && errors.middle_name ? (
                                  <span className="registration_input-msg">
                                    {errors.middle_name}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <Row>
                              <p className="">
                                <label htmlFor="registration_user">
                                  Phone Number
                                </label>
                                <input className="form-control"
                                  type="number"
                                  id="phone_number"
                                  name="phone_number"
                                  placeholder="08112345687"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.phone_number}
                                />
                                {touched.phone_number && errors.phone_number ? (
                                  <span className="registration_input-msg">
                                    {errors.phone_number}
                                  </span>
                                ) : null}
                              </p>
                              {/* <p className="">
                                <label htmlFor="registration_email">
                                  Imagee Url
                                </label>
                                <input className="form-control"
                                  type="url"
                                  placeholder="https://image.com"
                                  name="image_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.image_url}
                                  id="registration_email"
                                />
                                {touched.image_url && errors.image_url ? (
                                  <span className="registration_input-msg">
                                    {errors.image_url}
                                  </span>
                                ) : null}
                              </p> */}
                              <p className="">
                                <label htmlFor="registration_email">
                                  Biography
                                </label>
                                <textarea
                                  placeholder="Biography here"
                                  name="biography"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.biography}
                                  id="registration_biography"
                                ></textarea>

                                {touched.biography && errors.biography ? (
                                  <span className="registration_input-msg">
                                    {errors.biography}
                                  </span>
                                ) : null}
                              </p>
                              <p className="">
                                <label htmlFor="registration_user">
                                  Date Of Birth
                                </label>
                                <input className="form-control"
                                  type="date"
                                  required
                                  id="date_of_birth"
                                  name="date_of_birth"
                                  placeholder="Your date of birth here"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.date_of_birth}
                                />
                                {touched.phone_number && errors.phone_number ? (
                                  <span className="registration_input-msg">
                                    {errors.date_of_birth}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <Row>
                              <p className="">
                                <label htmlFor="registration_user">
                                  Gender
                                </label>
                                <select
                                  name="gender"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.gender}
                                  required
                                >
                                  <option>-- Gender --</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                                {touched.gender && errors.gender ? (
                                  <span className="registration_input-msg">
                                    {errors.gender}
                                  </span>
                                ) : null}
                              </p>

                              <p className="">
                                <label htmlFor="registration_user">
                                  Country
                                </label>
                                <select
                                  name="country_id"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.country_id}
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
                                {touched.country_id && errors.country_id ? (
                                  <span className="registration_input-msg">
                                    {errors.country_id}
                                  </span>
                                ) : null}
                              </p>

                              <p className="">
                                <label htmlFor="registration_email">
                                  Username
                                </label>
                                <input className="form-control"
                                  type="text"
                                  required
                                  placeholder="Username"
                                  name="username"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.username}
                                  id="registration_email"
                                />
                                {touched.username && errors.username ? (
                                  <span className="registration_input-msg">
                                    {errors.username}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <Row>
                              <p className="">
                                <label htmlFor="registration_user">
                                  Language {profile?.learner_profile.language}
                                </label>
                                <select
                                  name="language"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.language}
                                  required
                                >
                                  {/* <option>-- Language --</option> */}
                                  {languages.length > 0 &&
                                    languages.map((language, i) => {
                                      return (
                                        <option
                                          key={i}
                                          value={language.english}
                                        >
                                          {language.english}
                                        </option>
                                      );
                                    })}
                                </select>
                                {touched.language && errors.language ? (
                                  <span className="registration_input-msg">
                                    {errors.language}
                                  </span>
                                ) : null}
                              </p>
                              <p className="">
                                <label htmlFor="registration_user">
                                  Educational Level
                                </label>
                                <select
                                  name="education_level"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.education_level}
                                  required
                                >
                                  <option>-- Education Level --</option>
                                  {EducationLevel.length > 0 &&
                                    EducationLevel.map((item) => {
                                      return (
                                        <option value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                                {touched.education_level &&
                                errors.education_level ? (
                                  <span className="registration_input-msg">
                                    {errors.education_level}
                                  </span>
                                ) : null}
                              </p>
                              <p className="">
                                <label htmlFor="registration_user">
                                  Degree Obtained
                                </label>
                                <select
                                  name="degree_obtained"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.degree_obtained}
                                  required
                                >
                                  <option>-- Degree Obtained --</option>
                                  {Degrees.length > 0 &&
                                    Degrees.map((item) => {
                                      return (
                                        <option value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                                {touched.degree_obtained &&
                                errors.degree_obtained ? (
                                  <span className="registration_input-msg">
                                    {errors.degree_obtained}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <Row>
                              <p className="">
                                <label htmlFor="registration_user">
                                  Employment Status
                                </label>
                                <select
                                  name="employment_status"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.employment_status}
                                  required
                                >
                                  <option>-- Employment Status --</option>
                                  {EmploymentStatus.length > 0 &&
                                    EmploymentStatus.map((item) => {
                                      return (
                                        <option value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                                {touched.employment_status &&
                                errors.employment_status ? (
                                  <span className="registration_input-msg">
                                    {errors.employment_status}
                                  </span>
                                ) : null}
                              </p>
                              <p className="">
                                <label htmlFor="registration_user">
                                  Experience Level
                                </label>
                                <select
                                  name="experience_level"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.experience_level}
                                  required
                                >
                                  <option>-- Experience Level --</option>
                                  {ExperienceLevel.length > 0 &&
                                    ExperienceLevel.map((item) => {
                                      return (
                                        <option value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                                {touched.experience_level &&
                                errors.experience_level ? (
                                  <span className="registration_input-msg">
                                    {errors.experience_level}
                                  </span>
                                ) : null}
                              </p>
                              <p className="">
                                <label htmlFor="registration_user">
                                  Marital Status
                                </label>
                                <select
                                  name="marital_status"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.marital_status}
                                  required
                                >
                                  <option>-- Marital Status --</option>
                                  {MaritalStatus.length > 0 &&
                                    MaritalStatus.map((item) => {
                                      return (
                                        <option value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                                {touched.marital_status &&
                                errors.marital_status ? (
                                  <span className="registration_input-msg">
                                    {errors.marital_status}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <Row>
                              <p className="">
                                <label htmlFor="registration_email">
                                  Facebook Url
                                </label>
                                <input className="form-control"
                                  type="url"
                                  placeholder="https://facebook.com"
                                  name="facebook_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.facebook_url}
                                  id="registration_email"
                                />
                                {touched.facebook_url && errors.facebook_url ? (
                                  <span className="registration_input-msg">
                                    {errors.facebook_url}
                                  </span>
                                ) : null}
                              </p>
                              <p className="">
                                <label htmlFor="registration_email">
                                  Twitter Url
                                </label>
                                <input className="form-control"
                                  type="url"
                                  placeholder="https://twitter.com"
                                  name="twitter_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.twitter_url}
                                  id="registration_email"
                                />
                                {touched.twitter_url && errors.twitter_url ? (
                                  <span className="registration_input-msg">
                                    {errors.twitter_url}
                                  </span>
                                ) : null}
                              </p>
                              <p className="">
                                <label htmlFor="registration_email">
                                  Linkedin Url
                                </label>
                                <input className="form-control"
                                  type="url"
                                  placeholder="https://linkedin.com"
                                  name="linkedin_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.linkedin_url}
                                  id="registration_email"
                                />
                                {touched.linkedin_url && errors.linkedin_url ? (
                                  <span className="registration_input-msg">
                                    {errors.linkedin_url}
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
                                "Update Profile"
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
        <FooterTwo />
      </div>
    </>
  );
};

UpdateLearner.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UpdateLearner);
