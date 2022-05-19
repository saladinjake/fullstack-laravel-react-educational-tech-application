import React, { Component } from 'react';
// import { Line, Doughnut, Bar, Radar } from 'react-chartjs-2';
import { Line, Bar, Radar } from 'react-chartjs-2';
import {Link } from "react-router-dom"
import { ProgressBar, Dropdown } from 'react-bootstrap';
import GaugeChart from 'react-gauge-chart';
import { VectorMap } from "react-jvectormap"




//import AdminNavBar from "../../components/Navbar/AdminNavbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import InstructorBox from "../../components/InstructorBox";
import Footer from "../../components/Footer";
import {  getCourses } from '../../../../api/services/course';


import {  getDashboardInfo } from "../../../../api/services/dashboard"
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getLearners } from "../../../../api/services/admin.js";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

import { getDeactivatedLearners, getActiveLearners } from "../../../../api/services/learner"


import { getInstructors } from "../../../../api/services/admin.js";


// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';

export class Dashboard extends Component {

   constructor(props){
     super(props)
     this.state={
       courses:[],
       loading:true,
       summary:{},
       learners:[],
       instructors:[]
     }

     
   }

  

  componentDidMount(){
    let that = this;
    (async function loadContent() {

      try{
          
          let dashboard = await getDashboardInfo()
        //console.log(dashboard.data.data)
   

        let res = await getCourses();
        //console.log(res.data.data.courses)
     

        let verifiedLearners = await getActiveLearners();
        //console.log(verifiedLearners.data.data.data)

        let verifiedInstructors = await getInstructors()
       // console.log(verifiedInstructors.data.data)

        that.setState({
          learners:[...verifiedLearners.data.data.data],
          courses: [...res.data.data.courses],
          summary:dashboard.data.data,
          loading:false,
          instructors:[...verifiedInstructors.data.data]
        })

        //everything about instructors fetch is not working
      }catch(err){
        //console.log(err)
        toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );

      }
      //setLoading(false);
      that.setState({  loading:false})
    })();
  }

  toggleProBanner() {
    document.querySelector('.proBanner').classList.toggle("hide");
  }
  render () {

    const  {  learners,loading,
       courses ,instructors,
      summary} = this.state
    return (
      <div>
        <div className="row proBanner">
          <div className="col-12">
            <span className="d-flex align-items-center purchase-popup">
              <p>Manage courses section</p>
              <Link  to="/admin/dashboard/courses" className="btn purchase-button ml-auto">GO to course management</Link>

              <i className="mdi mdi-close bannerClose" onClick={this.toggleProBanner}></i>
            </span>
          </div>
        </div>
        <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Dashboard</h4>
              <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                <ul className="quick-links">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Registered users</a></li>
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Instructors</a></li>
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Courses</a></li>
                </ul>
                <ul className="quick-links ml-auto">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Site Settings</a></li>
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Enrolled orders</a></li>
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Payment Transactions</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="page-header-toolbar">
              
             
             
            </div>
          </div>
        </div>
        <div className="row">
           

        <div className="d-flex py-2 border-bottom card col-md-3 m-3" >
                        <div className="wrapper">
                          <small className="text-muted">Total Learners</small>
                          <p className="font-weight-semibold text-gray mb-0">count( 
                          
                          {loading ? (
                  <Loader width="70" />
                ) : courses?.length ? (
                <>
                   {summary?.total_learners} 
                </>

               ) :(
                  <p>No Details Found .</p>
               )}
                         
                          )</p>
                        </div>
                        <small className="text-muted ml-auto btn btn-default">View </small>
                      </div>

                      <div className="d-flex py-2 border-bottom card col-md-3 m-3" >
                        <div className="wrapper">
                          <small className="text-muted">Total Instructors</small>
                          <p className="font-weight-semibold text-gray mb-0">count (

                          {loading ? (
                  <Loader width="70" />
                ) : courses?.length ? (
                <>
                   {summary?.total_instructors} 
                </>

               ) :(
                  <p>No Details Found .</p>
               )}
                         
                          
                           ) </p>
                        </div>
                        <small className="text-muted ml-auto btn btn-default">View </small>
                      </div>

                      <div className="d-flex py-2 border-bottom card col-md-3 m-3" >
                        <div className="wrapper">
                          <small className="text-muted">Total Courses</small>
                          <p className="font-weight-semibold text-gray mb-0">count (
                          
                       

                          
                          {loading ? (
                  <Loader width="70" />
                ) : courses?.length ? (
                <>
                   {summary?.total_courses} 
                </>

               ) :(
                  <p>No Details Found .</p>
               )}
                          
                          )</p>
                        </div>
                        <small className="text-muted ml-auto btn btn-default">View </small>
                      </div>
                     
        </div>
        <br/>
        <div className="row">


        <div className="d-flex py-2 border-bottom card col-md-3 m-3" >
                        <div className="wrapper">
                          <small className="text-muted">Total Business</small>
                          <p className="font-weight-semibold text-gray mb-0">count (
                          
                          


                          {loading ? (
                  <Loader width="70" />
                ) : courses?.length ? (
                <>
                   {summary?.total_businesses} 
                </>

               ) :(
                  <p>No Details Found .</p>
               )}
                          
                          
                           ) </p>
                        </div>
                        <small className="text-muted ml-auto btn btn-default">View </small>
                      </div>

                      <div className="d-flex py-2 border-bottom card col-md-3 m-3" >
                        <div className="wrapper">
                          <small className="text-muted">Unverified Learners</small>
                          <p className="font-weight-semibold text-gray mb-0">count( 
                       
                          
                          {loading ? (
                  <Loader width="70" />
                ) : courses?.length ? (
                <>
                   {summary?.pending_learners} 
                </>

               ) :(
                  <p>No Details Found .</p>
               )}
                          
                          )</p>
                        </div>
                        <small className="text-muted ml-auto btn btn-default">View </small>
                      </div>

                      <div className="d-flex py-2 border-bottom card col-md-3 m-3" >
                        <div className="wrapper">
                          <small className="text-muted">unpublished courses</small>
                          <p className="font-weight-semibold text-gray mb-0">count (
                          
                      

                          {loading ? (
                  <Loader width="70" />
                ) : courses?.length ? (
                <>
                   {summary?.pending_courses} 
                </>

               ) :(
                  <p>No Details Found .</p>
               )}
                          
                           ) </p>
                        </div>
                        <small className="text-muted ml-auto btn btn-default">View </small>
                      </div>


                      
          
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card" >
            <div className="card" style={{height:"400px", overflowY:"scroll"}}>
              <div className="card-body" >
                <h4 className="card-title mb-0">Course Lists</h4>
                <hr/>

                {loading ? (
                  <Loader width="70" />
                ) : courses?.length ? (
                <div>
                {
                  courses?.length && courses?.map((course=>{
                      return (
                        <div className="d-flex py-2 border-bottom" key={course?.course_code}>
                        <div className="wrapper">
                          <small className="text-muted">{course.course_code}</small>
                          <p className="font-weight-semibold text-gray mb-0">C{course?.course_name}</p>
                        </div>
                        <small className="text-muted ml-auto btn btn-default">View </small>
                      </div>

                      )
                  }))
                            }
        </div>

      ) :(
                  <p>No Details Found .</p>
          )}
                 
                
              


               
                <a className="d-block mt-5 btn btn-default" href="!#" onClick={evt =>evt.preventDefault()}>View All courses</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 grid-margin stretch-card" >
            <div className="card" style={{height:"400px", overflowY:"scroll"}}>
              <div className="card-body">
                <div className="d-flex justify-content-between pb-3">
                  <h4 className="card-title mb-0">Active Learners</h4>
                  <p className="mb-0 text-muted">Manage users</p>
                </div>
                <ul className="timeline" >

                {loading ? (
                  <Loader width="70" />
                ) : learners?.length ? (
                <div>
                {
                  learners?.length && learners?.map((users=>{
                      return (
                        <li className="timeline-item">
                    <p className="timeline-content" style={{margin:"10px"}}><a href="!#" onClick={evt =>evt.preventDefault()}>{users.first_name + " " + users.last_name }</a></p>
                    <p>{users?.email}</p>
                   
                    <p className="event-time">View Profile</p>
                  </li>

                      )
                  }))
                            }
        </div>

      ) :(
                  <p>No Details Found .</p>
          )}
                 
                 
                </ul>
                <a className="d-block mt-3" href="!#" onClick={evt =>evt.preventDefault()}>Show all</a>
              </div>
            </div>
          </div>
          <div className="col-md-12 grid-margin stretch-card"  >
            <div className="card">
              <div className="card-body" style={{height:'400px', overflowY:"scroll"}}>
                <h4 className="card-title mb-0">Instructors</h4>
                <div className="table-responsive">
                  <table className="table table-stretched" >
                    <thead>
                      <tr>
                        <th>Firstname</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody >

                    {loading ? (
                  <Loader width="70" />
                ) : instructors?.length ? (
                <div>
                {
                  instructors?.length && instructors?.map((users=>{
                      return (
                    

<tr>
<td>
  <p className="mb-1 text-dark font-weight-medium">{users.first_name }</p><small className="font-weight-medium"></small>
</td>
<td className="font-weight-medium">{users.first_name + " " + users.last_name }</td>
<td className="text-success font-weight-medium">{users?.email}</td>
<td className="text-success font-weight-medium"> <p className="event-time">View Profile</p></td>
</tr>

                      )
                  }))
                            }
        </div>

      ) :(
                  <p>No Details Found .</p>
          )}
                 
                      
                     
                    </tbody>
                  </table>
                </div>
                <a className="d-block mt-3" href="!#" onClick={evt =>evt.preventDefault()}>Show all</a>
              </div>
            </div>
          </div>
        </div>
        
      </div> 
    );
  }
}
export default Dashboard;