import React, { useEffect, useState } from "react";
import { Nav, Container, Row, Col, Tab } from "react-bootstrap";

//import AdminNavBar from "../../components/Navbar/AdminNavbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import InstructorBox from "../../components/InstructorBox";
import Footer from "../../components/Footer";
// import {  getCourses } from '../../../../api/services/course';


import {  getDashboardInfo } from "../../../../api/services/dashboard"
import PropTypes from "prop-types";
import { connect } from "react-redux";


import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
//from "./learners/styles/product.js";
import { getCourses } from "../../../../api/services/admin.js";


import Active from "./courses/active";
import GridSelector from "./courses/grid"
// import Loader from "../../components/Loader/Loader";
import CreateCourseForm from "./actions/create/CreateCourseForm"

import { useHistory } from "react-router-dom";



const AdminCourses = () => {
  const [activeCourses, setActiveCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Approved");
  const [createClicked, setCreateClicked] = useState(false)
  let history = useHistory();

  useEffect(() => {
    fecthAdminCourses();
  }, []);

  const filterCourses = (id) => {
    let cat = parseInt(id);
    switch (cat) {
      case -1:
        setCategory("Deactivated");
        break;
      case 0:
        setCategory("Pending");
        break;
      case 1:
        setCategory("Approved");
        break;
      default:
        break;
    }
    setActiveCourses(
      courses.filter((course) => {
        return parseInt(course.status) === cat;
      })
    );
  };

  const fecthAdminCourses = async () => {
    try {
      let allCourses = await getCourses();
      console.log(allCourses.data.data.courses)
      setCourses([...allCourses.data.data.courses]);
      setActiveCourses(
        allCourses.data.data.courses.length > 0 &&
          allCourses.data.data.courses.filter((course) => {
            return parseInt(course.status) === 1;
          })
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );
    }
    setLoading(false);
  };


  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Courses  </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
            <li className="breadcrumb-item active" aria-current="page">view pending courses</li>
          </ol>
        </nav>
      </div>
      <div className="row">
        </div>
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">List of available courses</h4>
           
              <Container>
          <Row>
            <Col lg="12">
              <div className="course-tab-list"   style={{height:"auto"}}>
              

              {createClicked === false ? (<button  className="btn btn-primary" style={{float:"right",marginTop:"30px"}} onClick={() =>{
                     
                      setCreateClicked(true)
                     }}>Create Course</button> ) : (

                         <button  className="btn btn-primary" style={{float:"right", marginTop:"30px"}} onClick={() =>{
                     
                      setCreateClicked(false)
                     }}>View List</button>
                     ) }
                     <br/> <br/>


              {createClicked === true ? ( <div><br/><br/><CreateCourseForm /></div>) : (
                   
                 <Tab.Container defaultActiveKey="active">
                  <br/> <br/>
                  <Nav className="myClass">
                    <Nav.Item onClick={filterCourses.bind(this, 1)}>
                      <Nav.Link eventKey="active">Active</Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item onClick={filterCourses.bind(this, 0)}>
                      <Nav.Link eventKey="pending">Pending</Nav.Link>
                    </Nav.Item>

                    <Nav.Item onClick={filterCourses.bind(this, -1)}>
                      <Nav.Link eventKey="deactivated">Deactivated</Nav.Link>
                    </Nav.Item>

                    <Nav.Item onClick={filterCourses.bind(this, 1)}>
                      <Nav.Link eventKey="featured">Featured</Nav.Link>
                    </Nav.Item>



                  </Nav>

                  


                  <Tab.Content>
                    <Tab.Pane eventKey="active" className="active-tab">
                      <Row>
                        <Active
                          category={"Active"}
                          loading={loading}
                          activeCourses={activeCourses}
                        />
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="pending" className="active-tab">
                      <Row>
                        <Active
                          category={"Pending"}
                          loading={loading}
                          activeCourses={activeCourses}
                        />

                        


                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="deactivated" className="active-tab">
                      <Row>
                        <Active
                          category={"Deactivated"}
                          loading={loading}
                          activeCourses={activeCourses}
                        />
                      </Row>
                    </Tab.Pane>


                    <Tab.Pane eventKey="featured" className="active-tab">
                      <Row>
                        <GridSelector
                          category={"Featured"}
                          loading={loading}
                          activeCourses={activeCourses}
                        />
                      </Row>
                    </Tab.Pane>


                  </Tab.Content>
                </Tab.Container>


                ) }
               {/*  */}
              </div>
            </Col>
          </Row>
        </Container>
            </div>
          </div>
        </div>
        
    
    </div>
  )

  }

  export default AdminCourses

// export class BasicTable extends Component {
//     constructor(props){
//         super(props)
//         this.state={
//           courses:[],
//           loading:true,
         
//         }
//       }
   
     
   
//      componentDidMount(){
//        let that = this;
//        (async function loadContent() {
   
//          try{
         
//            let res = await getCourses();
//            //console.log(res.data.data.courses)
   
//            that.setState({
          
//              courses: [...res.data.data.courses],
          
//              loading:false,
         
//            })
   
//            //everything about instructors fetch is not working
//          }catch(err){
//            //console.log(err)
//            toast.error(
//            err?.response?.data?.message || `Error occured fetching active courses`
//          );
   
//          }
//          //setLoading(false);
//          that.setState({  loading:false})
//        })();
//      }
//   render() {
//     const  {  loading,
//         courses 
//     } = this.state
//     return (
//       <div>
//         <div className="page-header">
//           <h3 className="page-title"> Courses  </h3>
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
//               <li className="breadcrumb-item active" aria-current="page">view pending courses</li>
//             </ol>
//           </nav>
//         </div>
//         <div className="row">
//           </div>
//           <div className="col-lg-12 grid-margin stretch-card">
//             <div className="card">
//               <div className="card-body">
//                 <h4 className="card-title">List of available courses</h4>
             
//                 <div className="table-responsive">
//                   <table className="table table-striped">
//                     <thead>
//                       <tr>
//                         <th> S/NO </th>
//                         <th> Course code </th>
                     
//                         <th> Course name </th>
//                         <th> Action </th>
//                       </tr>
//                     </thead>
//                     <tbody>

//                     {loading ? (
//                   <Loader width="70" />
//                 ) : courses?.length ? (
//                 <>
//                 {
//                   courses?.length && courses?.map( ( (course,index) =>{
//                       return (
                      


//                      <tr>
//                         <td className="py-1" key={course?.course_code}>
//                           {index+1}
//                         </td>
//                         <td> {course.course_code}</td>
                       
//                         <td> {course?.course_name}</td>
//                         <td> Edit </td>
//                       </tr>
                      

//                       )
//                   }))
//                             }
//         </>

//       ) :(
//                   <p>No Details Found .</p>
//           )}
                 
                    
                     
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
          
      
//       </div>
//     )
//   }
// }

// export default BasicTable
