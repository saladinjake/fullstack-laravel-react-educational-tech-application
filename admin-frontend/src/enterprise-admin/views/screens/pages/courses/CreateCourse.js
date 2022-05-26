import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "../../components/Footer";
//from "./styles/account.js";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { createCourse } from "../../../../api/services/course";
import { getLanguages } from "../../../../api/services/language";
import { getCategories } from "../../../../api/services/category";
import { getCertificates } from "../../../../api/services/category";
import { getBusiness } from "../../../../api/services/business";
import { courseSchema } from "../../../../core/helpers/validations";
import { LearnigStyles } from "../../../../core/helpers/data";
import Dropzone from 'react-dropzone';
// import Loader from "components/Loader/Loader";

import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

// import "./styles.scss"
// import "./course.css"

const CreateCourse = (props) => {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [business, setBusiness] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [outcomes, setOutcomes] = useState([]);



  const [file, setFile] = useState(null); // state for storing actual image
  const [file2, setFile2] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [previewSrc2, setPreviewSrc2] = useState('');
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const [isPreviewAvailable2, setIsPreviewAvailable2] = useState(false);
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const dropRef2 = useRef();

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





  let counter =1 ;
  let topicBag =[]
  const handleTopics = (e) => {
    //   console.log("value", e.target.value);
    e.preventDefault();
    // e.stopPropagation();
    if (e.keyCode === 13) {
      let topic = { title: e.target.value, parent_id: counter++ };
      topicBag.push(topic)
     //setTopics([...topics, e.target.value]);
       setTopics([...topicBag]);
      e.target.value = "";
    }
  };

  const handleOutcomes = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    if (e.keyCode === 13) {
      setOutcomes([...outcomes, e.target.value]);
      e.target.value = "";
    }
  };

  // const deleteTopic = (id) => {
  //   // eslint-disable-next-line
  //   const remainder = topics.filter((topic) => {
  //     if (topic.id !== id) return topic;
  //   });
  //   setTopics([...remainder]);
  // };

  const initialValues = {
    course_name: "",
    learning_style: "",
    duration: "",
    language_id: "",
    certificate_id: "",
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
    topics:[],
    outcomes:[]
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
      ].map((err) => err.catch(() => err))
    )
      .then((res) => {
        setCategories([...res[0].data.data]);
        setCertificates([...res[1].data.data]);
        setLanguages([...res[2].data.data]);
        setBusiness([...res[3].data.data.profiles.data]);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");

        setLoading(false);
      });
  };


  




  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

    if(!values.topics && !values.outcomes && !values.course_thumbnail && !values.course_cover_image){
         toast.error("Form not completed");
        return false;
    }

    console.log(topics, outcomes)
    try {
       let formData = new FormData();
       values.topics= topics;
       values.outcomes = outcomes;
       values.overall_grade_range = values.overall_grade_range.toString()
       values.course_thumbnail = file
       values.course_cover_image = file2

       formData.append("course_name", values.course_name)

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
    formData.append("topics", JSON.stringify(values.topics))
    formData.append("outcomes[]", values.outcomes)
  

      console.log(values)
      await createCourse(formData);
      toast.success("Course sucessfully created.");
      history.push("/instructor-pages/mycourses")
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
    validationSchema: courseSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      {/* Main Wrapper */}
      <div className="">
   
        {/*<BreadcrumbBox title="Create Course" />*/}
        <section className="course">




        

          <Container>
            
                <section className="card-box">
                  <div className="center">
                    <h3>Create Course </h3>
                  </div>
                  <form
                    id="form_registration"
                    className="form-horizontal" role="form"
                    
                  >
            
                     
                     <div className="container ">
            
                        <input className="form-control"
                          type="text"
                          required
                          placeholder="Course name"
                          name="course_name"
                          {...formik.getFieldProps("course_name")}
                          id="registration_fname"
                          className="form-control "
                        />
                        {formik.touched.course_name &&
                        formik.errors.course_name ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_name}
                          </span>
                        ) : null}
                      
                    
        

          
       
            
                     
            
                        <select
                          name="learning_style"
                          {...formik.getFieldProps("learning_style")}
                          required
                          style={{width:"100%", padding:"10px", margin:"10px"}}
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

                        </div>
                  
          
         
 
                     <div className="container ">
            
                        <input className="form-control"
                         className="form-control "
                          type="text"
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
            </div>
                 

           <div className="upload-section col-lg-12">
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


                     <div className="container ">
            
                   
                        <select
                         style={{width:"100%", padding:"10px", margin:"10px"}}
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
                       
         
                        <select
                         style={{width:"100%", padding:"10px", margin:"10px"}}
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
        
                        <select
                         style={{width:"100%", padding:"10px", margin:"10px"}}
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
        
           
                        <textarea
                         className="form-control"
                          placeholder="Course Description"
                          name="course_description"
                          {...formik.getFieldProps("course_description")}
                          id="registration_biography"
                        >Course Description</textarea>
                        {formik.touched.course_description &&
                        formik.errors.course_description ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_description}
                          </span>
                        ) : null}
         
