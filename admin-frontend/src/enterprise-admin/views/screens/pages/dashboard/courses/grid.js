import React, { useEffect , useState} from "react"
import $ from "jquery"

import toast from "react-hot-toast";
import { sendFeaturedCourses } from "../../../../../api/services/course"

const GridSelector = ({ activeCourses}) => {
    const [featuredCourses, setFeaturedCourses] = useState([])
    const [count, setCount] = useState(1);
     const [loading, setLoading] = useState(false);
    const maxCount = 7
    let iterator = 1;

    const handleSelect = (courseId) => {
    	document.getElementById("coursedeSelected" + courseId).style.display="block"
    	document.getElementById("courseSelected" + courseId).style.display="none"


    	  // if(count <=8){
             setCount(iterator++)
             setFeaturedCourses([...featuredCourses,courseId])
             console.log(featuredCourses)
          // }else{
          // 	 toast.error( `Maximum featured course is set to 8`);
          // }
    }

    const handledeSelect = (courseId) =>  {
       setCount(iterator--)
        document.getElementById("courseSelected" + courseId).style.display="block"
        document.getElementById("coursedeSelected" + courseId).style.display="none"

    	let remainder = featuredCourses.filter(course =>{
	       return course !=  courseId
        }) 
        setFeaturedCourses([...remainder])
        console.log(featuredCourses)
    }


    const handleSubmit = async () =>{
         setLoading(true);

         if(featuredCourses.length> 0){

            try {
                  await sendFeaturedCourses({courses: featuredCourses})
                  toast.success(`Featured Courses created`);
                 setTimeout(() => { window.location.reload()},2000) 
                } catch (err) {
                  toast.error(
                    err?.response?.data?.message || `Error occured submitting data`
                  );
                }

         }else{

            toast.error(
                     `Select at least one course to make a featured course`
                  );

         }
    	
       setLoading(false);

    }



	useEffect( () => {
		$(document).ready(function(){
				$(".box").on('click',function(){		
					    var childEl = $(this).children()[0];

					    if(iterator <=7){

						    // if($(childEl).hasClass("activeset")){
						    //  	$(childEl).removeClass("activeset");
						    //  	setFeaturedCourses([...featuredCourses.filter(course =>{
	         //                           return course !=  childEl.id
						    //  	     }) 
						    //     ])

						        

						    //     setCount(iterator--)
					     // 	}
						    // else{
							   //  $(childEl).addClass("activeset");
							   //  setFeaturedCourses([...featuredCourses, childEl.id])
							   //  setCount(iterator++)
							    

						    // }

					    }
						
				     	
				});
           });

		console.log(featuredCourses,count)
	})


	return(
       <div className="featured">

          <div className="container">
			<h6> Featured Courses </h6>
            <p> Select  top  courses </p>




            {activeCourses.length > 0 && activeCourses.map((course) =>{
                                       return (
                                        <a href="javascript:;" class="box" id={course.id} style={{margin:"10px", marginBottom:"20px"}}> 

                                            <div className="DIVCARD"  style={{margin:"10px", marginBottom:"20px"}} >
                                                  <div className="divHEADER" style={{


                                                    background:"url(" + `${course.course_cover_image}` + ")",
                                                  }}>

                                                      <div className="cardHeaderHidden">
                                                          <div className="dateHEADER">
                                                              <div className="cardHeaderDay">14</div>
                                                              <div className="cardHeaderMonth">June</div>
                                                              <div className="cardHeaderYear">2016</div>
                                                          </div>
                                                      </div>   
                                                  </div>
                                                  
                                                  <div className="mainBODY">
                                                      <div className="bodyHeader">
                                                          <div className="bannerBODY">{course.course_name}</div>  
                                                          <br/>
                                                          <h1>A course By {course.instructor.first_name}  {course.instructor.last_name}</h1>
                                                              <p className="bodySentence">
                                                                  <h2></h2>
                                                              </p>
                                                      </div>
                                                  </div>
                                                     
                                                      <p className="BodyDescription">
                                                      <div onClick={(e) =>{
                                                         e.preventDefault() 
                            handleSelect(course.id)
                            
                         }} className="btn btn-success" id={"courseSelected" + course.id} >Select</div>
                         

                         <div onClick={(e) => {
                            e.preventDefault()
                            handledeSelect(course.id)
                            
                         }} className="btn btn-danger" style={{display:"none"}} id={"coursedeSelected" + course.id} >Deselect</div>
                         
                                                      </p>

                                                 
                                                  <div className="divFOOTER">
                                                      <i className="icon icon-time"></i>{course.learning_style}
                                                      <i className="icon icon-comment"></i>Language : {course.language.english}
                                                  </div>
                                        </div>

                                        </a>


                                       )

                                  })}


            
            <div style={{clear:"both"}}><br/><br/><br/><br/>
            <button  className="btn btn-info" onClick={()=>{
            	handleSubmit()
            }}>{loading === true ? ( "Loading..." ) : ("Save As Feature Course") }</button>
           </div>            
</div>

</div>

		)
}


export default GridSelector