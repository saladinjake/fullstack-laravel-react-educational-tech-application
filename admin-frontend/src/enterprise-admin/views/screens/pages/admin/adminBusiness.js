import React, { useEffect, useState, Fragment } from "react";
import { Nav, Container, Row, Col, Tab } from "react-bootstrap";
import InstructorNavBar from "components/Navbar/AdminNavbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./learners/styles/product.js";

import Active from "./business/active";
import Pending from "./business/pending";
import Deactivated from "./business/deactivated";
import Create from "./business/create";
import toast from "react-hot-toast";
import Loader from "components/Loader/Loader";


import { init, send } from "emailjs-com";

import { Link } from "react-router-dom";


init("user_G3PO2EisAWs0dlZT1qu0g");


const AdminBusiness = () => {

   const [loading, setLoading] = useState(true);
  const [acloading, setAcLoading] = useState(false);
    const [createClicked, setCreateClicked] = useState(false)


    useEffect(() => {   
      let lock = false;
      const form = document.getElementById("form_contact3");

      console.log(form)
      const name = document.getElementById("contact_name");
      const email = document.getElementById("contact_email");
      const subject = document.getElementById("contact_subject");
      const message = document.getElementById("contact_message");

      form.addEventListener("submit", formSubmit);

      function formSubmit(e) {
        e.preventDefault();

        // const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const subjectValue = subject.value.trim();
        const messageValue = message.value.trim();

        // if (nameValue === "") {
        //   setError(name, "Name can't be blank");
        // } else {
        //   setSuccess(name);
        // }

        if (emailValue === "") {
          setError(email, "Email can't be blank");
        } else if (!isEmail(emailValue)) {
          setError(email, "Not a valid email");
        } else {
          setSuccess(email);
        }

        if (subjectValue === "") {
          setError(subject, "Subject can't be blank");
        } else {
          setSuccess(subject);
        }

        if (messageValue === "") {
          setError(message, "Message can't be blank");
        } else {
          setSuccess(message);
        }

        if (emailValue ) {
          lock = true
          // setFormSubmitted(true);
          if(lock===true){
            lock = false

             toast.success("Your Invite was sent.");
          send("service_qkww1qn", "template_8a8txks", {
            senderEmail: emailValue,
            title: subjectValue,
            feedback: messageValue,
            reply_to: "admin@questence.org",
            from_name: "admin@questence.org",
          })
            .then((res) => {
              if (res.status === 200) {
                // setFormSubmitSuccessful(true);
              }
            })
            // Handle errors here however you like
            .catch((err) =>
              console.error("Failed to send feedback. Error: ", err)
            );

          }
          
        }
      }

      function setError(input, message) {
        const formControl = input.parentElement;
        const errorMsg = formControl.querySelector(".contact_input-msg");
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
  });





  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper product-page">
        {/* Header 2 */}
        <InstructorNavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Business" />

        {/* New Poducts Area */}
        <Container>
          <Row>
            <Col lg="12">

             <div >

              {createClicked === false ? (<button  className="btn btn-primary" style={{float:"right",marginTop:"30px"}} onClick={() =>{
                     
                      setCreateClicked(true)
                     }}>Create Business Profile</button> ) : (

                         <button  className="btn btn-primary" style={{float:"right", marginTop:"30px"}} onClick={() =>{
                     
                      setCreateClicked(false)
                     }}>View List</button>
                     ) }
                     <br/> <br/>

              </div>


              {createClicked === true ? ( <div><br/><br/><Create /></div>) : (

              <div className="course-tab-list" style={{height:"3000px"}}>
                <Tab.Container defaultActiveKey="active">
                  <Nav className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="active">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="pending">Pending</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="deactivated">Deactivated</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="invite">Invite</Nav.Link>
                    </Nav.Item>
                   
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="active" className="active-tab">
                      <Row>
                        <Active />
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="pending" className="active-tab">
                      <Row>
                        <Pending />
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="deactivated" className="active-tab">
                      <Row>
                        <Deactivated />
                      </Row>
                    </Tab.Pane>


                    <Tab.Pane eventKey="invite" className="active-tab">
                      <Row>

                        <div>
                                               
                                    
                                      <div className="container-modal" id="show">
                                        <div className="x">
                                          <div className="one"></div>
                                          <div className="two"></div>
                                        </div>
                                        <div className="sign-up">
                                          <h1>Join Questence</h1>
                                          <p className="sub-head-modal">Questence<strong>Invitation Box</strong></p>
                                          <form  id="form_contact3">
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
                                          <div className="nothanks">
                                             <a href="#">No Thanks</a>
                                          </div>
                                          <p className="nospam">Offer is only valid for a limited time.</p>
                                        </div>
                                      </div>

                                </div>
                             </Row>
                    </Tab.Pane>
                    
                  </Tab.Content>
                </Tab.Container>
              </div>

              )}
            </Col>
          </Row>
        </Container>

        {/* <Footer /> */}
        <Footer />
      </div>
    </>
  );
};

export default AdminBusiness;