</div>

 
                     <div className="container ">

          
                        <select
                         style={{width:"100%", padding:"10px", margin:"10px"}}
                          name="business_id"
                          {...formik.getFieldProps("business_id")}
                          required
                        >
                          <option>--Institution--</option>
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
     
       
                        <input className="form-control"
                         className="form-control"
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
       
                         <p>Enrollment Start Date</p>
                        <input className="form-control"
                         className="form-control"
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
     

                        <p>Enrollment End Date</p>
                        <input className="form-control"
                         className="form-control"
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
     </div>


                     <div className="container ">
                        <p>Course Start Date</p>
                        <input className="form-control"
                         className="form-control"
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

                         <p>Enrollment End Date</p>
              
                        <input className="form-control"
                         className="form-control"
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
        
                        <textarea
                        cols={"50"}
                         className="form-control"
                          placeholder="Course Overview"
                          name="course_overview"
                          {...formik.getFieldProps("course_overview")}
                          id="registration_course_overview"
                        >Course Overview</textarea>

                        {formik.touched.course_overview &&
                        formik.errors.course_overview ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_overview}
                          </span>
                        ) : null}
           
                        <textarea
                        cols={"50"}
                         className="form-control"
                          placeholder="Prerequisite Course"
                          name="prerequisite_course"
                          {...formik.getFieldProps("prerequisite_course")}
                          id="registration_prerequisite_course"
                        ></textarea>

                        {formik.touched.prerequisite_course &&
                        formik.errors.prerequisite_course ? (
                          <span className="registration_input-msg">
                            {formik.errors.prerequisite_course}
                          </span>
                        ) : null}
  </div>


                     <div className="container ">
                      
                        <select
                         style={{width:"100%", padding:"10px", margin:"10px"}}
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
                      
            <input className="form-control"
                         className="form-control"
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
                        


                        <select
                         style={{width:"100%", padding:"10px", margin:"10px"}}
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
       
                        <input className="form-control"
                         className="form-control"
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
     

                    
                        <p>
                          Outcomes (Press Enter to save)
                        </p>
                        <input className="form-control"
                         className="form-control"
                          type="text"
                          placeholder="outcomes"
                          name="outcomes"
                          id="outcomes"
                          onKeyUp={handleOutcomes}
                        />
                        <ul className="outcomes">
                          {outcomes.length > 0 &&
                            outcomes.map((item, i) => {
                              return <li key={i}>{item}</li>;
                            })}
                        </ul>

        </div>

                     <div className="container ">
            
        
                        <p>
                          Topics (Press Enter to save)
                        </p>
                        <input className="form-control"
                         className="form-control"
                          type="text"
                          placeholder="Topics"
                          name="topics"
                          id="topics"
                          onKeyUp={handleTopics}
                        />
                        <ul className="topics">
                          {/* {topics.length > 0 &&
                            topics.map((item, i) => {
                              return (
                                <li key={i}>
                                  {item.text}
                                  <button
                                    onClick={deleteTopic.bind(this, item.id)}
                                  ></button>
                                </li>
                              );
                            })} */}
                          {topics.length > 0 &&
                            topics.map((item, i) => {
                              return <li key={i}>{item.title}</li>;
                            })}
                        </ul>
          

                         <br/><br/>

          
                        <p >
                          Course Cover Image Url
                        </p>
                         <div className="upload-section col-lg-12" style={{marginBottom:"100px"}}>
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

          


          </div>
                    
                   
                    <button type="submit" onClick={()=>{
                       formik.handleSubmit()
                    }} disabled={formik.isSubmitting}>
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Create Course"
                      )}
                    </button>
                  </form>

                  <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </section>
             
          </Container>
        </section>

        {/* Footer 2    <Footer /> */}

       
      </div>

   
    </div>
  );
};

export default CreateCourse;
