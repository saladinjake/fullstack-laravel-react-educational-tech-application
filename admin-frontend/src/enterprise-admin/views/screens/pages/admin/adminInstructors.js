import React, { useEffect, useState } from "react";
import { Nav, Container, Row, Col, Tab } from "react-bootstrap";
import InstructorNavBar from "components/Navbar/AdminNavbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./learners/styles/product.js";
import { getInstructors } from "services/admin.js";
import toast from "react-hot-toast";

import { getActiveInstructors, getPendingInstructors } from "services/instructor"

import Active from "./instructors/active";
import  UpGradeUserForm from "./UpGradeUserForm"


import { init, send } from "emailjs-com";

import { Link } from "react-router-dom";


init("user_G3PO2EisAWs0dlZT1qu0g");

const AdminInstructors = () => {
  const [instructors, setInstructors] = useState([]);
    const [instructorsAll, setInstructorsAll] = useState([]);
  const [pendingInst, setPendingInstructor] = useState([])
  const [loading, setLoading] = useState(true);

   const [createClicked, setCreateClicked] = useState(false)
  

  const fetchInstructoprs = async () => {
    
    let instrAll =[];
    let PendingInst = [];
    let ActiveInst =[]

    try{
      instrAll = await getInstructors()
       console.log(instrAll.data.data);
      setInstructorsAll([...instrAll.data.data])

       // PendingInst =  getPendingInstructors();
       // console.log([...PendingInst.data])


    }catch(err){
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );
    }

     

    
    setLoading(false);
  };

  useEffect(() => {
    fetchInstructoprs();
  }, []);
  let activeInstr = []; let pendingInstr =[]; let deactivatedInstr= []
  activeInstr = instructorsAll.filter( inst => inst.instructor_profile.status=="1")
  pendingInstr = instructorsAll.filter(inst => inst.instructor_profile.status=="0")
  deactivatedInstr = instructorsAll.filter(inst => inst.instructor_profile.status=="-1")
  console.log(instructorsAll)








   useEffect(() => {



   
      
  });


     


  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper product-page">
        {/* Header 2 */}
        <InstructorNavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Instructors" />

        {/* New Poducts Area */}
        <Container>
          <Row>
            <Col lg="12">


             <div >

              {createClicked === false ? (<button  className="btn btn-primary" style={{float:"right",marginTop:"30px"}} onClick={() =>{
                     
                      setCreateClicked(true)
                     }}>Upgrade</button> ) : (

                         <button  className="btn btn-primary" style={{float:"right", marginTop:"30px"}} onClick={() =>{
                     
                      setCreateClicked(false)
                     }}>View List</button>
                     ) }
                     <br/> <br/>

              </div>



              {createClicked === true ? ( <div><br/><br/><UpGradeUserForm /></div>) : (

              <div className="course-tab-list" style={{height:"2500px"}}>
                <Tab.Container defaultActiveKey="all">
                  <Nav className="flex-column">
                  <Nav.Item>
                      <Nav.Link eventKey="all">All </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="active">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="pending">Pending</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="deactivated">Deactivated</Nav.Link>
                    </Nav.Item>

                    
                  </Nav>
                  <Tab.Content>

                  <Tab.Pane eventKey="all" className="active-tab">
                      <Row>
                        <Active loading={loading} instructors={instructorsAll} />
                      </Row>
                    </Tab.Pane>

                  <Tab.Pane eventKey="active" className="active-tab">
                      <Row>
                        <Active loading={loading} instructors={activeInstr} />
                      </Row>
                    </Tab.Pane>

                    
                    <Tab.Pane eventKey="pending" className="active-tab">
                      <Row>
                        <Active loading={loading} instructors={pendingInstr} />
                      </Row>
                    </Tab.Pane>

                      <Tab.Pane eventKey="deactivated" className="active-tab">
                      <Row>
                        <Active loading={loading} instructors={deactivatedInstr} />
                      </Row>
                    </Tab.Pane>



                   
                  </Tab.Content>
                </Tab.Container>
              </div>

              )}
            </Col>
          </Row>
        </Container>

        {/* <Footer /> */}
        <Footer />
      </div>
    </>
  );
};

export default AdminInstructors;
