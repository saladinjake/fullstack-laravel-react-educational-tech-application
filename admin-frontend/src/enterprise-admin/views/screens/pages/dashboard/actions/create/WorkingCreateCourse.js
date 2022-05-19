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




import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorState } from 'draft-js';
import $ from "jquery"


class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;

    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="rich-editor demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          placeholder="The message goes here..."
        />
      </div>
    );
  }
}





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

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const [instructorList,setInstructors] = useState([])


    const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [instructorsCheckSum, setCheckSum] = useState([]);


  const onEditorStateChange = editorState => {
    
    setEditorState( editorState)
  };

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
    const topicBag = localStorage && JSON?.parse(localStorage.getItem("syllables"));
    let syllables = topicBag ? topicBag : [];
    e.preventDefault();

   

    // e.stopPropagation();
    if (e.keyCode === 13) {
      let topic = { title: e.target.value, parent_id: counter++ };
      syllables.push(topic)
       console.log(syllables)
       toast.success(topic.title+ " has been added to syllables")

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

  const deleteTopic = (el,id) => {
     const topicBag = localStorage && JSON?.parse(localStorage.getItem("syllables"));
     let syllables = topicBag ? topicBag : [];

    //   var parent = document.getElementById("topics"+el);
    // parent.remove()
    // eslint-disable-next-line
    const remainder = syllables.filter((topic) => {
      if (topic.id !== id) return topic;
    });
    setTopics([...remainder]);

    localStorage.setItem("syllables",JSON.stringify(remainder))
  };


  const deleteOutcome = (el,id) => {
    var parent = document.getElementById("outcome"+el)
    parent.remove()
    // eslint-disable-next-line
    const remainder = outcomes.filter((outcome) => {
      if (outcome !== id) return outcome;
    });
    setCheckSum([...remainder]);
  };


  const deleteInstructor = (id) => {
    // eslint-disable-next-line
    const remainder = instructorsCheckSum.filter((teacher) => {
      if (teacher !== id) return teacher;
    });
    setCheckSum([...remainder]);
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
    topics:[],
    outcomes:[],
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
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");

        setLoading(false);
      });
  };


  




  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

    let formData = new FormData();
        const allTopics = localStorage && JSON?.parse(localStorage.getItem("syllables"));
        let syllables = allTopics ? allTopics : [];

        const allCollaborators = localStorage && JSON?.parse(localStorage.getItem("instructors_list"));
        let collabo = allCollaborators ? allCollaborators : [];
        collabo.push(values.instructor_id)
       values.topics= syllables  //[...syllables];
       values.outcomes = outcomes;
       values.overall_grade_range = values.overall_grade_range.toString()
       values.course_thumbnail = file
       values.course_cover_image = file2
       values.instructor_ids = collabo           //instructorsCheckSum.push(values.instructor_id)

       console.log(instructorsCheckSum)

    if(!values.topics || !values.outcomes || !values.course_thumbnail || !values.course_cover_image){
         // toast.error("Form not completed");
        return false;
    }

    // console.log(topics, outcomes)
    try {
        

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
      formData.append("topics", JSON.stringify(values.topics))
      formData.append("outcomes[]", values.outcomes)
      formData.append("instructor_id", values.instructor_id) //lead instructor
       formData.append("instructors", JSON.stringify(values.instructor_ids))
      formData.append("Instructors", JSON.stringify(values.instructor_ids))
  

      console.log(formData)
       await createCourse(formData);
      toast.success("Course sucessfully created.");

       localStorage.setItem('syllables', JSON.stringify([]))
      localStorage.setItem('instructors_list', JSON.stringify([]))
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
    validationSchema: courseSchema,
    onSubmit: handleSubmit,
  });






  // const onEditorStateChange = editorState => {    
  //    console.log(editorState) 
  //   setEditorState({  editorState });  
  // };

  
 
  function uniqueSet(value, index, self) {
    return self.indexOf(value) === index;
  }

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
        console.log(instructorsCheckSum)
        localStorage.setItem("instructors_list",JSON.stringify(filtered))

        console.log(localStorage.getItem("instructors_list"))


    }

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


  let count =1;
 function  appendUserRow(id, user) {
            var html = `<div id=\"opt-row.` + id + "\" className=\"form-group row\">\n" +
                "           <div className=\"col-3\">\n" +
                "                <input className="form-control" required type=\"text\" className=\"form-control\" id=\"opt-type." + id + "\" name=\"opt-type." + id + "\" placeholder=\"subject\" value=\"" + user.type + "\">\n" +
                "            </div>\n" +
                "            <div className=\"col-3\">\n" +
                "                <input className="form-control" required type=\"text\" className=\"form-control\" id=\"opt-name." + id + "\" name=\"opt-name." + id + "\" placeholder=\"subject\" value=\"" + user.name + "\">\n" +
                "            </div>\n" +
                "            <div className=\"col-3\">\n" +
                "                <input className="form-control" required type=\"email\" className=\"form-control\" id=\"opt-email." + id + "\" name=\"opt-email." + id + "\" placeholder=\"subject\" value=\"" + user.email + "\">\n" +
                "            </div>\n" +
                "            <div className=\"col-2\">\n" +
                "                <input className="form-control" required type=\"number\" className=\"form-control\" id=\"opt-no." + id + "\" name=\"opt-no." + id + "\" placeholder=\"subject\" value=\"" + user.no + "\">\n" +
                "            </div>\n" +
                "             <button type=\"button\" onclick=\"delRow(" + id + ")\" className=\"btn btn-danger\">Delete</button>\n" +
                "        </div> <p style=\"color:darkblue\" onclick=\"addMoreRows(" + id + ")\"> Add more to this section</p><hr />";
            $("#form-placeholder").append(html);
        }


        window.addMoreRows = function(id){
           var html = `<div id=\"opt-row.` + id + "\" className=\"form-group row\">\n" +
                "           <div className=\"col-3\">\n" +
                "                <input className="form-control" required type=\"text\" className=\"form-control\" id=\"opt-type." + id + "\" name=\"opt-type." + id + "\" placeholder=\"subject\" >\n" +
                "            </div>\n" +
                "            <div className=\"col-3\">\n" +
                "                <input className="form-control" required type=\"text\" className=\"form-control\" id=\"opt-name." + id + "\" name=\"opt-name." + id + "\" placeholder=\"subject\" >\n" +
                "            </div>\n" +
                "            <div className=\"col-3\">\n" +
                "                <input className="form-control" required type=\"email\" className=\"form-control\" id=\"opt-email." + id + "\" name=\"opt-email." + id + "\" placeholder=\"subject\" >\n" +
                "            </div>\n" +
                "            <div className=\"col-2\">\n" +
                "                <input className="form-control" required type=\"number\" className=\"form-control\" id=\"opt-no." + id + "\" name=\"opt-no." + id + "\" placeholder=\"subject\" >\n" +
                "            </div>\n" +
                "             <button type=\"button\" onclick=\"delRow(" + id + ")\" className=\"btn btn-danger\">Delete</button>\n" +
                "        </div> <p style=\"color:darkblue\" onclick=\"addMoreRows(" + id + ")\"> Add more to this section</p><hr />";
            $("#form-placeholder").append(html);
        }



