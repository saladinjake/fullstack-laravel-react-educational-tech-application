import React, { useState, useEffect, useRef, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import InstructorNavBar from "components/Navbar/InstructorNavbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "components/Footer";
// //from "./styles/account.js";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { createCourse } from "services/course";
import { getLanguages } from "services/language";
import { getCategories } from "services/category";
import { getCertificates } from "services/category";
import { getBusiness } from "services/business";
import { courseSchema } from "helper/validations";
import { LearnigStyles } from "helper/data";
import Dropzone from 'react-dropzone';
// import Loader from "components/Loader/Loader";

import { getInstructors } from "services/admin"

import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import "./styles.scss"
import "./course.css"
// import "./multiselect.scss"

import HTMLForm  from "./HtmlEditor"
import InstructorGeneratedPills from "../dashboard/actions/create/DynamicInstructorSieverForm"
import CollaboratorsGeneratedPills from "../dashboard/actions/create/DynamicCollaboratorsSieverForm"

import $ from "jquery"











const CreateCourse = (props) => {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [business, setBusiness] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [languages, setLanguages] = useState([]);
  

  const [file, setFile] = useState(null); // state for storing actual image
  const [file2, setFile2] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [previewSrc2, setPreviewSrc2] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const [isPreviewAvailable2, setIsPreviewAvailable2] = useState(false);
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const dropRef2 = useRef();
  const [instructorList,setInstructors] = useState([])
    const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [instructorsCheckSum, setCheckSum] = useState([]);


   // need this to manage change effect on input
  const [state, setState] = React.useState({   
    topics: "",
  })



  function handleChangeTextEditor(nameKey="", valueData ="") {
      if(nameKey.length> 0 && valueData.length > 0){
            setState({
            ...state,
            [nameKey]: valueData
          });
      }   
  }



  const handleToggleAccordion = (event) =>{

     //Bail if our clicked element doesn't have the class
          if (!event.target.classList.contains('accordion-toggle')) return;
          
          // Get the target content
          var content = document.querySelector(event.target.hash);
          if (!content) return;
          
          // Prevent default link behavior
          event.preventDefault();
          
          // If the content is already expanded, collapse it and quit
          if (content.classList.contains('active')) {
            content.classList.remove('active');
            return;
          }
          
          // Get all open accordion content, loop through it, and close it
          var accordions = document.querySelectorAll('.accordion-content.active');
          for (var i = 0; i < accordions.length; i++) {
            accordions[i].classList.remove('active');
          }
          
          // Toggle our content
          content.classList.toggle('active');

  }


  

  useEffect(()=>{
     
  })



  

  const handleInputChange = (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.value
      });
    };


   const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);

          setErrorMsg('');
          await axios.post(`/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          props.history.push('/list');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };


  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
    uploadImageAndsetImageField(uploadedFile,"course_thumbnail")

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };




  const onDrop2 = (files) => {
    const [uploadedFile2] = files;
    setFile2(uploadedFile2);
    uploadImageAndsetImageField(uploadedFile2,"course_cover_image")

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc2(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile2);
    setIsPreviewAvailable2(uploadedFile2.name.match(/\.(jpeg|jpg|png)$/));
    dropRef2.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder2 = (dragState) => {
    if (dragState === 'over') {
      dropRef2.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef2.current.style.border = '2px dashed #e9ebeb';
    }
  };



 const uploadImageAndsetImageField = (imageFile, fieldname) => {
 
  const file = imageFile;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'hpvklb3p');
  // eslint-disable-next-line no-undef
  fetch('https://api.cloudinary.com/v1_1/questence/image/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then((data) => {
      if (typeof data.secure_url !== 'undefined') {
        let imageUrl = data.secure_url;
        console.log(imageUrl)
        toast.success("upload successful")

        if(fieldname==="course_cover_image"){
           setFile2(imageUrl)
           setState({
            ...state,
            course_cover_image: imageUrl
           })
        }else{
           setFile(imageUrl)
           setState({
            ...state,
            course_thumbnail: imageUrl
           })
        }
       
        // handleUploads();
      } else {
        toast.error("could not upload image")
      }
    })
    .catch((error) => {
      throw error;
    });
};







  
  const initialValues = {
    course_name: "",
    learning_style: "",
    duration: "",
    language_id: "",
    certificate_id: "",
    course_code:"",
    price:"",
    category_id: "",
    course_description: "",
    course_thumbnail: "",
    business_id: "",
    introduction_video: "",
    start_date: "",
    end_date: "",
    enrollment_start: "",
    enrollment_end: "",
    course_overview: "",
    prerequisite_course: "",
    entrance_exam: "",
    license: "",
    overall_grade_range: "60",
    grace_period_on_deadline: "24hours",
    course_cover_image: "",
    topics:"",
    outcomes:"",
    intructor_ids:[],
    instructor_id: "" ,//for lead instructor
   
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
         setInstructors([...res[4].data.data])
         console.log(res[4].data.data)
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");

        setLoading(false);
      });
  };


  




  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

        

  

   //leadCollaborators.push(leadInstructor)
   let combineusr = leadCollaborators

   if(! (combineusr.length > 0)){
     toast.error(`You did not select an instructor or collaborators`)
   }
   // values.curriculum = htmlTopics;
   values.outcomes = htmlOutcome;
   values.course_description= htmlDescription;
   values.course_overview= htmlOverView;
   values.prerequisite_course = htmlPrerequisites
   values.topics= state.topics

   // if(values.topics){
   //     toast.error(`${values.topics} has been set to submit`)
   // }
   

   values.instructor_id = leadInstructor;
   let collaborators_id = leadCollaborators
   console.log(collaborators_id,values.topics)
   values.instructor_ids = collaborators_id;
   values.instructors = collaborators_id 

   values.overall_grade_range = values.overall_grade_range.toString()
   
   values.course_thumbnail = file
   values.course_cover_image = file2
   
   if(values?.course_code?.length> 20){
     toast.error(`course code length must not be greater than 20`)
     return false
   }else if(!values?.course_code?.length >0){
     toast.error(`course code length must not be greater than 20`)
     return false
   }

   values.course_code = values.course_code.toUpperCase()


    values.topics = state.topics;
    let error = false
    Object.keys(values).forEach(item =>{
      if(!values[item] ) {
        error =true
            toast.error(`${item} is required`)
        }   
    });

    if(error){
      return false
    }

    
  try {
    //vanilla js validation
     let formData = new FormData();
      

    formData.append("course_name", values.course_name)
    formData.append("price", values.price)
    formData.append("course_code", values.course_code)
    formData.append("learning_style", values.learning_style)
    formData.append("duration", values.duration)
    formData.append("language_id", values.language_id)
    formData.append("certificate_id", values.certificate_id)
    formData.append("category_id", values.category_id)
    formData.append("course_description", values.course_description)
    formData.append("course_thumbnail", values.course_thumbnail)
    formData.append("business_id", values.business_id)
    formData.append("introduction_video", values.introduction_video)
    formData.append("start_date", values.start_date)
    formData.append("end_date", values.end_date)
    formData.append("enrollment_start", values.enrollment_start)
    formData.append("enrollment_end", values.enrollment_end)
    formData.append("course_overview", values.course_overview)
    formData.append("prerequisite_course", values.prerequisite_course)
    formData.append("entrance_exam", values.entrance_exam)
    formData.append("license", values.license)
    formData.append("overall_grade_range", values.overall_grade_range)
    formData.append("grace_period_on_deadline", values.grace_period_on_deadline)
    formData.append("course_cover_image",values.course_cover_image)
    formData.append("topics", state.topics)
    // formData.append("curriculum", values.topics)
    formData.append("outcomes", values.outcomes)
    formData.append("instructor_id", values.instructor_id) //lead instructor
    // let combinedInstructors = [values.instructor_id].concat(values.instructor_ids)
    formData.append("instructors", JSON.stringify(combineusr))
      //formData.append("Instructors", JSON.stringify(combineusr))
   // formData.append("instructor_ids[]", JSON.stringify(combineusr))
    //formData.append("intructor_ids[]", JSON.stringify(combineusr))


    console.log(values)
    await createCourse(formData);
    toast.success("Course sucessfully created.");
    setTimeout(() =>{window.location.reload()},2000)
  } catch (err) {
    console.log(err)
    toast.error(err?.response?.data?.message);
    toast.error(JSON.stringify(err?.response?.data?.errors));
  }
  setLoading(false);
};


   function onChangeImage(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage(files[0]);
    }
   function  createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          [e.target.name]: e.target.result
        })
      };
      reader.readAsDataURL(file);
    }

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: courseSchema,
    onSubmit: handleSubmit,
  });






 
  
 
  const getInstructorNameById =(id) => {
    // console.log(id)
    let list = instructorList;
    // console.log(list)
    let collaborators_info = list.filter(instructor => instructor.id ==id)
    if(collaborators_info.length > 0){
        return collaborators_info[0].first_name + "" + collaborators_info[0].last_name
    }
    return "instructor with id of " + id
      
  }


 

//parent child communication
  const [leadInstructor, setLeadInstructor] = useState("");
   function handleLeadInstructorChange(newValue,sizeOfArray=1) {
      //check if instructor is in the list of db 
      //throw err if not found by unique email
      setLeadInstructor(newValue)
    }


    const [leadCollaborators, setLeadCollaborators] = useState([]);
   function handleCollaboratorsChange(newValue=[],sizeOfArray="unlimited") {
      //check if instructor is in the list of db 
      //throw err if not found by unique email
      setLeadCollaborators([...newValue])
    }

    //leadInstructor : id
    //leadCollaborators : array should return list of ids
    // htmlDescription : returns html document
    //  htmlOverView: returns html
    // htmlOutcome
    // htmlTopics
    // htmlPrerequisites


    const [htmlDescription, setHtmlDescription] = useState("");
   function handleHtmlDescriptionChange(newValue) {
      setHtmlDescription(newValue)
    }

    const [htmlOverView, setHtmlCourseOverView] = useState("");
   function handleHtmlCourseOverViewChange(newValue) {
     
      setHtmlCourseOverView(newValue)
    }


    const [htmlOutcome, setHtmlOutCome] = useState("");
   function handleHtmlOutComeChange(newValue) {
     
      setHtmlOutCome(newValue)
    }

    const [htmlTopics, setHtmlTopics] = useState("");
   function handleHtmlTopicsChange(newValue) {
     
      setHtmlTopics(newValue)
    }


    const [htmlPrerequisites, setHtmlPrerequisites] = useState("");
   function handleHtmlPrerequisitesChange(newValue) {
     
      setHtmlPrerequisites(newValue)
    }











  
  



  return (
    <div>
      {/* Main Wrapper */}
      <div className="course">
       
        <section >
          <Container>
              <Col lg="12">
                <section className="container" >
                <br/><br/>
                  <div >
                    <h3  style={{fontSize:"22px", marginLeft:"10px"}}>Create Course </h3>
                  </div>




                      {/*<a href="#content-1" className="accordion-toggle">Show more 1</a>
                      <div className="accordion-content" id="content-1">
                        Content goes here...
                      </div>
                      <a href="#content-2" className="accordion-toggle">Show more 2</a>
                      <div className="accordion-content" id="content-2">
                        Content goes here...
                      </div>*/}





                  <form
                    id="form_registration"
                    name="simpleRTE"
                    
                    onSubmit={formik.handleSubmit}
                    className="form-horizontal" role="form"
                  >



                  <a onClick={handleToggleAccordion} href="#content-1" className="accordion-toggle accordion">Course Basic Information</a>
                      <div className="accordion-content " id="content-1">


                   <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Course Code</p>
                       <input className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="text"
                          required
                          placeholder="Course Code"
                          name="course_name"
                          {...formik.getFieldProps("course_code")}
                          id="registration_fname"
                          className="form-control "
                        />
                        {formik.touched.course_code &&
                        formik.errors.course_code ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_code}
                          </span>
                        ) : null}
                      </p>
                
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}} >Course Name</p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="text"
                          required
                          placeholder="Course name"
                          name="course_name"
                          {...formik.getFieldProps("course_name")}
                          id="registration_fname"
                        />
                        {formik.touched.course_name &&
                        formik.errors.course_name ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_name}
                          </span>
                        ) : null}
                      </p>


                       



                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Course Price NGN:</p>
                       <input className="form-control"
                          style={{backgroundColor:"#fff"}}
                          type="number"
                          required
                          placeholder="Course price"
                          name="price"
                          {...formik.getFieldProps("price")}
                          id="registration_fname"
                          className="form-control "
                        />
                        {formik.touched.price &&
                        formik.errors.price ? (
                          <span className="registration_input-msg">
                            {formik.errors.price}
                          </span>
                        ) : null}
                      

                      </p>





                      <p>
                       <p  style={{fontSize:"12px", marginLeft:"10px"}}>Lead Instructor</p>


                       <InstructorGeneratedPills 
                           handleAction={handleLeadInstructorChange}
                           value={leadInstructor}
                           list={instructorList}
                           sizeOfArray="1"
                         
                       />

                     


                       

                      </p>



                      <p >
                       <p style={{fontSize:"12px", marginLeft:"10px"}}>Collaborators</p>
                         <CollaboratorsGeneratedPills 
                           handleAction={handleCollaboratorsChange}
                           value={leadCollaborators}
                           list={instructorList}
                           sizeOfArray="unlimited"
                       />
                       
                        

                      </p>


                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> 
                          Learning Style
                        </p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                        className="form-control"
                          name="learning_style"
                          {...formik.getFieldProps("learning_style")}
                          required
                        >
                          <option>-- Learning Style --</option>
                          {LearnigStyles.length > 0 &&
                            LearnigStyles.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                        </select>
                        {formik.touched.learning_style &&
                        formik.errors.learning_style ? (
                          <span className="registration_input-msg">
                            {formik.errors.learning_style}
                          </span>
                        ) : null}
                      </p>

                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Duration in (hours)</p>
                        <input className="form-control" style={{backgroundColor:"#fff"}} className="form-control"
                          type="number"
                          required
                          placeholder="Duration"
                          name="duration"
                          {...formik.getFieldProps("duration")}
                          id="registration_fname"
                        />
                        {formik.touched.duration && formik.errors.duration ? (
                          <span className="registration_input-msg">
                            {formik.errors.duration}
                          </span>
                        ) : null}
                      </p>

                         <h5 style={{fontSize:"10px", marginLeft:"10px"}}>Course thumbnail</h5>
                         <br/>

           <div className="upload-section col-lg-12" style={{backgroundColor:"#fff"}}>
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input className="form-control" {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
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
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>


        </div>



        <a onClick={handleToggleAccordion} href="#content-2" className="accordion-toggle accordion">Course Overview Details</a>
                      <div className="accordion-content " id="content-2">
                 
                 
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}> Language</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="language_id"
                          {...formik.getFieldProps("language_id")}
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
                        {formik.touched.language_id &&
                        formik.errors.language_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.language_id}
                          </span>
                        ) : null}
                      </p>
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Certificate</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="certificate_id"
                          {...formik.getFieldProps("certificate_id")}
                          required
                        >
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
                        {formik.touched.certificate_id &&
                        formik.errors.certificate_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.certificate_id}
                          </span>
                        ) : null}
                      </p>
                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> Category</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="category_id"
                          {...formik.getFieldProps("category_id")}
                          required
                        >
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
                        {formik.touched.category_id &&
                        formik.errors.category_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.category_id}
                          </span>
                        ) : null}
                      </p>

                       {/*<p data-fullscreen className="fullScreen-2">*/}
                      <p>



                        <HTMLForm  
                           title="Course Description"
                           placeholder={"course_description"} 
                           value={htmlDescription}
                           action={handleHtmlDescriptionChange}
                            actionable={false}
                           stateAction={handleChangeTextEditor}
                          
                        />

                        
                       
                          
                      </p>





                    
                      <p >
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> -- Institution --</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="business_id"
                          {...formik.getFieldProps("business_id")}
                          required
                        >
                          <option>Business</option>
                          {business.length > 0 &&
                            business.map((item) => {
                              return (
                                <option value={item.id}>
                                  {item.company_name}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.business_id &&
                        formik.errors.business_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.business_id}
                          </span>
                        ) : null}
                      </p>
                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> 
                          Introductory Video Url
                        </p>
                        <input className="form-control" className="form-control"
                          type="url"
                          placeholder="Course Video Link"
                          name="introduction_video"
                          {...formik.getFieldProps("introduction_video")}
                          id="registration_email"
                        />
                        {formik.touched.introduction_video &&
                        formik.errors.introduction_video ? (
                          <span className="registration_input-msg">
                            {formik.errors.introduction_video}
                          </span>
                        ) : null}
                      </p>
                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> 
                          Enrollment Start
                        </p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="date"
                          required
                          id="enrollment_start"
                          name="enrollment_start"
                          placeholder="Enrollment Start"
                          {...formik.getFieldProps("enrollment_start")}
                        />
                        {formik.touched.enrollment_start &&
                        formik.errors.enrollment_start ? (
                          <span className="registration_input-msg">
                            {formik.errors.enrollment_start}
                          </span>
                        ) : null}
                      </p>
                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> 
                          Enrollment End
                        </p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="date"
                          required
                          id="enrollment_end"
                          name="enrollment_end"
                          placeholder="Enrollment end"
                          {...formik.getFieldProps("enrollment_end")}
                        />
                        {formik.touched.enrollment_end &&
                        formik.errors.enrollment_end ? (
                          <span className="registration_input-msg">
                            {formik.errors.enrollment_end}
                          </span>
                        ) : null}
                      </p>
                 
                 
                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> Start Date</p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="date"
                          required
                          id="start_date"
                          name="start_date"
                          placeholder="Start date"
                          {...formik.getFieldProps("start_date")}
                        />
                        {formik.touched.start_date &&
                        formik.errors.start_date ? (
                          <span className="registration_input-msg">
                            {formik.errors.start_date}
                          </span>
                        ) : null}
                      </p>
                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> End Date</p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="date"
                          required
                          id="end_date"
                          name="end_date"
                          placeholder="end date"
                          {...formik.getFieldProps("end_date")}
                        />
                        {formik.touched.end_date && formik.errors.end_date ? (
                          <span className="registration_input-msg">
                            {formik.errors.end_date}
                          </span>
                        ) : null}
                      </p>
                      {/*<p data-fullscreen className="fullScreen-2">*/}

                       <HTMLForm  
                           title="Course overview "
                           placeholder={"course_overview"}
                           value={htmlOverView}
                           action={handleHtmlCourseOverViewChange}
                            actionable={false}
                           stateAction={handleChangeTextEditor}
                           
                        />


  </div>


<a onClick={handleToggleAccordion} href="#content-3" className="accordion accordion-toggle">Pre requisiites and curriculum section</a>
                      <div className="accordion-content " id="content-3">
                       
                      <p>
                       
          
                         

                        {formik.touched.course_overview &&
                        formik.errors.course_overview ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_overview}
                          </span>
                        ) : null}
                      </p>
                      {/*<p data-fullscreen className="fullScreen-2">*/}

                       <HTMLForm  
                           title="Course Prerequisites"
                           placeholder={"prerequisite_course"} 
                           value={htmlPrerequisites}
                           action={handleHtmlPrerequisitesChange}
                            actionable={false}
                           stateAction={handleChangeTextEditor}
                        />

                        
                      <p>
                      

                     
                      </p>
                 
                 
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}> Entrance Exam</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="entrance_exam"
                          {...formik.getFieldProps("entrance_exam")}
                          required
                        >
                          <option>Entrance Exam</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </select>
                        {formik.touched.entrance_exam &&
                        formik.errors.entrance_exam ? (
                          <span className="registration_input-msg">
                            {formik.errors.entrance_exam}
                          </span>
                        ) : null}
                      </p>
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Licesnse</p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="text"
                          required
                          placeholder="License"
                          name="license"
                          {...formik.getFieldProps("license")}
                          id="registration_fname"
                        />
                        {formik.touched.license && formik.errors.license ? (
                          <span className="registration_input-msg">
                            {formik.errors.license}
                          </span>
                        ) : null}
                      </p>
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>
                          Overall grade range (Minimum course cut off score point)
                        </p>
                       <select
                         style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="overall_grade_range"
                          {...formik.getFieldProps("overall_grade_range")}
                          required
                        >
                          <option>-- Grade Rage --</option>
                          
                          <option value={20}>
                                20
                          </option>
                          <option value={30}>
                                30
                          </option>
                          <option value={50}>
                                50
                          </option>
                          <option value={70}>
                                70
                          </option>
                          <option value={100}>
                                100
                          </option>
                             
                        </select>
                        {formik.touched.overall_grade_range &&
                        formik.errors.overall_grade_range ? (
                          <span className="registration_input-msg">
                            {formik.errors.overall_grade_range}
                          </span>
                        ) : null}
                   </p>
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>
                          Grace period on deadline
                        </p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="text"
                          required
                          placeholder=" Grace period on deadline"
                          name="grace_period_on_deadline"
                          {...formik.getFieldProps("grace_period_on_deadline")}
                          id="registration_fname"
                        />
                        {formik.touched.grace_period_on_deadline &&
                        formik.errors.grace_period_on_deadline ? (
                          <span className="registration_input-msg">
                            {formik.errors.grace_period_on_deadline}
                          </span>
                        ) : null}
                      </p>




                      <HTMLForm  
                           title="Course Outcomes"
                           placeholder={"outcomes"} 
                           actionable={false}
                           stateAction={handleChangeTextEditor}
                          value={htmlOutcome}
                           action={handleHtmlOutComeChange}
                        />
                        
                 




                      <HTMLForm  
                           title="Course Curriculum"
                           placeholder={"topics"} 
                           value={htmlTopics}
                           action={handleHtmlTopicsChange}
                           name="topics"
                           actionable={true}
                           stateAction={handleChangeTextEditor}

                           
                        />

                         {/*htmlTopics.length > 0 &&  (
                              <section
                                  className="not-found-controller"
                                  dangerouslySetInnerHTML={{ __html: htmlTopics }}
                              />
                          )*/}



                      <p>
                        

                       
                      </p><br/><br/>

          
                        <h5 style={{fontSize:"10px", marginLeft:"10px"}}>Course cover image</h5>
                         <br/>
                         <div className="upload-section col-lg-12" style={{backgroundColor:"#fff"}}>
          <Dropzone
            onDrop={onDrop2}
            onDragEnter={() => updateBorder2('over')}
            onDragLeave={() => updateBorder2('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef2}>
                <input className="form-control" {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
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
                <img className="preview-image" src={previewSrc2} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
          



                 

                    <button id="submitter" type="submit" onClick={()=>{
                      formik.handleSubmit()
                    }}   disabled={formik.isSubmitting}>
                      {loading ? (
                        <div  >
                          <span >Create Course</span>
                        </div>
                      ) : (
                        "Create Course"
                      )}
                    </button>


                    <br/><br/><br/><br/>



     </div>
     


                  </form>
                </section>
              </Col>

             







         
          </Container>
        </section>

        {/* Footer 2 */}
      
      </div>
    </div>
  );
};

export default CreateCourse;
