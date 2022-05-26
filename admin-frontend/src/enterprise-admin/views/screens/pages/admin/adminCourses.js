import React, { useEffect, useState } from "react";
import { Nav, Container, Row, Col, Tab } from "react-bootstrap";
import InstructorNavBar from "components/Navbar/AdminNavbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./learners/styles/product.js";
import { getCourses } from "services/admin.js";
import toast from "react-hot-toast";

import Active from "./courses/active";
import GridSelector from "./courses/grid"
import Loader from "components/Loader/Loader";
import CreateCourseForm from "./CreateCourseForm"

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
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper product-page">
        {/* Header 2 */}
        <InstructorNavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="My Courses" />

        {/* New Poducts Area */}
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
                  <Nav className="flex-column">
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


     {/* <CreateCourseForm />*/}

        {/* <Footer /> */}
      
      </div>
    </>
  );
};

export default AdminCourses;