window.delRow =function(id) {
            var element = document.getElementById("opt-row." + id);
            element.parentNode.removeChild(element);
        }

  useEffect(() =>{
          $('.show').click(function() {
              $('.slideout').addClass('on');
            });

            $('.hide').click(function() {
              $('.slideout').removeClass('on');
            });



           


})

    const handleAddSection = () =>{
      // appendUserRow(count++, {
      //               type: "",
      //               name: "",
      //               email: "",
      //               no: ""
      //           })
  }













  
  



  return (
    <div>
      {/* Main Wrapper */}
      <div className="">
       
        <section >
          <Container>
         
              <Col lg="12">
                <section className="course">
                <br/><br/>
                  <div className="">
                    <h3  style={{fontSize:"22px", marginLeft:"10px"}}>Create Course </h3>
                  </div>
                  <form
                    id="form_registration"
                    name="simpleRTE"
                    
                    onSubmit={formik.handleSubmit}
                    className="form-horizontal" role="form"
                  >
                
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
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>Course Price</p>
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
                        <select  
                          style={{width:"100%",padding:"10px",marginLeft:"10px"}}
                          name="instructor_ids"
                          {...formik.getFieldProps("instructor_id")}
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
                        {formik.touched.instructor_lead &&
                        formik.errors.instructor_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.instructor_id}
                          </span>
                        ) : null}


                       

                      </p>

                      <p className="wrapper-edit text-editor" style={{width:"100%", marginTop:"20px"}}>
                       <p style={{fontSize:"12px", marginLeft:"10px"}}>Collaborators</p>
                        <select  
                        className="form-control"
                          name="instructor_ids"
                          {...formik.getFieldProps("intructor_ids")}
                          required
                          
                           multiple={true}
                          value={selectedInstructors} 
                          onChange={(e)=> {handleSelectedInstructors(e.target.selectedOptions)}}
                        >
                      
                          <option className="selected-options" selected={true}>-- Instructors --</option>
                          { instructorList.length > 0 &&
                            instructorList.map((teacher, i) => {
                              return (
                                <option className="selected-options" key={i} value={teacher?.id}>
                                  { teacher?.first_name + " "+  teacher?.last_name}
                                </option>
                              );
                            })}
                          
                        </select>
                        {formik.touched.intructor_ids &&
                        formik.errors.intructor_ids ? (
                          <span className="registration_input-msg">
                            {formik.errors.intructor_ids}
                          </span>
                        ) : null}


                        <ul className="topics">
                          {instructorsCheckSum.length > 0 &&
                            instructorsCheckSum.map((item, i) => {
                              return (
                                <li key={i} className="added-auto">
                                  {getInstructorNameById(item)} has been added as collaborator 
                                  <button style={{ borderRadius:"50%", backgroundColor:"red", float:"right"}}
                                    onClick={deleteInstructor.bind(this, item)}
                                  
                                  
                                  >X</button>
                                </li>
                              );
                            })} 
                          
                        </ul>

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
                       
                           {/*<div className="wrapper-edit text-editor">
                            
                            </div>*/}
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>
                          Course description
                        </p>
                         <textarea
                        
                          className="form-control"
                          cols="80"
                          style={{height:"200px", backgroundColor:"#fff"}}
                          placeholder="Course Description"
                          name="course_description"
                          {...formik.getFieldProps("course_description")}
                       
                          id="field1"
                        ></textarea>
                        {formik.touched.course_description &&
                        formik.errors.course_description ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_description}
                          </span>
                        ) : null}
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
                          {...formik.getFieldProps("course_overview")}
                  
                          id="field3"
                        ></textarea>

                        {formik.touched.course_overview &&
                        formik.errors.course_overview ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_overview}
                          </span>
                        ) : null}
                      </p>
                      {/*<p data-fullscreen className="fullScreen-2">*/}
                      <p>
                       
                        <p style={{fontSize:"12px", marginLeft:"10px"}}>
                          Prerequisites
                        </p>
                      
                         <textarea
                          className="form-control"
                          cols="80"
                          style={{height:"200px", backgroundColor:"#fff"}}
                          placeholder="Prerequisite Course"
                          name="prerequisite_course"
                          {...formik.getFieldProps("prerequisite_course")}
                         
                          id="field2"
                        ></textarea>

                        {formik.touched.prerequisite_course &&
                        formik.errors.prerequisite_course ? (
                          <span className="registration_input-msg">
                            {formik.errors.prerequisite_course}
                          </span>
                        ) : null}
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
                              return <li key={i} id={ `outcome${i}` } className="added-auto">{item}
                              <p  className="btn btn-primary" style={{ borderRadius:"50%",backgroundColor:"red"}}
                                    onClick={deleteOutcome.bind(this, `${i}`, item)}
                                  
                                  >X</p>

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

                        <button type="button" className="show">Add sections</button>

                        <ul className="topics">
                           {JSON.parse(localStorage.getItem('syllables')).length > 0 &&
                            JSON.parse(localStorage.getItem('syllables')).map((item, i) => {
                              return (
                                <li key={i} id={`topics${i}`} className="added-auto">
                                  {item.title}
                                  {/*<p style={{ borderRadius:"50%",backgroundColor:"red"}}
                                    onClick={deleteTopic.bind(this, `${i}`, item.id)}
                                  
                                  >X</p>*/}
                                </li>
                              );
                            })} 
                          {/*topics.length > 0 &&
                            topics.map((item, i) => {
                              return <li key={i}>{item}</li>;
                            })*/}
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
                  </form>
                </section>
              </Col>

              <div className="slideout" id="multipleSections">
                      <button type="button" className="hide">Close</button>
                      <p>Curriculum Sections</p>
                      <p>.</p>
                      <hr/>
                       
                        <div id="form-placeholder"></div>
                        <button onClick={handleAddSection} id="btn-add" type="button" className="btn btn-primary">Add Curriculum</button>
                        <hr/>
              </div>







         
          </Container>
        </section>

        {/* Footer 2 */}
      
      </div>
    </div>
  );
};

export default CreateCourse;
Working