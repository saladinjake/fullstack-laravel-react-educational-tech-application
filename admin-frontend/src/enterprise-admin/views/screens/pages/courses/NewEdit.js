import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "../../components/Footer";
// //from "./styles/account.js";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { getCourse } from "../../../../api/services/course";
import { getLanguages } from "../../../../api/services/language";
import { getCategories } from "../../../../api/services/category";
import { getCertificates } from "../../../../api/services/category";
import { getBusiness } from "../../../../api/services/business";
import { courseSchema } from "../../../../core/helpers/validations";
import { LearnigStyles } from "../../../../core/helpers/data";
import Dropzone from 'react-dropzone';
// import Loader from "components/Loader/Loader";

import axios from 'axios';
import { Button } from 'react-bootstrap';
import { getInstructors } from "../../../../api/services/admin"

import { updateCourse } from "../../../../api/services/course";

// import "./styles.scss"
// import "./course.css"




import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



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

function Form(props) {
  const {initialValues } = props
    let history = useHistory();
  const [instructorList,setInstructors] = useState([])
   const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [business, setBusiness] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [topics, setTopics] = useState([...initialValues.topics]);
  const [outcomes, setOutcomes] = useState([...initialValues.outcomes]);



  const [file, setFile] = useState(null); // state for storing actual image
  const [file2, setFile2] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(initialValues.course_thumbnail)  // state for storing previewImage
  const [previewSrc2, setPreviewSrc2] =  useState(initialValues.course_cover_image);
 
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const [isPreviewAvailable2, setIsPreviewAvailable2] = useState(false);
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const dropRef2 = useRef();


    const [selectedInstructors, setSelectedInstructors] = useState([]);
    let leadInstructor = null
  const [instructorsCheckSum, setCheckSum] = useState([...initialValues.instructors]); //suppose to parse it



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
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");

        setLoading(false);
      });
  };


  function handleChangeEffect(evt) {
  const value = evt.target.value;
  setState({
    ...state,
    [evt.target.name]: value
  });
}
  const [state, setState] = React.useState({
    course_name: initialValues.course_name,
    course_code: initialValues.course_code,
    instructor_id: initialValues.instructor_id,
    instructors: initialValues.instructors,
    learning_style:initialValues.learning_style,
    duration:initialValues.duration,
    price:initialValues.price,
    business_id:initialValues.business_id,




    language_id: initialValues.language_id,
    certificate_id:initialValues.certificate_id,
    category_id: initialValues.category_id,
    course_description: initialValues.course_description,
    course_thumbnail: initialValues.course_thumbnail,
  
    introduction_video: initialValues.introduction_video,
    start_date: formatDate(new Date(initialValues.start_date)),
    end_date: formatDate(new Date(initialValues.end_date)),
    enrollment_start: formatDate(new Date(initialValues.enrollment_start)),
    enrollment_end: formatDate(new Date(initialValues.enrollment_end)),
    course_overview: initialValues.course_overview,
    prerequisite_course: initialValues.prerequisite_course,
    entrance_exam: initialValues.entrance_exam,
    license: initialValues.license,
    overall_grade_range: initialValues.overall_grade_range,
    grace_period_on_deadline: initialValues.grace_period_on_deadline,
    course_cover_image: initialValues.course_cover_image,

  })

  useEffect(() =>{
    if(initialValues.instructor_id){
     
      console.log(initialValues.instructor_id);
      let instructorBox = document.getElementById("leadInstructor")
      instructorBox.selectedIndex =initialValues.instructor_id

    }
  })



  const getInstructorNameById =(id) => {
    console.log(id)
    let list = instructorList;
    console.log(list)
    let collaborators_info = list.filter(instructor => instructor.id ==id)
    if(collaborators_info.length > 0){
        return collaborators_info[0].first_name + "" + collaborators_info[0].last_name + "added as collaborator"
    }

    if(typeof id == "object"){
      return id.first_name + " " + id.last_name + "added as team lead"
    }
    
      
  }





  function getLeadInstructorById(id){
    console.log(id)
    let list = instructorList;
    console.log(list)
    let lead = list.filter(instructor => instructor.id ==id)
    return lead 
    

  }


    const deleteInstructor = (id) => {
    // eslint-disable-next-line
    const remainder = instructorsCheckSum.filter((teacher) => {
      if (teacher !== id) return teacher;
    });
    setCheckSum([...remainder]);
  };



   let counter =1 ;
  let topicBag =[]


  
  const handleTopics = (e) => {
    //   console.log("value", e.target.value);
    const topicBag = localStorage && JSON?.parse(localStorage.getItem("syllables"));
    let syllables = topicBag ? topicBag : [];
    e.preventDefault();
    // e.stopPropagation();
    if (e.keyCode === 13) {
      let topic = { title: e.target.value, parent_id: counter++ };
      syllables.push(topic)
       console.log(syllables)

      // setTopics([...syllables]);
      localStorage.setItem("syllables",JSON.stringify(syllables))
       // setTopics([...topicBag]);
      e.target.value = "";


    }

    // console.log(topics)
  };

  const handleOutcomes = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    if (e.keyCode === 13) {
      setOutcomes([...outcomes, e.target.value]);
      e.target.value = "";
    }
  };

  const deleteTopic = (id) => {
    // eslint-disable-next-line
    const remainder = topics.filter((topic) => {
      if (topic.id !== id) return topic;
    });
    setTopics([...remainder]);
  };


  const deleteOutcomes = (id) => {
    // eslint-disable-next-line
    const remainder = outcomes.filter((topic) => {
      if (topic !== id) return topic;
    });
    setOutcomes([...remainder]);
  };

 



   const handleSelectedInstructors = function(selectedItems) {
        const collaborators = []; let unfiltered =[]; let filtered =[]

        const topicBag = localStorage && JSON?.parse(localStorage.getItem("instructors_list"));
        let collabo = topicBag ? topicBag : [];

        for (let i=0; i<selectedItems.length; i++) {
            collaborators.push(selectedItems[i].value);
            
            unfiltered = [...collaborators,...instructorsCheckSum];
            filtered =  unfiltered.filter(uniqueSet)
            
            setCheckSum(unfiltered)

            
        }
        setSelectedInstructors(collaborators);
         setState( {instructors: collaborators })
        console.log(instructorsCheckSum)
        localStorage.setItem("instructors_list",JSON.stringify(filtered))

        console.log(localStorage.getItem("instructors_list"))


    }



     const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
    setState({course_thumbnail:file})

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
    setState({course_cover_image:file2})

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






