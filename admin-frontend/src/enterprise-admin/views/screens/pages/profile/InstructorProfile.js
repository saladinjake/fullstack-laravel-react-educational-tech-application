import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../../components/Footer";
//from "./styles/productDetails.js";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../../components/Loader/Loader";
import { getInstructorProfile } from "../../../../api/services/admin";
import toast from "react-hot-toast";
import { getActivated, getDeactivated , getDeleted } from "../../../../api/services/instructor";

const InstructorProfiler = ({ auth: { user, user_roles }, match }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getInstructorProfile(match.params.id);
        setProfile({ ...res.data.data });
      } catch (err) {
        toast.error(`Error fetching instructor's details`);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  const handleActivate = async (id) =>{
    console.log("clicked"+ id)
     try {
       await getActivated(id)
        toast.success(`Activation Successful`);
               setTimeout(()=>{window.location.reload()},2000)
    } catch (err) {
        toast.error(`Error fetching instructor's details`);
      }
  }

  const handleDeactivate = async (id) =>{
    try {
       await getDeactivated(id)
        toast.success(`Deactivation Successful`);
        setTimeout(()=>{window.location.reload()},2000)

    } catch (err) {
        toast.error(`Error fetching instructor's details`);
      }
  }

  const handleDelete = async (id) =>{
    try {
       await getDeleted(id)
        toast.success(`Delete Successful`);
               setTimeout(()=>{window.location.reload()},2000)

    } catch (err) {
        toast.error(`Error fetching instructor's details`);
      }
  }

  // console.log(profile)
  // let course = ""
  // let institutions = ""
  // if(profile?.instructor_profile?.niche_courses!==null){
  //     course  = JSON.parse(profile?.instructor_profile?.niche_courses)
  //     course = course.join(" ");
  //     institutions = JSON.parse(profile?.instructor_profile?.previous_institutions)
  //     institutions = institutions.join("")
  // }


  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper product-details-page">
        {/* Header 2 */}
    

        {/* Breadcroumb */}
        <BreadcrumbBox title="Profile" />

        {/* Product Details */}
        <section className="product-details-area">
          <Container>
            {loading ? (
              <Loader width="70" />
            ) : Object.entries(profile).length !== 0 ? (
              <Fragment>
                <Row>
                  <Col md="5">
                    <div className="product-slider">
                      <div className="slider-item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/assets/images/product-01.jpg`
                          }
                          style={{width:"100px",height:"100px"}}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </Col>

                  <Col md="7">
                    <div className="product-information">
                      <div className="product-title">
                        <h4>{`${profile?.first_name}  ${profile?.last_name}`}</h4>
                      </div>
                      <div className="product-rating d-flex">
                        <div className="review-num">
                          {/* <Link to={process.env.PUBLIC_URL + "/"}>
                          </Link> */}
                        </div>
                      </div>
                      <div className="product-desc">
                        <p>{profile.email}</p>
                      </div>

                      <div className="product-cart-wh-com-btn">
                        <button
                         onClick={ (e) => {
                            
                            handleDeactivate(profile.id)
                            
                         }}
                          className="btn btn-danger"
                        >
                          Deactivate
                        </button>
                        

                        
                        <button
                        onClick={(e)=>{
                          
                           handleActivate(profile.id)
                           
                         }}
                         
                          className=" btn btn-primary"
                        >
                          Activate
                        </button>

                        <button
                         onClick={ (e) => {
                            
                            handleDelete(profile.id)
                            
                         }}
                          className="btn btn-danger"
                        >
                          Delete 
                        </button>

                      </div> 
                    </div>
                  </Col>

                  <Col md="12">
                    <div className="product-tab">
                      <Table className="table table-bordered">
                        <tbody>
                        
                         

                          {/*<tr>
                            <td>Username</td>
                            <td>{`${profile?.username}`}</td>
                          </tr>*/}
                          <tr>
                            <td>Fisrt Name</td>
                            <td>{`${profile?.first_name}`}</td>
                          </tr>

                         
                          <tr>
                            <td>Last Name</td>
                            <td>{`${profile?.last_name}`}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{`${profile?.email}`}</td>
                          </tr>

                          <tr>
                            <td>Course Strengths(Courses instructor can teach)</td>
                            <td>{`${profile?.instructor_profile?.niche_courses}`}</td>
                          </tr>


                          <tr>
                            <td>Institutions: (Organizations where instructor works both past and present)</td>
                            <td>{`${profile?.instructor_profile?.previous_institutions}`}</td>
                          </tr>


                          <tr>
                            <td>Gender</td>
                            <td>{`${profile?.instructor_profile?.gender}`}</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td>{`${profile?.phone_number}`}</td>
                          </tr>
                          <tr>
                            <td>Employment Status</td>
                            <td>{`${profile?.instructor_profile?.employment_status}`}</td>
                          </tr>
                          <tr>
                            <td>Education Level</td>
                            <td>{`${profile?.instructor_profile?.education_level}`}</td>
                          </tr>
                          <tr>
                            <td>Degree Obtained</td>
                            <td>{`${profile?.instructor_profile?.degree_obtained}`}</td>
                          </tr>
                          <tr>
                            <td>Date of Birth</td>
                            <td>{`${profile?.instructor_profile?.instructor_profile}`}</td>
                          </tr>
                          <tr>
                            <td>Marital Status</td>
                            <td>{`${profile?.instructor_profile?.marital_status}`}</td>
                          </tr>
                          <tr>
                            <td>LinkedIn</td>
                            <td>{`${profile?.instructor_profile?.linkedin_url}`}</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              </Fragment>
            ) : (
              <p>No Details for this instructor yet</p>
            )}
          </Container>
        </section>

        <Footer />
      </div>
    </>
  );
};

InstructorProfiler.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(InstructorProfiler);
