import React, { useEffect, useState } from "react";
import { Nav, Container, Row, Col, Tab } from "react-bootstrap";

import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./learners/styles/product.js";
import { getCoursesPaymentHistory } from "../../../../api/services/orders";
import toast from "react-hot-toast";

import Active from "./courses/active";
import Loader from "../../components/Loader/Loader";
import CreateProgramForm from "./actions/create/CreateProgramForm"

import { useHistory } from "react-router-dom";

const AdminBusiness = () => {

    const [activeCourses, setActiveCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Approved");
  const [createClicked, setCreateClicked] = useState(false)
  let history = useHistory();

  useEffect(() => {
    fetchAdminPayments();
  }, []);

  const filterCourses = (id) => {
    let cat = parseInt(id);
    switch (cat) {
      case -1:
        setCategory("All");
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

  const fetchAdminPayments = async () => {
    try {
      let allCourses = await getCoursesPaymentHistory();
      console.log(allCourses.data.data.courses)
      setCourses([...allCourses.data.data.bundles]);
      setActiveCourses(
        allCourses.data.data.bundles.length > 0 &&
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
          <h3 className="page-title"> Payments </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
              <li className="breadcrumb-item active" aria-current="page">view pending program bundles</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          </div>
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Program bundles</h4>
                <Container>
          <Row>
            <Col lg="12">
              <div className="course-tab-list"   style={{height:"4600px"}}>
              

              {createClicked === false ? (<button  className="btn btn-primary" style={{float:"right",marginTop:"30px"}} onClick={() =>{
                     
                      setCreateClicked(true)
                     }}>Make Payments</button> ) : (

                         <button  className="btn btn-primary" style={{float:"right", marginTop:"30px"}} onClick={() =>{
                     
                      setCreateClicked(false)
                     }}>View List</button>
                     ) }
                     <br/> <br/>


              {createClicked === true ? ( <div><br/><br/><CreateProgramForm /></div>) : (
                   
                 <Tab.Container defaultActiveKey="active">
                  <br/> <br/>
                  <Nav className="myClass">
                    <Nav.Item onClick={filterCourses.bind(this, 1)}>
                      <Nav.Link eventKey="active">All Payments</Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item onClick={filterCourses.bind(this, -1)}>
                      <Nav.Link eventKey="deactivated">Pending</Nav.Link>
                    </Nav.Item>

                    <Nav.Item onClick={filterCourses.bind(this, 0)}>
                      <Nav.Link eventKey="pending">Successful</Nav.Link>
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

     
   );
 };
 
 export default AdminBusiness;

 