function uniqueSet(value, index, self) {
    return self.indexOf(value) === index;
  }









  const handleSubmit = async (e) =>{
   // e.preventDefault()
    console.log(state)


    let formData = new FormData();
    const allTopics = localStorage && JSON?.parse(localStorage.getItem("syllables"));
    let syllables = allTopics ? allTopics : [];
    

    const initialValuesx = {
      course_name: "ssasa",
      learning_style: "Self Paced",
      duration: "40",
      language_id: "3",
      certificate_id: "3",
      category_id: "1",
      course_description: "dsdss",
      course_thumbnail: "hello.jpg",
      business_id: "1",
      introduction_video: "http://vimoe.com/8483093",
      start_date: "2000/12/2",
      end_date: "2000/12/2",
      enrollment_start: "2000/12/2",
      enrollment_end: "2000/12/2",
      course_overview: "dssssssss",
      prerequisite_course: "ddddddddd",
      entrance_exam: "0",
      license: "89899",
      overall_grade_range: "60",
      grace_period_on_deadline: "24hours",
      course_cover_image: "",
      topics:[{topic:"djkds"}],
      outcomes:['thsioas'],
      instructor_id:"1",
      instructors:["1"]
  };





    // formData.append("course_name", state.course_name)
    // formData.append("price", state.price)
    // formData.append("course_code", state.course_code)

    // formData.append("learning_style", state.learning_style)
    // formData.append("duration", state.duration)
    // formData.append("language_id", state.language_id)
    // formData.append("certificate_id", state.certificate_id)
    // formData.append("category_id", state.category_id)
    // formData.append("course_description", state.course_description)
    // formData.append("course_thumbnail", state.course_thumbnail)
    // formData.append("business_id",state.business_id)
    // formData.append("introduction_video", state.introduction_video)
    // formData.append("start_date", state.start_date)
    // formData.append("end_date", state.end_date)
      

    // formData.append("enrollment_start", state.enrollment_start)
    // formData.append("enrollment_end", state.enrollment_end)
    // formData.append("course_overview", state.course_overview)
    // formData.append("prerequisite_course", state.prerequisite_course)
    // formData.append("entrance_exam", state.entrance_exam)
    // formData.append("license", state.license)
    // formData.append("overall_grade_range", state.overall_grade_range.toString())
    // formData.append("grace_period_on_deadline", state.grace_period_on_deadline)
    // formData.append("course_cover_image",state.course_cover_image)
    // formData.append("topics", JSON.stringify(syllables))
    // formData.append("outcomes[]", outcomes)

   try{
      await updateCourse(initialValuesx);
      toast.success("Course sucessfully created.");

      localStorage.setItem('syllables', JSON.stringify([]))
      history.push("/instructor-pages/mycourses")
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message);
      toast.error(JSON.stringify(err?.response?.data?.errors));
    }
    setLoading(false);
  

  }

  return (


    <form className="form form-horizontal" style={{margin:"0px auto",width:"80%"}}>
    <br/>
    <h5> Editing Course {state.course_name} </h5>
     <p >
      <label>
        Course Code
          </label>
        <input className="form-control"
        className="form-control"
          type="text"
          name="course_code"
          value={state.course_code}
          onChange={handleChangeEffect}
          defaultValue={initialValues.course_code}
        />
    
      </p>
      <p >
      <label>
        Course Name
            </label>
        <input className="form-control"
        className="form-control"
          type="text"
          name="course_name"
          value={state.course_name}
          onChange={handleChangeEffect}
        />
  
      </p>

      <p>
         <p  style={{fontSize:"12px", marginLeft:"10px"}}>Lead Instructor</p>
          <select  
            style={{width:"100%",padding:"10px",marginLeft:"10px"}}
            name="instructor_ids"
            id="leadInstructor"
            onChange={handleChangeEffect} value={state.instructor_id}
            
            required

          >
        
            <option >-- Lead Instructor --</option>
            { instructorList.length > 0 &&
              instructorList.map((teacher, i) => {
                return (
                  <option key={i} value={teacher?.id}>
                    { teacher?.first_name + " "+  teacher?.last_name}
                  </option>
                );
              })}
            
          </select>
        </p>



        <p>
           <p style={{fontSize:"12px", marginLeft:"10px"}}> Instructors</p>
            <select  
            className="form-control"
              name="instructor_ids"
             
               value={state.instructors}
              required
              
               multiple={true}
             
              onChange={(e)=> {handleSelectedInstructors(e.target.selectedOptions)}}
            >
          
              <option >-- Instructors --</option>
              { instructorList.length > 0 &&
                instructorList.map((teacher, i) => {
                  return (
                    <option key={i} value={teacher?.id}>
                      { teacher?.first_name + " "+  teacher?.last_name}
                    </option>
                  );
                })}
              
            </select>
           


            <ul className="topics">
              {instructorsCheckSum.length > 0 &&
                instructorsCheckSum.map((item, i) => {
                  return (
                    <li key={i}  style={{backgroundColor:"#fafafa",borderRadius:"10%",padding:"1px"}}>
                      {getInstructorNameById(item)}   
                      <button style={{ borderRadius:"50%", backgroundColor:"red", float:"right"}}
                        onClick={deleteInstructor.bind(this, item)}
                      
                      
                      >X</button>
                    </li>
                  );
                })} 
              
            </ul>

          </p>



           <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Course Price</p>
                       <input className="form-control"
                          style={{backgroundColor:"#fff"}}
                          type="number"
                          required
                          placeholder="Course price"
                          name="price"
                          value={state.price}
                          onChange={handleChangeEffect}
                          id="registration_fname"
                          className="form-control "
                        />
                       
                      

                      </p>


                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> 
                          Learning Style
                        </p>
                        <select style={{width:"100%", padding:"5px", margin:"5px",backgroundColor:"#fff"}}
                        className="form-control"
                          name="learning_style"
                          value={state.learning_style}
                          onChange={handleChangeEffect}
                          required
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
                          onChange={handleChangeEffect}
                          value={state.duration}
                          id="registration_fname"
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
                 <img className="preview-image" src={initialValues.course_thumbnail} alt="Preview" />
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
                 
                 
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}> Language</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="language_id"
                          value={state.language_id}
                          onChange={handleChangeEffect}
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
                        
                      </p>
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Certificate</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="certificate_id"
                          value={state.certificate_id}
                          onChange={handleChangeEffect}
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
                       
                      </p>
                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> Category</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="category_id"
                          value={state.category_id}
                          onChange={handleChangeEffect}
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
                        
                      </p>

                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>
                          Course Description
                        </p>
                         <textarea
                          className="form-control"
                          cols="80"
                          style={{height:"200px", backgroundColor:"#fff"}}
                          placeholder="Course Description"
                          name="course_description"
                          value={state.course_description}
                          onChange={handleChangeEffect}
                          id="registration_biography"
                        ></textarea>
                       
                      </p>
                 
                 
                      <p>
                         <p style={{fontSize:"12px", marginLeft:"10px"}}> -- Institution --</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="business_id"
                          value={state.business_id}
                          onChange={handleChangeEffect}
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
                          onChange={handleChangeEffect}
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
                          onChange={handleChangeEffect}
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
                          onChange={handleChangeEffect}
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
                          onChange={handleChangeEffect}
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
                          onChange={handleChangeEffect}
                        />
                        
                      </p>
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>
                          Course Overview
                        </p>
                         <textarea
                          className="form-control"
                          cols="80"
                          style={{height:"200px", backgroundColor:"#fff"}}
                          placeholder="Course Overview"
                          name="course_overview"
                          value={state.course_overview}
                          onChange={handleChangeEffect}
                          id="registration_course_overview"
                        ></textarea>

                      </p>
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>
                          Prerequisite Course
                        </p>
                         <input className="form-control"
                          className="form-control"
                          type="text"
                          
                          placeholder="Prerequisite Course"
                          name="prerequisite_course"
                          value={state.prerequisite_course}
                          onChange={handleChangeEffect}
                          id="registration_prerequisite_course"
                        />

                       
                      </p>
                 
                 
                      <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}> Entrance Exam</p>
                        <select style={{width:"100%", padding:"10px", margin:"10px",backgroundColor:"#fff"}}
                          name="entrance_exam"
                          value={state.entrance_exam}
                          onChange={handleChangeEffect}
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
                         onChange={handleChangeEffect}
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
                         
                          required
                          value={state.overall_grade_range}
                          onChange={handleChangeEffect}
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
                          onChange={handleChangeEffect}
                          id="registration_fname"
                        />
                       
                      </p>





                       <p>
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>
                          Outcomes (Press Enter to save)
                        </p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="text"
                          placeholder="outcomes"
                          name="outcomes"
                          id="outcomes"
                          onKeyUp={handleOutcomes}
                        />
                        <ul className="outcomes">
                          {outcomes.length > 0 &&
                            outcomes.map((item, i) => {
                              return <li key={i} style={{backgroundColor:"#f5f5f5",borderRadius:"10%",padding:"1px",float:"right",margin:"10px"}}>
                                            { item }
                                              <button
                                                 style={{background:"red",borderRadius:"50%",width:"10px"}}
                                               className="btn btn-danger"
                                    onClick={deleteOutcomes.bind(this, item)}
                                  >X</button>

                                       </li>;
                            })}

                        </ul>
                      </p>
                      <p>
                        <p style={{fontSize:"22px", marginLeft:"10px"}}>
                          Topics (Press Enter to save)
                        </p>
                        <input className="form-control" className="form-control"
                        style={{backgroundColor:"#fff"}}
                          type="text"
                          placeholder="Topics"
                          name="topics"
                          id="topics"
                          onKeyUp={handleTopics}
                        />
                        <ul className="topics">
                          {topics.length > 0 &&
                            topics.map((item, i) => {
                              console.log(item)
                              return (
                                <li key={i} style={{backgroundColor:"#fafafa",borderRadius:"10%",padding:"1px", margin:"10px"}}>
                                  {item.topic}
                                  <button
                                 
                                  style={{background:"red",borderRadius:"50%",width:"10px",float:"right"}}
                                   className="btn btn-danger"
                                    onClick={deleteTopic.bind(this, item.id)}
                                  >X</button>
                                </li>
                              );
                            })}
                          
                         
                        </ul>
                      </p>
                                               <br/><br/>

          
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
                 <img className="preview-image" src={initialValues.course_cover_image} alt="Preview" />
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>


         <button type="submit" onClick={()=>{
                      handleSubmit()
                    }}  >
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Update"
                      )}
                    </button>
                 


    </form>
  );
}

export default Form