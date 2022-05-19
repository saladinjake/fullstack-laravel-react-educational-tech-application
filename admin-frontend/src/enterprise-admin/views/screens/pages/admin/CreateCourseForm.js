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

import HTMLForm  from "../dashboard/actions/create/EditCourseHtmlForm"
import InstructorGeneratedPills from "../dashboard/actions/create/DynamicInstructorSieverForm"
import CollaboratorsGeneratedPills from "../dashboard/actions/create/DynamicCollaboratorsSieverForm"


import $ from "jquery"





function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}



 const mapOutInitialIdsAndResetList = (collaborators) => {
      if(collaborators.length > 0){
        let check  = collaborators[0]

        if(check.hasOwnProperty("id")){

          let list = collaborators;
          return list.map(item =>{
               return item.id;
            })  
        }
        

      }
       

    return []
   

  }







const CreateCourse = (props) => {
   let history = useHistory();


 

  let all_instructorIds =  mapOutInitialIdsAndResetList([])
  const [collaboratorssList, setCollboratorsList] = useState([]);
  const [leadCollaborators, setLeadCollaborators] = useState([]);
   console.log(all_instructorIds)

 // need this to manage change effect on input
 // and this for a generic event handler for the form
  function handleChange(evt) {
     

        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });

      
  }


  function handleChangeTextEditor(nameKey="", valueData ="") {
      if(nameKey.length> 0 && valueData.length > 0){
            setState({
            ...state,
            [nameKey]: valueData
          });
      }

      
      
  }


  
        const [previewSrc, setPreviewSrc] = useState('')  // state for storing previewImage
  const [previewSrc2, setPreviewSrc2] =  useState('');
    const [file, setFile] = useState(null); // state for storing actual image
  const [file2, setFile2] = useState(null);

     
    






  
   




  const [topics, setTopics] = useState('');
  const [outcomes, setOutcomes] = useState('');


  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [business, setBusiness] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [readySubmit, setReady] = useState(false)
  


  
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const [isPreviewAvailable2, setIsPreviewAvailable2] = useState(false);
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const dropRef2 = useRef();
 

  const [htmlDescription, setHtmlDescription] = useState('');
  const [htmlOverView, setHtmlCourseOverView] = useState('');
  const [htmlOutcome, setHtmlOutCome] = useState('');
  const [htmlTopics, setHtmlTopics] = useState('');
  const [htmlPrerequisites, setHtmlPrerequisites] = useState('');

