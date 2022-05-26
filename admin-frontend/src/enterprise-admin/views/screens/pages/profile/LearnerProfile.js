import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FooterTwo from "../../components/FooterTwo";
//from "./styles/productDetails.js";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../../components/Loader/Loader";
import { getLearnerProfile } from "../../../../api/services/admin";
import toast from "react-hot-toast";
import "./avatar.css"
import "./tabnotifications.css"


import { activateLearner, deactivateLearner, deleteLearner, upgradeLearner } from "../../../../api/services/learner"

const LearnerProfiler = ({ auth: { user, user_roles }, match }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getLearnerProfile(match.params.id);
        setProfile({ ...res.data.data });

      } catch (err) {
        
        toast.error(`Error fetching user's details`);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);


  const handleActivate = async (id) => {
    try{
      await activateLearner(id)
       toast.success(`successfully activated user`)
       setTimeout(()=>{window.location.reload()},2000)
    }catch(err){
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );

    }
  }


   const handleDeactivate = async (id) => {
    try{
      await deactivateLearner(id)
       toast.success(`successfully deactivated user`)
       setTimeout(()=>{window.location.reload()},2000)
    }catch(err){
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );

    }
  }


   const handleDelete = async (id) => {
    try{
      await deleteLearner(id)
      toast.success(`successfully deleted user`)
      setTimeout(()=>{window.location.reload()},2000)
    }catch(err){
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );

    }
  }

  const handleUpgradeToInstructor = async (id) => {

     try{
      await upgradeLearner(id)
      toast.success(`successfully upgraded to instructor`)
      setTimeout(()=>{window.location.reload()},2000)
    }catch(err){
      toast.error(
        err?.response?.data?.message || `Error occured upgrading learner`
      );

    }

  }

  console.log(profile)

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper product-details-page">
        {/* Header 2 */}
       

        {/* Breadcroumb */}
        <BreadcrumbBox title="Profile" />

        {/* Product Details */}
        <section className="">
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
                          height="200"
                        width="200"
                        alt=""
                        className="circle card-box"
                        />
                      </div>
                       
                    </div>
                    <br/>

                    
                  </Col>


                  <br/>
                  <Col md="7">
                    <div className="product-information ">
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
                        <button type="submit" onClick={ (e) =>{
                            // e.preventDefault()
                            e.target.textContent ="Loading"
                            
                            handleActivate(profile.id)
                            e.target.textContent ="Activate"
                          }} className="cart-btn btn btn-success">
                          Activate
                        </button>


                       





                        <button type="submit" onClick={ (e) =>{
                           // e.preventDefault()
                           e.target.textContent ="Loading"
                           
                           handleDeactivate(profile.id)
                           e.target.textContent ="Deactivate"
                          }} className="cart-btn btn btn-info">
                            Deactivate
                        </button>

                        <button type="submit" onClick={ (e) =>{
                             // e.preventDefault()
                             e.target.textContent ="Loading"
                             handleDelete(profile.id)
                             e.target.textContent ="Delete"
                             
                             
                        }} className="cart-btn btn btn-danger">
                          Delete
                        </button>

                      </div> 
                    </div>
                  </Col>

                  <Col md="12">
                    <div className="product-tab">
                      <Table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td>Username</td>
                            <td className="pull-right">{`${profile?.username}`}</td>
                          </tr>
                          <tr>
                            <td>Fisrt Name</td>
                            <td className="pull-right">{`${profile?.first_name}`}</td>
                          </tr>
                          <tr>
                            <td>Last Name</td>
                            <td className="pull-right">{`${profile?.last_name}`}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td className="pull-right">{`${profile?.email}`}</td>
                          </tr>
                          <tr>
                            <td>Gender</td>
                            <td className="pull-right">{`${profile?.learner_profile?.gender}`}</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td className="pull-right">{`${profile?.phone_number}`}</td>
                          </tr>
                          <tr>
                            <td>Country</td>
                            <td className="pull-right"></td>
                          </tr>
                          <tr>
                            <td>Employment Status</td>
                            <td className="pull-right">{`${profile?.learner_profile?.employment_status}`}</td>
                          </tr>
                          <tr>
                            <td>Education Level</td>
                            <td className="pull-right">{`${profile?.learner_profile?.education_level}`}</td>
                          </tr>
                          <tr>
                            <td>Degree Obtained</td>
                            <td className="pull-right"></td>
                          </tr>
                          <tr>
                            <td>Date of Birth</td>
                            <td className="pull-right"></td>
                          </tr>
                          <tr>
                            <td>Marital Status</td>
                            <td className="pull-right">{`${profile?.learner_profile?.marital_status}`}</td>
                          </tr>
                          <tr>
                            <td>LinkedIn</td>
                            <td className="pull-right"></td>
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
              <p>No Details for this user yet</p>
            )}
          </Container>
        </section>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </>
  );
};

LearnerProfiler.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(LearnerProfiler);
