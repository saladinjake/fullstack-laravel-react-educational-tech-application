import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
//from "./styles/account.js";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { createBusiness } from "../../../../../api/services/admin";
import { getCountries } from "../../../../../api/services/country";
import { getIndustries } from "../../../../../api/services/industry";
import { instructorSchema } from "../../../../../core/helpers/validations";


import Loader from "../../../components/Loader/Loader";


const Create = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [industries, setIndustries] = useState([]);
  const formEl = useRef();
    const [submitted, setSubmitted] = useState([]);

  

  useEffect(() => {
    Promise.all(
      [getCountries(), getIndustries()].map((err) => err.catch(() => err))
    )
      .then((res) => {
        setCountries([...res[0].data.data]);
        setIndustries([...res[1].data.data]);
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");
      });
  }, []);





  const handleSubmit =  async (event) => {
          event.preventDefault();
          const formInputs = [...formEl.current.elements];
          let successful = false;
          const newSubmitted = formInputs.reduce(
              (acc, input) => {

                if(input.value ==""){
                  successful = false;
              
                  // toast.error(input.name +" field is required");

                }else{
                  successful = true
                  // setSuccess(input)
                }

                if(input.type=="email"){


                  if (!isEmail(input.value)) {
                    successful = false
                    toast.error(input.name +" field is required");
                  } else {
                    // setSuccess(input);
                  }

                }
                return {
                  ...acc,
                  [input.name]: input.value
                };
              },
              { number: 0 }
            );




            //select boxes to ensure

           const country = document.getElementById("country_id");
           let country_id = country.options[country.selectedIndex].value
          const industry = document.getElementById("industry_id");
          let industry_id = industry.options[industry.selectedIndex].value
   
          const no_of_employees = document.getElementById("no_of_employees");
          let employee =  no_of_employees.options[no_of_employees.selectedIndex].value
          const type_of_institution = document.getElementById("type_of_institution");
          let industry_type =type_of_institution.options[type_of_institution.selectedIndex].value


           setLoading(true);
          newSubmitted.phone_number = newSubmitted.phone_number.toString();
          newSubmitted.country_id = parseInt(country_id);
          newSubmitted.industry_id = parseInt(industry_id );
          newSubmitted.no_of_employees = employee
          try {
            await createBusiness(newSubmitted);
            toast.success("Business Created.");
            setSubmitted(prevSubmitted => [...prevSubmitted, newSubmitted]);
           
          } catch (err) {
            toast.error(err?.response?.data?.message);
           
          }
          setLoading(false);

          console.log(newSubmitted)
            
     }

      function setError(input, message) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector(".registration_input-msg");
        formControl.className = "form-control text-left error";
        errorMsg.innerText = message;
      }

      function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = "form-control success";
      }

      function isEmail(email) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
      }





  useEffect(() => {

       

      // const form = document.getElementById("form_registration");
      // const first_name = document.getElementById("first_name");
      // const last_name = document.getElementById("last_name");
      // const email = document.getElementById("email");
      // const password = document.getElementById("password");

      // const phone_number = document.getElementById("phone_number");
      // const company_phone = document.getElementById("company_phone");

      // const company_description = document.getElementById("company_description");
      // const company_name = document.getElementById("company_name");
      // const country = document.getElementById("country_id");
      // const industry = document.getElementById("industry_id");
   
      // const no_of_employees = document.getElementById("no_of_employees");
      // const type_of_institution = document.getElementById("type_of_institution");

      //  const registration_number = document.getElementById("registration_number");
      // const color_theme = document.getElementById("color_theme");

      //  const facebook_page = document.getElementById("facebook_page");
      // const website = document.getElementById("website");
      //  const linkedin_page = document.getElementById("linkedin_page");


      


       

        
       
     



  })




  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        {/* Registration Area */}
        <section className="registration-area">
          <Container>
            <Row>
              <Col lg="12">
                <div className="registration-box instructorregister">
                  <div className="registration-title text-center">
                    <h3>Registration</h3>
                  </div>



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

                  <form
                    id="form_registration"
                    className="form"
                    ref={formEl}
                    onSubmit={handleSubmit}
                  >
                    <Row>
                      <p className="">
                        <label htmlFor="registration_fname">First Name</label>
                        <input className="form-control"
                          type="text"
                          required
                          placeholder="First name"
                          name="first_name"
                          
                          id="first_name"
                        />
                        
                          <span className="registration_input-msg">
                           
                          </span>
                      
                      </p>
                      <p className="">
                        <label htmlFor="registration_lname">Last Name</label>
                        <input className="form-control"
                          type="text"
                          required
                          placeholder="Last name"
                          name="last_name"
                         
                          id="last_name"
                        />
                        
                          <span className="registration_input-msg">
                           
                          </span>
                       
                      </p>
                      <p className="">
                        <label htmlFor="registration_email">
                          Email Address
                        </label>
                        <input className="form-control"
                          type="email"
                          required
                          placeholder="Email here"
                          name="email"
                         
                          id="registration_email"
                        />
                        
                          <span className="registration_input-msg">
                           
                          </span>
                    
                      </p>
                    </Row>
                    <Row>
                      <p className="">
                        <label htmlFor="registration_user">Password</label>
                        <input className="form-control"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="***"
                         
                        />
                        
                          <span className="registration_input-msg">
                     
                          </span>
                      
                      </p>
                      <p className="">
                        <label htmlFor="registration_user">Phone Number</label>
                        <input className="form-control"
                          type="number"
                          id="phone_number"
                          name="phone_number"
                          placeholder="08112345687"
                         
                        />
                        
                          <span className="registration_input-msg">
                          
                          </span>
                   
                      </p>
                      <p className="">
                        <label htmlFor="registration_user">
                          Company Phone Number
                        </label>
                        <input className="form-control"
                          type="number"
                          id="company_phone"
                          name="company_phone"
                          placeholder="08112345687"
                         
                        />
                        
                          <span className="registration_input-msg">
                          
                          </span>
                      
                      </p>

                    </Row>

                    {/*<p >
                        <label htmlFor="registration_email">
                          Company Description
                        </label>
                        <textarea
                        rows="100%"
                        style={{width:"100%", height:"200px",marginBottom:"20px"}}
                        className="form-control"
                          placeholder="Company description here"
                          name="company_description"
                         
                          id="company_description"
                        ></textarea>

                       
                          <span className="registration_input-msg">
                            
                          </span>
                       
                      </p>*/}


                    <Row>
                      <p className="">
                        <label htmlFor="registration_lname">Company Name</label>
                        <input className="form-control"
                          type="text"
                          required
                          placeholder="company name"
                          name="company_name"
                         
                          id="company_name"
                        />
                       
                          <span className="registration_input-msg">
                           
                          </span>
                      
                      </p>

                      <p className="">
                        <label htmlFor="registration_user">Country</label>
                        <select
                          name="country_id"
                          id="country_id"
                        
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
                       
                          <span className="registration_input-msg">
                          
                          </span>
                       
                      </p>

                      <p className="">
                        <label htmlFor="registration_user">Industry</label>
                        <select
                          name="industry_id"
                          id="industry_id"
                          
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
                        
                          <span className="registration_input-msg">

                          </span>
                      
                      </p>
                    </Row>
                    <Row>
                      <p className="">
                        <label htmlFor="registration_fname">
                          No of Employees
                        </label>
                        

                        <select
                          name="no_of_employees"
                          id="no_of_employees"
                          
                          required
                        >
                          <option>-- No of Employees --</option>
                          
                                <option value={"0 - 10"}>
                                  0 - 10
                                </option>
                                <option value={"10 - 20"}>
                                   10 - 20
                                </option>

                                <option value={"20 - 30"}>
                                  20 - 30
                                </option>

                                <option value={"30 - 40"}>
                                  30 - 40
                                </option>

                                <option value={"40 - 50"}>
                                  40 - 50
                                </option>

                                <option value={"50 - 100"}>
                                  50 - 100
                                </option>

                                <option value={"100 above"}>
                                  100 above
                                </option>
                             
                        </select>
                       
                          <span className="registration_input-msg">
                          
                          </span>


                     
                      </p>
                      <p className="">
                        <label htmlFor="registration_fname">
                          Type of Institutuon
                        </label>


                        <select
                          name="type_of_institution"
                          id="type_of_institution"
                          
                          required
                        >
                          <option>-- Type of Institution --</option>
                          
                                <option value={"Tertiary"}>
                                  Tertiary
                                </option>
                                <option value={"Polytechnic"}>
                                   Polytechnic
                                </option>

                                <option value={"Secondary schools"}>
                                  Secondary schools
                                </option>
                             
                        </select>
                       
                          <span className="registration_input-msg">
                            
                          </span>
                      
                      </p>
                      <p className="">
                        <label htmlFor="registration_fname">
                          Registration Number
                        </label>
                        <input className="form-control"
                          type="text"
                          required
                          placeholder="Registration Number"
                          name="registration_number"
                          
                          id="registration_number"
                        />
                       
                          <span className="registration_input-msg">
                           
                          </span>
                     
                      </p>
                      {/*<p className="">
                        <label htmlFor="registration_fname">
                          Choose a color theme
                        </label>
                        <input className="form-control"
                          type="text"
                          required
                          placeholder="Color Theme"
                          name="color_theme"
                         
                          id="color_theme"
                        />
                        
                          <span className="registration_input-msg">
                            
                          </span>
                       
                      </p>*/}
                    </Row>

                    {/*<Row>
                      <p className="">
                        <label htmlFor="registration_email">Facebook Url</label>
                        <input className="form-control"
                          type="url"
                          placeholder="https://facebook.com"
                          name="facebook_page"
                          
                          id="facebook_page"
                        />
                        
                          <span className="registration_input-msg">
                           
                          </span>
                     
                      </p>
                      <p className="">
                        <label htmlFor="registration_email">Website Url</label>
                        <input className="form-control"
                          type="url"
                          placeholder="https://twitter.com"
                          name="website"
                          
                          id="website"
                        />
                       
                          <span className="registration_input-msg">
                            
                          </span>
                      
                      </p>
                      <p className="">
                        <label htmlFor="registration_email">Linkedin Url</label>
                        <input className="form-control"
                          type="url"
                          placeholder="https://linkedin.com"
                          name="linkedin_url"
                         
                          id="registration_email"
                        />
                        
                          <span className="registration_input-msg">
                           
                          </span>
                      
                      </p>
                    </Row>*/}

                    <button type="submit" >
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </form>
                 
                  
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Create;
