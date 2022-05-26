import React, { useEffect,useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//from "components/styles/busRegister.js";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import {
  Degrees,
  EducationLevel,
  EmploymentStatus,
  ExperienceLevel,
  MaritalStatus,
} from "helper/data";
import { registerInstructor } from "services/auth";
import { getCountries } from "services/country";
import { getIndustries } from "services/industry";
import { getLanguages } from "services/language";
import { instructorSchema } from "helper/validations";


import { init, send } from "emailjs-com";

import { Link } from "react-router-dom";


init("user_G3PO2EisAWs0dlZT1qu0g");

function FreeCourse() {
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
    
    country_id: 0,
    category_id: 0,
    other_info: "",
   
    experience_level: "",
    previous_institutions :"",
    niche_courses: "",

    employment_status:"",
    education_level:"",
    gender:"",
    username: "",
    marital_status:"",
    degree_obtained:"",
    language:""
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
    let valueSumitted = {...values}
    valueSumitted.phone_number = values.phone_number.toString();
    valueSumitted.country_id = parseInt(values.country_id);
    valueSumitted.category_id = parseInt(values.category_id);
    valueSumitted.niche_courses = JSON.stringify(values.niche_courses.split(','));
    valueSumitted.previous_institutions = JSON.stringify(values.previous_institutions.split(','));
   
    try {
       //console.log(values)
      await registerInstructor(valueSumitted);
      toast.success("Instructor created successfully.");
      setTimeout(() => {
        window.location.reload()
      }, 2000);
      setSubmitting(false);
    } catch (err) {
      console.log(err)
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
        <>
            {/* Free Course */}
            <section className="free-course-area">
                <Container>
                    <Row>
                        <Col md="6">
                            <div className="course-text">
                            <h4>Create an instructor profile </h4>
                                <p>This is an initiation process in creating an instructor </p>
                                
                            </div>
                            
                        </Col>
                        <Col md="6">
                            <div className="register-form text-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/instructor-about.png)` }}>
                                <div className="form-box card-box" style={{background:"#fff"}}>
                                    {/* <h4 className="title"></h4> */}


                                    <form id="form_contact" style={{display:"none"}}>
                                           <input style={{display:"none"}}
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

                                            <input     
                                            id="contact_email"  
                                            type="text" name="email" 
                                            placeholder="Enter your email address" /><span className="contact_input-msg"></span>
                                            <input type="submit" value="Send Invite" />
                                          </form>





                                    <form id="form3" className="form" onSubmit={formik.handleSubmit}>
                                        <Row>
                                            <Col lg="6">
                                                <p className="form-control">
                                                 <p style={{fontSize:"12px"}}>Instructors first name</p>
                                                
                                                    <input
                                                    style={{border:"2px solid #fafafa"}}
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
                                                  <span className="input-msg3"></span>
                                                </p>  
                                            </Col>

                                            <Col lg="6">
                                                <p className="form-control">
                                                 <p style={{fontSize:"12px"}}>Instructors Last name</p>
                                                
                                                   <input
                                                   style={{border:"2px solid #fafafa"}}
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
                                                </p><br/>
                                            </Col>
                                        </Row>


                                        <Row>
                                            

                                            <Col lg="12">
                                                <p className="form-control">
                                                 <p style={{fontSize:"12px"}}>Instructors username</p>
                                                
                                                   <input
                                                   style={{border:"2px solid #fafafa"}}
                                                    type="text"
                                                    required
                                                    placeholder="Last name"
                                                    name="last_name"
                                                    {...formik.getFieldProps("username")}
                                                    id="registration_lname"
                                                  />
                                                  {formik.touched.username && formik.errors.username ? (
                                                    <span className="registration_input-msg">
                                                      {formik.errors.username}
                                                    </span>
                                                  ) : null}
                                                </p><br/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                               <p >
                                                     <p style={{fontSize:"12px"}}>Industry or field of knowledge</p>
                                                
                                                    <select
                                                    style={{border:"2px solid #fafafa"}}
                                                    className="form-control"
                                                      name="category_id"
                                                      {...formik.getFieldProps("category_id")}
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
                                                    {formik.touched.category_id &&
                                                    formik.errors.category_id ? (
                                                      <span className="registration_input-msg">
                                                        {formik.errors.category_id}
                                                      </span>
                                                    ) : null}
                                                  </p><br/>  
                                            </Col>
                                        </Row>

                                        <Row>
                                          <Col lg="6">
                                        <p className="form-control">
                        <label htmlFor="registration_user">Date Of Birth</label>
                        <input
                        style={{border:"1px solid #000"}}
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
                      </p><br/>

                      </Col>
                        <Col lg="6">
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
                      </p><br/>
                      </Col>



                                        </Row>


                       <Row>
                          <Col lg="6">

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
                                <option key={i} value={language.english}>
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
                      </p><br/>
                     

                          </Col>

                          <Col lg="6">


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
                      </p><br/>
                    
                      

                          </Col>
                       </Row>                 
                                        <Row>


                                        <Row>

                                            <Col lg="12">

                                            <p >
                        <label htmlFor="registration_user">
                          Employment Status
                        </label>
                        <select
                          className="form-control"
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
                      </p><br/>
                      
                      
                      
                    


                                            </Col>





                                        </Row>





                                            <Col lg="12">
                                                <p>
                                                 <p style={{fontSize:"12px"}}>Instructors experience level</p>
                                                
                        
                                                  <select
                                                  style={{border:"2px solid #fafafa"}}
                                                  className="form-control"
                                                    name="experience_level"
                                                    {...formik.getFieldProps("experience_level")}
                                                    required
                                                  >
                                                    <option>-- Experience Level --</option>
                                                    {ExperienceLevel.length > 0 &&
                                                      ExperienceLevel.map((item,i) => {
                                                        return <option value={i}>{item}</option>;
                                                      })}
                                                  </select>
                                                  {formik.touched.experience_level &&
                                                  formik.errors.experience_level ? (
                                                    <span className="registration_input-msg">
                                                      {formik.errors.experience_level}
                                                    </span>
                                                  ) : null}
                                                </p><br/> 
                                            </Col>
                                        </Row>


                                          <Row>

                                           <Col lg="12">

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
                      </p><br/>

                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <p className="form-control">
                                                 <p style={{fontSize:"12px"}}>Instructors Email</p>
                                                
                                                   
                                                    <input
                                                    style={{border:"2px solid #fafafa"}}
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
                                                  </p><br/>
                    
                      
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                 <p style={{fontSize:"12px"}}>Instrcutors phone number</p>
                                                
                                                     <input
                                                     style={{border:"2px solid #fafafa"}}
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
                                                </p><br/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <p >
                                                 <p style={{fontSize:"12px"}}>Country location</p>
                                                
                        
                                                    <select
                                                    style={{border:"2px solid #fafafa"}}
                                                    className="form-control"
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
                                                  </p><br/>
                                            </Col>
                                            <Col lg="6">
                                                <p className="form-control">
                                                  <p style={{fontSize:"12px"}}>Institution work place both past and present seperated by comma</p>
                                                      <input
                                                      style={{border:"2px solid #fafafa"}}
                                                        type="text"
                                                        required
                                                        placeholder="Institution"
                                                        name="previous_institutions"
                                                        {...formik.getFieldProps("previous_institutions")}
                                                        id="registration_email"
                                                      />
                                                      {formik.touched.previous_institutions &&
                                                      formik.errors.previous_institutions ? (
                                                        <span className="registration_input-msg">
                                                          {formik.errors.previous_institutions}
                                                        </span>
                                                      ) : null}
                                                    </p><br/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                               <p className="form-control">
                                               <p style={{fontSize:"12px"}}>Courses you can teach seperated by comma</p>
                                                  
                                                  <input
                                                  style={{border:"2px solid #fafafa"}}
                                                    type="text"
                                                    required
                                                    placeholder="Courses "
                                                    name="niche_courses"
                                                    {...formik.getFieldProps("niche_courses")}
                                                    id="registration_email"
                                                  />
                                                  {formik.touched.niche_courses &&
                                                  formik.errors.niche_courses ? (
                                                    <span className="registration_input-msg">
                                                      {formik.errors.niche_courses}
                                                    </span>
                                                  ) : null}
                                                </p><br/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <p className="form-control">
                                                 <p style={{fontSize:"12px"}}>Information about the instructor</p>
                                                
                                                  
                                                  <input type="textarea"
                                                  style={{border:"2px solid #fafafa"}}
                                                    placeholder="Other information about your self"
                                                    name="other_info"
                                                    {...formik.getFieldProps("other_info")}
                                                    id="registration_other_info"
                                                  />

                                                  {formik.touched.other_info && formik.errors.other_info ? (
                                                    <span className="registration_input-msg">
                                                      {formik.errors.other_info}
                                                    </span>
                                                  ) : null}
                                                </p><br/> 
                                            </Col>
                                        </Row>
                                            <button type="submit" disabled={formik.isSubmitting}>
                                              {loading ? (
                                                <div className="spinner-border" role="status">
                                                  <span className="sr-only">Loading...</span>
                                                </div>
                                              ) : (
                                                "Create"
                                              )}
                                            </button>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default FreeCourse
