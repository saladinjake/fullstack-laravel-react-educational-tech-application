
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";


// //from "./styles/account.js";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { createCourse } from "../../../../../../../api/services/course";

import { getLanguages } from  "../../../../../../../api/services/language";
import { getCategories } from "../../../../../../../api/services/category";
import { getCertificates } from "../../../../../../../api/services/category";
import { getBusiness } from "../../../../../../../api/services/business";
import { courseSchema } from "../../../../../../../core/helpers/validations";
import { LearnigStyles } from "../../../../../../../core/helpers/data";
import Dropzone from 'react-dropzone';
// import Loader from "components/Loader/Loader";

import { getInstructors } from "../../../../../../../api/services/admin"

import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import HTMLForm  from "./HTMLEditor"


import $ from "jquery"
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const mapOutInitialIdsAndResetList = (collaborators) => {
  if (collaborators.length > 0) {
    let check = collaborators[0];

    if (check.hasOwnProperty("id")) {
      let list = collaborators;
      return list.map((item) => {
        return item.id;
      });
    }
  }

  return [];
};

const ProfileScreen = () => {
  let history = useHistory();

  let all_instructorIds = mapOutInitialIdsAndResetList([]);
  const [collaboratorssList, setCollboratorsList] = useState([]);
  const [leadCollaborators, setLeadCollaborators] = useState([]);
  console.log(all_instructorIds);

  // need this to manage change effect on input
  // and this for a generic event handler for the form
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  function handleChangeTextEditor(nameKey = "", valueData = "") {
    if (nameKey.length > 0 && valueData.length > 0) {
      setState({
        ...state,
        [nameKey]: valueData,
      });
    }
  }

  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [previewSrc2, setPreviewSrc2] = useState("");
  const [file, setFile] = useState(null); // state for storing actual image
  const [file2, setFile2] = useState(null);

  const [topics, setTopics] = useState("");
  const [outcomes, setOutcomes] = useState("");

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [business, setBusiness] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [readySubmit, setReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const [isPreviewAvailable2, setIsPreviewAvailable2] = useState(false);
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const dropRef2 = useRef();
  const [htmlDescription, setHtmlDescription] = useState("");
  const [htmlOverView, setHtmlCourseOverView] = useState("");
  const [htmlOutcome, setHtmlOutCome] = useState("");
  const [htmlTopics, setHtmlTopics] = useState("");
  const [htmlPrerequisites, setHtmlPrerequisites] = useState("");
  //parent child communication
  const [allInstructors, setAllInstructors] = useState([])
  const [state, setState] = React.useState({
    course_name: "",
    course_code: "",
    price: "",
    instructor_id: "",
    instructors: "",
    learning_style: "",
    course_thumbnail: "",
    duration: "",
    language_id: "",
    category_id: "",
    certificate_id: "",
    business_id: "",
    introduction_video: "",
    start_date: "",
    end_date: "",
    enrollment_end: "",
    enrollment_start: "",
    license: "",
    entrance_exam: "",
    overall_grade_range: "",
    grace_period_on_deadline: "24hours",
    course_description: "",
    outcomes: "",
    course_overview: "",
    topics: "",
    prerequisite_course: "",
    course_cover_image: "",
  });


  const getInstructorNameById = (id) => {
    // console.log(id)
    let list = allInstructors;
    // console.log(list)
    let collaborators_info = list.filter((instructor) => instructor.id == id);
    if ( collaborators_info.length > 0) {
      let detail = collaborators_info[0].first_name + "" + collaborators_info[0].last_name
      detail = {
        fullname : detail,
        id: collaborators_info[0].id 
      }
      return  detail;
    }
    toast.error(`Instructors detail not found`) 
  };

  const getInstructorByEmailInput = (email) => {
    let list = allInstructors;
    let collaborators_info = list.filter((instructor) => instructor.email == email);
    if (collaborators_info.length > 0) {
      let detail = collaborators_info[0];
      return  detail 
    }
    toast.error(`Instructors detail not found`) 
    return {}
  };



  const [leadInstructor, setLeadInstructor] = useState(1);

  function handleSubmitLeadInstructor(event) {
    event.preventDefault()
    let instructorExist = getInstructorByEmailInput(leadInstructor); 
    console.log(instructorExist)                  
    if("email" in instructorExist){
        setLeadInstructor(instructorExist?.email)
        setState({
          ...state,
          "instructor_id": instructorExist?.id,
        });

    }else{
      toast.error(`The  instructor with the email ${leadInstructor} was not found`)
    }
    
     console.log(state);
  }
  function removeLeadInstructor(i) {
    setLeadInstructor('')
     setState({
      ...state,
      "instructor_id": '',
    });
     toast.error("A lead instructor is required");
  }


  const [instructorList,setSelectedInstructors] = React.useState([
    
  ])
  const [item,setItem] = React.useState(); //newly appended collaborator
    
  function handleSubmitCollaborators(event) {
    event.preventDefault()
    console.log(item)
    let instructorExist = getInstructorByEmailInput(item); 
    console.log(instructorExist)                  
    if("email" in instructorExist){
      setSelectedInstructors([...instructorList,instructorExist])
      setItem('')
      setState({
        ...state,
        "instructors": [...state.instructors, instructorExist?.id],
      });
   }
  }
  
  function removeItem(i) {
    setSelectedInstructors([...instructorList.slice(0,i),...instructorList.slice(i+1)])
    setState({
      ...state,
      "instructors": instructorList,
    });
  }

  
 


  function makeAddedList(Instructors) {
    const elements = Instructors.map((listitem, index) => (
      <div>
        <aside>
          <header>
            <a href={process.env.PUBLIC_URL + "/instructors/" + listitem.id}>
              {listitem?.image_url?.length > 0 ? (
                <img src={listitem?.image_url} alt="noimage" />
              ) : (
                <img
                  alt="nogivenimage"
                  src="http://gravatar.com/avatar/eb2d48c7f2cf027bb4cb20483e27c9c9?size=200px"
                />
              )}
            </a>

            <h1>
              {listitem.first_name} {listitem.last_name}
            </h1>

            <h2>{listitem?.brief_introduction}</h2>
          </header>
        </aside>

        <li
          key={listitem.id}
          data-item={listitem.id}
          style={{
            width: listitem.itemWidth,
          }}
        >
          {listitem.content}
        </li>
      </div>
    ));
    return elements;
  }

  function handleChangeTextEditor(nameKey = "", valueData = "") {
    if (nameKey.length > 0 && valueData.length > 0) {
      setState({
        ...state,
        [nameKey]: valueData,
      });
    }
  }

  const handleToggleAccordion = (event) => {
    //Bail if our clicked element doesn't have the class
    if (!event.target.classList.contains("accordion-toggle")) return;

    // Get the target content
    var content = document.querySelector(event.target.hash);
    if (!content) return;

    // Prevent default link behavior
    event.preventDefault();

    // If the content is already expanded, collapse it and quit
    if (content.classList.contains("active")) {
      content.classList.remove("active");
      return;
    }

    // Get all open accordion content, loop through it, and close it
    var accordions = document.querySelectorAll(".accordion-content.active");
    for (var i = 0; i < accordions.length; i++) {
      accordions[i].classList.remove("active");
    }

    // Toggle our content
    content.classList.toggle("active");
  };

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
    uploadImageAndsetImageField(uploadedFile, "course_thumbnail");

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const onDrop2 = (files) => {
    const [uploadedFile2] = files;
    setFile2(uploadedFile2);
    uploadImageAndsetImageField(uploadedFile2, "course_cover_image");

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc2(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile2);
    setIsPreviewAvailable2(uploadedFile2.name.match(/\.(jpeg|jpg|png)$/));
    dropRef2.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder2 = (dragState) => {
    if (dragState === "over") {
      dropRef2.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef2.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const uploadImageAndsetImageField = (imageFile, fieldname) => {
    const file = imageFile;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hpvklb3p");
    // eslint-disable-next-line no-undef
    fetch("https://api.cloudinary.com/v1_1/questence/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.secure_url !== "undefined") {
          let imageUrl = data.secure_url;
          console.log(imageUrl);
          toast.success("upload successful");

          if (fieldname === "course_cover_image") {
           
            setFile(imageUrl);
             setFile2(imageUrl);
            setState({
              ...state,
              course_cover_image: imageUrl,
                 course_thumbnail: imageUrl,
            });
          } else {
            setFile(imageUrl);
             setFile2(imageUrl);
            setState({
              ...state,
             
              course_cover_image: imageUrl,
                 course_thumbnail: imageUrl,
            });
          }

          // handleUploads();
        } else {
          toast.error("could not upload image");
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    (async function loadContent() {
      await fetchContent();
    })();
  }, []);

  const fetchContent = async () => {
    Promise.all(
      [
        getCategories(),
        getCertificates(),
        getLanguages(),
        getBusiness(),
        getInstructors(),
      ].map((err) => err.catch(() => err))
    )
      .then((res) => {
        setCategories([...res[0].data.data]);
        setCertificates([...res[1].data.data]);
        setLanguages([...res[2].data.data]);
        setBusiness([...res[3].data.data.profiles.data]);
        setAllInstructors([...res[4].data.data]);
       
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Occured fetching data");

        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
     console.log(state)
       
    //leadCollaborators.push(leadInstructor)
    let combineusr = leadCollaborators;

    // if (!(combineusr.length > 0)) {
    //   toast.error(`You did not select an instructor or collaborators`);
    // }
    // state.instructor_id = leadInstructor;
    state.instructors = JSON.stringify(state.instructors);
    let formData = new FormData();
    let error = false;
    Object.keys(state).forEach((item) => {
      if (!state[item] || state[item] === null || state[item] === "") {
        error = true;
        toast.error(`${item} is required`);
      } else {
        // toast.success(`${item} is added here`)
      }
    });
    if (error) {
      return false;
    } else {
      setReady(true);
    }

    try {
      let formData = new FormData();
      // let combineusr = leadCollaborators;
      // if (!(combineusr.length > 0)) {
      //   toast.error(`You did not select an instructor or collaborators`);
      // }
      // if (e.target.getAttribute("id") === "submitter") {
        await createCourse(state);
        toast.success("Course sucessfully created.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      // }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
      toast.error(JSON.stringify(err?.response?.data?.errors));
    }
    setLoading(false);
  };

  function onChangeImage(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    this.createImage(files[0]);
  }
  function createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        [e.target.name]: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  const formik = useFormik({
    initialValues: state,
    // validationSchema: courseSchema,
    // onSubmit: handleSubmit,
  });


  // const [htmlDescription, setHtmlDescription] = useState("");
  function handleHtmlDescriptionChange(newValue) {
    setHtmlDescription(newValue);
  }

  // const [htmlOverView, setHtmlCourseOverView] = useState("");
  function handleHtmlCourseOverViewChange(newValue) {
    setHtmlCourseOverView(newValue);
  }

  // const [htmlOutcome, setHtmlOutCome] = useState("");
  function handleHtmlOutComeChange(newValue) {
    setHtmlOutCome(newValue);
  }

  // const [htmlTopics, setHtmlTopics] = useState("");
  function handleHtmlTopicsChange(newValue) {
    setHtmlTopics(newValue);
  }

  // const [htmlPrerequisites, setHtmlPrerequisites] = useState("");
  function handleHtmlPrerequisitesChange(newValue) {
    setHtmlPrerequisites(newValue);
  }



  return (
    <>
	    <div id="tab-1" class="tab-content current">
	             <section class="container-course">
					    <h1>Basic Information</h1>

					    <form action="" class="form-course">
					          <input required type="text" placeholder="Course Code" name="course_code" value={state.course_code}
                        onChange={handleChange} s/>
					        <input required type="text" placeholder="Course Name" name="course_name"  value={state.course_name}
                        onChange={handleChange} />


					        <input required class="fullwidth" type="text" name="price"
					        placeholder="Course Price" 
					        value={state.price}
                        onChange={handleChange}

					         />


					        <input required class="fullwidth" type="number" 
					        placeholder="Course Duration in hours"
					         name="duration"
          
                        value={state.duration}
                        onChange={handleChange}

					         />


					        <select name="learning_style"
                        required
                        value={state.learning_style}
                        onChange={handleChange} >
					            <option value="Something">--SELECT A LEARNING-STYLE--</option>
					            {LearnigStyles.length > 0 &&
                          LearnigStyles.map((item) => {
                            return <option value={item}>{item}</option>;
                          })}
					        </select>

					        <select     name="category_id"
                        required
                        value={state.category_id}
                        onChange={handleChange}> 
					             <option>-- category --</option>
                        {categories.length > 0 &&
                          categories.map((category, i) => {
                            return (
                              <option key={i} value={category.id}>
                                {category.name}
                              </option>
                            );
                          })}
					        </select>


					        <select name="" name="certificate_id"
                        required
                        value={state.certificate_id}
                        onChange={handleChange}>
					            <option>-- Certificate --</option>
                        {certificates.length > 0 &&
                          certificates.map((certificate, i) => {
                            return (
                              <option key={i} value={certificate.id}>
                                {certificate.name}
                              </option>
                            );
                          })}
					        </select>

                            <select    name="language_id"
                        required
                        value={state.language_id}
                        onChange={handleChange}>
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

					         <select
                       className="fullwidth"
                        name="overall_grade_range"
                        value={state.overall_grade_range}
                        onChange={handleChange}
                        required
                      >
                        <option>-- Grade Rage --</option>

                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={70}>70</option>
                        <option value={100}>100</option>
                      </select>

					          
					       {/*<textarea class="fullwidth" placeholder="Course Description" rows="10"></textarea>*/} 
					       
                              <HTMLForm
                        title="course_description"
                        placeholder={"course_description"}
                        value={state.course_description || ""}
                        action={handleHtmlDescriptionChange}
                        stateAction={handleChangeTextEditor}
                        name={"course_description"}
                      />
					    </form>
					</section>
	     </div>
		<div id="tab-2" class="tab-content">
		           <section class="container">
					    <h1>Course Analytics</h1>

					    <form action="" class="form-course">
					          <input required type="url" placeholder="Course Introductory Video URL eg: https://youtube.com/..."   name="introduction_video"
                        value={state.introduction_video}
                        onChange={handleChange}
                        id="registration_email" 
                        />
					        <input required type="date" placeholder="Course Start Date"
                                 id="start_date"
                        name="start_date"
                        placeholder="Start date"
                        value={state.start_date}
                        onChange={handleChange}
					         />
					        <input  required class="date" type="date" placeholder="Course End Date"
					       


                        id="end_date"
                        name="end_date"
                        placeholder="end date"
                        value={state.end_date}
                        onChange={handleChange}

					        />
					        <input required class="date" type="date" placeholder="Enrollment Start Date" 
                               id="enrollment_start"
                        name="enrollment_start"
                        placeholder="Enrollment Start"
                        value={state.enrollment_start}
                        onChange={handleChange}
					        />
					         <input required class="date" type="date" placeholder="Enrollment End Date"
                                    id="enrollment_end"
                        name="enrollment_end"
                        placeholder="Enrollment end"
                        value={state.enrollment_end}
                        onChange={handleChange}

					          />
					        <select name=""    name="business_id"
                        value={state.business_id}
                        onChange={handleChange}
                        required>
					            <option>Business Organization/Instituition</option>
                        {business.length > 0 &&
                          business.map((item) => {
                            return (
                              <option value={item.id}>
                                {item.company_name}
                              </option>
                            );
                          })}
					        </select>
					        <select name="" id="" name="entrance_exam"
                        value={state.entrance_exam}
                        onChange={handleChange}
                        required
                      >
                        <option>Entrance Exam  Required</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
					        
					       <input required class="date" type="text" 
					       placeholder="Course prerequisite eg: a link refrence to a much needed course" 
					       
					       name="prerequisite_course"
                            value={state.prerequisite_course || ""}
                        onChange={handleChange}


					       />



					       {/*<textarea class="fullwidth" placeholder="Course Overview" rows="10"></textarea>*/}
					       <HTMLForm
                      title="course_overview"
                      placeholder={"course_overview"}
                      value={state.course_overview || ""}
                      action={handleHtmlCourseOverViewChange}
                      name="course_overview"
                      stateAction={handleChangeTextEditor}
                    />
					     

					    </form>
					</section>
		</div>
		<div id="tab-3" class="tab-content">
		            <section class="container">
					    <h1>Course Details</h1>

					    <form action="" class="form-course">
					         <input required type="text" placeholder="Licence" name="license"
                        value={state.license}
                        onChange={handleChange}
                        id="registration_fname" />





                  <select name="" id=""   name="grace_period_on_deadline"
                        value={state.grace_period_on_deadline}
                        onChange={handleChange}
                        required
                      >
                        <option value="24hours">24 hours</option>
                        <option value="2days">2 days</option>
                       
                      </select>















					       
					        
					        <HTMLForm
                      title="outcomes"
                      placeholder={"outcomes"}
                      value={state.outcomes || ""}
                      action={handleHtmlOutComeChange}
                      name="outcomes"
                      stateAction={handleChangeTextEditor}
                    />

                    <HTMLForm
                      title="topics"
                      placeholder={"topics"}
                      value={state.topics || ""}
                      action={handleHtmlTopicsChange}
                      name="topics"
                      stateAction={handleChangeTextEditor}
                    />


					    </form>
					</section>
		</div>

		<div id="tab-4" class="tab-content">
		           

					 <section class="container">
					    <h1>Media Uploads</h1>

					    <form action="" class="form-course">
					       <div
                      className="upload-section col-lg-12"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <Dropzone
                        onDrop={onDrop}
                        onDragEnter={() => updateBorder("over")}
                        onDragLeave={() => updateBorder("leave")}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps({ className: "drop-zone" })}
                            ref={dropRef}
                          >
                            <input {...getInputProps()} />
                            <p
                              className="card-box"
                              style={{ width: "96%", marginLeft: "20px" }}
                            >
                              Drag and drop a file OR click here to select a
                              file to upload course thumbnail image
                            </p>
                            {file && (
                              <div>
                                <strong>Selected file:</strong> {file.name}
                              </div>
                            )}
                          </div>
                        )}
                      </Dropzone>
                      {previewSrc ? (
                        isPreviewAvailable ? (
                          <div className="image-preview">
                            <img
                              className="preview-image"
                              src={previewSrc}
                              alt="Preview"
                            />
                          </div>
                        ) : (
                          <div className="image-preview">
                            <img
                              className="preview-image"
                              src={state.course_thumbnail}
                              alt="Preview"
                            />
                          </div>
                        )
                      ) : (
                        <div className="preview-message">
                          <p
                            className="card-box"
                            style={{ width: "96%", marginLeft: "20px" }}
                          >
                            Image preview will be shown here after selection
                          </p>
                        </div>
                      )}
                    </div>
					      








					 {/*         <div
                      className="upload-section col-lg-12"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <Dropzone
                        onDrop={onDrop2}
                        onDragEnter={() => updateBorder2("over")}
                        onDragLeave={() => updateBorder2("leave")}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps({ className: "drop-zone" })}
                            ref={dropRef2}
                          >
                            <input {...getInputProps()} />
                            <p
                              className="card-box"
                              style={{ width: "96%", marginLeft: "20px" }}
                            >
                              Drag and drop a file OR click here to select a
                              file to upload course image cover
                            </p>
                            {file && (
                              <div>
                                <strong>Selected file:</strong> {file.name}
                              </div>
                            )}
                          </div>
                        )}
                      </Dropzone>
                      {previewSrc2 ? (
                        isPreviewAvailable2 ? (
                          <div className="image-preview">
                            <img
                              className="preview-image"
                              src={previewSrc2}
                              alt="Preview"
                            />
                          </div>
                        ) : (
                          <div className="image-preview">
                            <img
                              className="preview-image"
                              src={state.course_cover_image}
                              alt="Preview"
                            />
                          </div>
                        )
                      ) : (
                        <div className="preview-message">
                          <p
                            className="card-box"
                            style={{ width: "96%", marginLeft: "20px" }}
                          >
                            Image preview will be shown here after selection
                          </p>
                        </div>
                      )}
                    </div>*/}
					      
					       

					    </form>
					</section>
		</div>

		<div id="tab-5" class="tab-content">
		          <section class="container">
					    <h1>Lead Instructors</h1>

					     <div className="container">
                  <h1>Team leader</h1>
                  <p className="lead">You can only select one team leader</p>
                  
                  <form className="form-course">
                    <div className="form-group">
                      <label for="text">New item</label>
                      <input 
                        className="form-control fullwidth" 
                        value={leadInstructor} 
                        onChange={e=>setLeadInstructor(e.target.value)} 
                        onBlur={handleSubmitLeadInstructor }
                      />
                    </div>
                  </form>
                  
                  <ul className="list-group shadow">
                  {leadInstructor.length >0&& <p className="text-center text-muted">{leadInstructor} <button className="float-right btn btn-danger btn-sm" onClick={()=>removeLeadInstructor()}>Remove</button></p>}
                
                  </ul>
                  {leadInstructor.length===0&&<p className="text-center text-muted">List is empty :(</p>}
                
                  </div>

             <br/><br/><br/>


               <div className="container">
                  <h1>Add Collaborators</h1>
                  <p className="lead">You can add or remove any instructors from this course</p>
                  
                  <form className="form-course" onSubmit={handleSubmitCollaborators}>
                    <div className="form-group">
                      <label for="text">click add instructor to add an instructor</label>
                      <input 
                        className="form-control fullwidth" 
                        value={item} 
                        onChange={e=>setItem(e.target.value)} 
                      />
                      <br/><br/>


         <button
                    id="submitter"
                    type="submit"
                    onClick={handleSubmitCollaborators}
                    className="btn btn-solid-teal btn-sm btn-rounded pull-right"
                
                  >
                    {loading ? (
                      <div>
                        <span>Please wait..</span>
                      </div>
                    ) : (
                      "Add Instructor"
                    )}
                  </button>












                    </div>
                  </form>
                  
                  <ul className="list-group shadow">
                    {instructorList.map((e,i)=>(
                      <li key={e?.id} className="list-group-item">{e?.email} <button className="float-right btn btn-danger btn-sm" onClick={()=>removeItem(e?.id)}>Remove</button></li>
                    ))}
                  </ul>
                  
                  {instructorList.length===0&&<p className="text-center text-muted">List is empty :(</p>}
                </div>

                 


           <br/><br/>      
    <div className="container">

         <button
                    id="submitter"
                    type="submit"
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="btn btn-solid-teal btn-sm btn-rounded pull-right"
                
                  >
                    {loading ? (
                      <div>
                        <span>Create Course</span>
                      </div>
                    ) : (
                      "Create Course"
                    )}
                  </button>

    </div>
    <br/>
                     
					</section>  

		</div>


    </>
  );
};

export default ProfileScreen;
