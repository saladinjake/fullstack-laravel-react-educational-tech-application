

import React, { useEffect, useState, useRef } from "react";
import { Nav, Container, Row, Col, Tab } from "react-bootstrap";
import InstructorNavBar from "components/Navbar/AdminNavbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./learners/styles/product.js";
import { getLearners } from "services/admin.js";
import toast from "react-hot-toast";

import Active from "./learners/active";

import inviteByEmail from "./inviteByEmail"


import { init, send } from "emailjs-com";

import { Link } from "react-router-dom";
import CreateLearnerForm from "./CreateLearner"

import { getDeactivatedLearners, getActiveLearners } from "services/learner"

init("user_G3PO2EisAWs0dlZT1qu0g");



const AdminLearners = () => {
  const [learners, setLearners] = useState([]);
  const [pending,setPendingLearners] = useState([])
    const [activeLearners,setActiveLearners] = useState([])
      const [deactivatedLearners,setDeactivatedLearners] = useState([])
  const [loading, setLoading] = useState(true);
  const [createClicked, setCreateClicked] = useState(false)
   const inputRef = useRef(null);

  useEffect(() => {
    fetchLearners();
  }, []);



  

  let lock = false
  function handleFormInvite(e) {
        e.preventDefault();
      

      lock = true;
      const form = document.getElementById("form_contact3");

      console.log(form)
      const name = document.getElementById("contact_name");
      const email = document.getElementById("contact_email");
      const subject = document.getElementById("contact_subject");
      const message = document.getElementById("contact_message");

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
              window.location.reload()
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










  const fetchLearners = async () => {
    try {
      // let allLearners = await getLearners();
      // console.log(allLearners)
      // setLearners([...allLearners.data.data]);

      let allActive = await getActiveLearners();
      // console.log([...allActive.data.data.data])
      setActiveLearners([...allActive.data.data.data])


      
     let allDeactivated = await getDeactivatedLearners()

     if(allDeactivated.data.data.data){
       setDeactivatedLearners([...allDeactivated.data.data.data])
       console.log([allDeactivated.data.data.data])
     }
      


      // const pending = learners.filter(({ email: id1 }) => !activeLearners.some(({ email: id2 }) => id2 === id1));

      //  console.log(results);


   

    
    




      
    } catch (err) {
      console.log(err)
      toast.error(
        err?.response?.data?.message || `Error occured fetching  learners`
      );
    }
    setLoading(false);
  };


  // console.log(activeLearners)



  //   let activelearners = []; let pendinglearners =[]; let deactivatedlearners= []
  // activelearners = learners.filter( inst => inst?.learner_profile?.status=="1")
  // let pendinglearners = learners.filter(inst => inst?.learner_profile?.status=="0")
  // deactivatedlearners = learners.filter(inst => inst?.learner_profile?.status=="-1")
  


  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper product-page">
        {/* Header 2 */}
        <InstructorNavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Learners" />

        {/* New Poducts Area */}
        <Container>
          <Row>
            <Col lg="12">
              <div >

              {createClicked === false ? (<button  className="btn btn-success" style={{float:"right",marginTop:"30px"}} onClick={() =>{
                     
                      setCreateClicked(true)
                     }}>Invite </button> ) : (

                         <button  className="btn btn-success" style={{float:"right", marginTop:"30px"}} onClick={() =>{
                     
                      setCreateClicked(false)
                     }}>View List</button>
                     ) }
                     <br/> <br/>

              </div>



              {createClicked === true ? ( <div>

                    <div style={{height:"900px"}}>
                                               
                                    
                                      <div className="container-modal" id="show">
                                        <div className="x" style={{display:"none"}}>
                                          <div className="one"></div>
                                          <div className="two"></div>
                                        </div>
                                        <div className="sign-up">
                                          <h1 style={{textAlign:"center"}}>Join Questence</h1>
                                        
                                          <hr/>
                                         
                                          <form onSubmit={handleFormInvite}  id="form_contact3">
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
                                            </div>
                                      </div>

                                </div>

                </div>) : (

              <div className="course-tab-list" style={{height:"2600px"}}>
                <Tab.Container defaultActiveKey="active">
                  <Nav className="flex-column">
                  {/*<Nav.Item >
                      <Nav.Link eventKey="all">All</Nav.Link>
                    </Nav.Item>*/}
                    <Nav.Item >
                      <Nav.Link eventKey="active">Active</Nav.Link>
                    </Nav.Item>

                     
                   

                      <Nav.Item >
                      <Nav.Link eventKey="deactivated">Deactivated</Nav.Link>
                    </Nav.Item>
                    

                   
                  </Nav>
                  <Tab.Content>

                 {/* <Tab.Pane eventKey="all" className="active-tab">
                      <Row>
                        <Active
                          loading={loading}
                         learners={learners}
                        />
                      </Row>
                    </Tab.Pane>*/}

                    <Tab.Pane eventKey="active" className="active-tab">
                      <Row>
                        <Active
                          loading={loading}
                         learners={activeLearners}
                        />
                      </Row>
                    </Tab.Pane>




                    



                    <Tab.Pane eventKey="deactivated" className="active-tab">
                      <Row>
                        <Active
                          loading={loading}
                         learners={deactivatedLearners}
                        />
                      </Row>
                    </Tab.Pane>
                   




                  </Tab.Content>
                </Tab.Container>
              </div>

              ) }




            </Col>
          </Row>
        </Container>

        {/* <Footer /> */}
        <Footer />
      </div>
    </>
  );
};

export default AdminLearners