//parent child communication
  const [leadInstructor, setLeadInstructor] = useState(1);




  const [instructorList,setInstructors] = useState([])
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [instructorsCheckSum, setCheckSum] = useState([]);

  
  const [state, setState] = React.useState({

    course_name:"" ,
    course_code: "",
    price: "",
    instructor_id: "",
    instructors:"",
    learning_style: "",
    course_thumbnail: "",

    
    
    duration: "",
    language_id: "",
    category_id: "",
    certificate_id: "",
    business_id : "",
    introduction_video: "",
    start_date : "",
    end_date : "",
    enrollment_end :"",
     enrollment_start :  "",
     // course_overview: initialValues?.course_overview,
     // prerequisite_course: initialValues?.prerequisite_course,
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
    // course_thumb_file: null,
    // course_cover_file:null,

   
  })

  console.log(state)


  function makeAddedList(Instructors) {
    
    const elements =  Instructors.map((listitem, index) => (
      <div >

       <aside>
  
          <header>
            
            
            <a href={process.env.PUBLIC_URL + "/admin/instructors/"+ listitem.id}>
              {listitem?.image_url?.length> 0 ? ( <img src={listitem?.image_url} alt="noimage" />) : (<img alt="nogivenimage" src="http://gravatar.com/avatar/eb2d48c7f2cf027bb4cb20483e27c9c9?size=200px" />)}
            </a>

           
            <h1>{listitem.first_name} {listitem.last_name}</h1>
            
           
            <h2>{listitem?.brief_introduction}</h2>
            
          </header>
          
        </aside>

        <li
        key={listitem.id}
        
        data-item={listitem.id}
        style={{
         
          width: listitem.itemWidth
        }}
      >
        {listitem.content}
      </li>

          </div>      


    ));
    return elements

  }
  



  





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





  

  const handleInputChange = (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.value
      });
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


  




  const handleSubmit =async (e) => {
    setLoading(true);


   

   //leadCollaborators.push(leadInstructor)
   let combineusr = leadCollaborators

   if(! (combineusr.length > 0)){
     toast.error(`You did not select an instructor or collaborators`)
   }


   

     state.instructor_id =leadInstructor


     console.log(state)
     state.instructors= JSON.stringify(combineusr)
 
   
    
    let formData = new FormData()

    let error = false
    Object.keys(state).forEach(item =>{
      if(!state[item] || state[item]===null || state[item]===""  ) {
        error =true
            toast.error(`${item} is required`)
        }   else{
           // toast.success(`${item} is added here`)
        }
    });

    if(error){
      return false
    }else{
      setReady(true)
    }

    
  try {

    let formData = new FormData()

    let combineusr = leadCollaborators

   if(! (combineusr.length > 0)){
     toast.error(`You did not select an instructor or collaborators`)
   }
   
    

   
    

   
     if(e.target.getAttribute("id")==="submitter"){
      // console.log(values)
    await createCourse(state)
    toast.success("Course sucessfully created.");
    setTimeout(() =>{window.location.reload()},3000)

     }
    
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
    initialValues: state,
    // validationSchema: courseSchema,
    // onSubmit: handleSubmit,
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
  // const [leadInstructor, setLeadInstructor] = useState("");
   function handleLeadInstructorChange(newValue,sizeOfArray=1) {
      //check if instructor is in the list of db 
      //throw err if not found by unique email
      setLeadInstructor(newValue)
    }


    // const [leadCollaborators, setLeadCollaborators] = useState([]);
   function handleCollaboratorsChange(newValue=[],sizeOfArray="unlimited") {
      //check if instructor is in the list of db 
      //throw err if not found by unique email
      setLeadCollaborators([...newValue])
    }

   

    // const [htmlDescription, setHtmlDescription] = useState("");
   function handleHtmlDescriptionChange(newValue) {
      setHtmlDescription(newValue)
    }

    // const [htmlOverView, setHtmlCourseOverView] = useState("");
   function handleHtmlCourseOverViewChange(newValue) {
     
      setHtmlCourseOverView(newValue)
    }


    // const [htmlOutcome, setHtmlOutCome] = useState("");
   function handleHtmlOutComeChange(newValue) {
     
      setHtmlOutCome(newValue)
    }

    // const [htmlTopics, setHtmlTopics] = useState("");
   function handleHtmlTopicsChange(newValue) {
     
      setHtmlTopics(newValue)
    }


    // const [htmlPrerequisites, setHtmlPrerequisites] = useState("");
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



                  <a onClick={handleToggleAccordion} href="#content-1" className="accordion-toggle accordion"> Section #1    (Course Basic Information )</a>
                      <div className="accordion-content " id="content-1">


                   <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Course Code</p>
                       <input className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="text"
                          required
                          placeholder="Course Code"
                          name="course_code"
                      
                          id="registration_fname"
                          className="form-control "
                          value={state.course_code}
                          onChange={handleChange}
                        />
                        
                      </p>
                
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}} >Course Name</p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="text"
                          required
                          placeholder="Course name"
                          name="course_name"
                          
                          id="registration_fname"
                          value={state.course_name}
                          onChange={handleChange}
                        />
                        
                      </p>




                       



                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Course Price NGN:</p>
                       <input className="form-control"
                          style={{backgroundColor:"#fff"}}
                          type="number"
                          required
                          placeholder="Course price"
                          name="price"
                          
                          id="registration_fname"
                          className="form-control "
                          value={state.price}
                          onChange={handleChange}
                        />
                       
                      

                      </p>

                      </div>




                        

                         <a onClick={handleToggleAccordion} href="#content-2" className="accordion-toggle accordion">Section #2 (Lead Instructors and collaborators)</a>
                      <div className="accordion-content " id="content-2">
                 
             
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
                         
                          required
                           value={state.learning_style}
                          onChange={handleChange}
                        >



                       
                      
                          <option>-- Learning Style --</option>
                          {LearnigStyles.length > 0 &&
                            LearnigStyles.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                        </select>
                        
                      </p>

                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Duration in (hours)</p>
                        <input className="form-control" style={{backgroundColor:"#fff"}} className="form-control"
                          type="number"
                          required
                          placeholder="Duration"
                          name="duration"
                          
                          id="registration_fname"
                          value={state.duration}
                          onChange={handleChange}
                        />

                         

                   
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
              <div className="image-preview">
                 <img className="preview-image" src={state.course_thumbnail} alt="Preview" />
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
          

        </div>

      



        <a onClick={handleToggleAccordion} href="#content-3" className="accordion-toggle accordion">Section #3 ( Course Overview Details)</a>
                      <div className="accordion-content " id="content-3">
                 
                 
              <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}> Language</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="language_id"
                       
                          required
                           value={state.language_id}
                          onChange={handleChange}
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
                      
                      </p>
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Certificate</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="certificate_id"
                          
                          required
                           value={state.certificate_id}
                          onChange={handleChange}
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
                        
                      </p>
                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> Category</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="category_id"
                         
                          required
                          value={state.category_id}
                          onChange={handleChange}

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
                       
                      </p>

                       {/*<p data-fullscreen className="fullScreen-2">*/}
                      <p>



                        <HTMLForm 
                           title="course_description"
                           placeholder={"course_description"} 
                           value={state.course_description || ""}
                           action={handleHtmlDescriptionChange}
                           stateAction={handleChangeTextEditor}
                           name={"course_description"}
                           
                        />

                        
                       
                          
                      </p>


  </div>


        <a onClick={handleToggleAccordion} href="#content-4" className="accordion-toggle accordion">Section #4 ( Course Enrollments Information)</a>
                      <div className="accordion-content " id="content-4">

                    
                      <p >
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> -- Institution --</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="business_id"
                          value={state.business_id}
                          onChange={handleChange}
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
                       
                      </p>
                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> 
                          Introductory Video Url
                        </p>
                        <input className="form-control" className="form-control"
                          type="url"
                          placeholder="Course Video Link"
                          name="introduction_video"
                         value={state.introduction_video}
                         onChange={handleChange}
                          id="registration_email"
                        />
                        
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
                          value={state.enrollment_start}
                          onChange={handleChange}
                        
                        />
                        
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
                          value={state.enrollment_end}
                           onChange={handleChange}
                          
                        />
                       
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
                          value={state.start_date}
                           onChange={handleChange}
                          
                        />
                        
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
                          value={state.end_date}
                           onChange={handleChange}
                        />
                        
                      </p>
                      {/*<p data-fullscreen className="fullScreen-2">*/}

                       <HTMLForm 
                           title="course_overview"
                           placeholder={"course_overview"}
                           value={state.course_overview || ""}
                           action={handleHtmlCourseOverViewChange}
                           name="course_overview"
                           stateAction={handleChangeTextEditor}
                           
                        />


  </div>
  
