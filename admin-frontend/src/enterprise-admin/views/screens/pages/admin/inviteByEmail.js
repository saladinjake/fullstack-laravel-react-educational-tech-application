import React, { useEffect } from "react";
import "./invite.scss";
import { init, send } from "emailjs-com";
// import { EMAIL_CONFIG } from "../../config"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


init("user_G3PO2EisAWs0dlZT1qu0g");
const JoinUs = () => {



	useEffect(() => {



		const elementClicked = document.querySelector("#click-me");
        const elementYouWantToShow = document.querySelector("#show");

		elementClicked.addEventListener("click", ()=>{
		  // elementYouWantToShow.classList.toggle("show");
		  elementYouWantToShow.style.display="block"
		});

	    const form = document.getElementById("form_contact3");
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
	        // setFormSubmitted(true);
	        toast.success("Your feedback was sent.");
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

    <div>hello world
                                               
                                    
                                      <div className="container-modal" id="show">
                                        <div className="x">
                                          <div className="one"></div>
                                          <div className="two"></div>
                                        </div>
                                        <div className="sign-up">
                                          <h1>Join Questence</h1>
                                          <p className="sub-head-modal">Questence<strong>Invitation Box</strong></p>
                                          <form id="form_contact3">
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

	)
}

export default JoinUs