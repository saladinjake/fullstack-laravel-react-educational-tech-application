import React, { Component } from 'react'
// import { ProgressBar } from 'react-bootstrap';

//import AdminNavBar from "../../components/Navbar/AdminNavbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import InstructorBox from "../../components/InstructorBox";
import Footer from "../../components/Footer";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getLearners } from "../../../../api/services/admin.js";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom"
import { getDeactivatedLearners, getActiveLearners } from "../../../../api/services/learner"


export class BasicTable extends Component {
    constructor(props){
        super(props)
        this.state={
          loading:true,
          learners:[],
         
        }
      }
   
     
   
     componentDidMount(){
       let that = this;
       (async function loadContent() {
   
         try{
             
           let verifiedLearners = await getActiveLearners();
           //console.log(verifiedLearners.data.data.data)

           that.setState({
             learners:[...verifiedLearners.data.data.data],
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
  render() {
    const  {  loading,
        learners
    } = this.state
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Regitered users </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
              <li className="breadcrumb-item active" aria-current="page">View unverified users</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          </div>
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Active users</h4>
               
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> Full Name </th>
                       
                        <th> Email </th>
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    
                    {loading ? (
                  <Loader width="70" />
                ) : learners?.length ? (
                <div>
                {
                  learners?.length && learners?.map((users=>{
                    console.log(users)
                      return (
                        <tr>
                        <td >
                        {users?.first_name + " " + users?.last_name}
                        </td>
                        
                        <td> {users?.email}</td>
                        <Link to={`/admin/dashboard/learners/${users?.id}`}
                            // onClick={() =>
                            //   history.push(`/admin/dashboard/courses/${data?.id}`)
                            // }
                            // variant="info"
                          >
                            View
                          </Link>
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
              </div>
            </div>
          </div>
          
      
      </div>
    )
  }
}

export default BasicTable