<a onClick={handleToggleAccordion} href="#content-5" className="accordion accordion-toggle">Section #5   (Pre requisiites and curriculum section)</a>
                      <div className="accordion-content " id="content-5">
                       
                    <p>
                       
          
                         

                       
                      </p>
                      {/*<p data-fullscreen className="fullScreen-2">*/}

                       <HTMLForm 
                           title="prerequisite_course"
                           placeholder={"prerequisite_course"} 
                           value={state.prerequisite_course || ""}
                           action={handleHtmlPrerequisitesChange}
                           name="prerequisite_course"
                           stateAction={handleChangeTextEditor}

                        />

                        
                      <p>
                      

                     
                      </p>
                 
                 
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}> Entrance Exam</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="entrance_exam"
                          value={state.entrance_exam}
                           onChange={handleChange}
                          required
                        >
                          <option>Entrance Exam</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </select>
                        
                      </p>
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Licesnse</p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="text"
                          required
                          placeholder="License"
                          name="license"
                          
                          value={state.license}
                           onChange={handleChange}
                          id="registration_fname"
                        />
                       
                      </p>
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>
                          Overall grade range (Minimum course cut off score point)
                        </p>
                       <select
                         style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="overall_grade_range"
                          value={state.overall_grade_range}
                           onChange={handleChange}
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
                          value={state.grace_period_on_deadline}
                          id="registration_fname"
                           onChange={handleChange}
                        />
                        
                      </p>




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
              <div className="image-preview">
                 <img className="preview-image" src={state.course_cover_image} alt="Preview" />
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
          

  



                 
                    <a  id="submitter"  onClick={(e )=>{
                      handleSubmit(e)
                    
                    }}  className="btn btn-success">
                    
                      {loading ? (
                        <div  >
                          <span >Creating Course {state.course_name}...</span>
                        </div>
                      ) : (
                        "Create New Course"
                      )}
                    </a>


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
