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


import { getInstructors } from "../../../../api/services/admin.js";
export class BasicTable extends Component {
    constructor(props){
        super(props)
        this.state={
          loading:true, 
          instructors:[]
        }
      }
   
     
   
     componentDidMount(){
       let that = this;
       (async function loadContent() {
   
         try{
            
           let verifiedInstructors = await getInstructors()
          // console.log(verifiedInstructors.data.data)
           that.setState({
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
  render() {

    const  {  loading,
        instructors
    } = this.state
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Instructors</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
              <li className="breadcrumb-item active" aria-current="page">View Pending instructors</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          </div>
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Instructors Table</h4>
            
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                    <tr>
                        <th> Firstname </th>
                        <th> Last name </th>
                     
                        <th> Email </th>
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    
                    {loading ? (
                  <Loader width="70" />
                ) : instructors?.length ? (
                <div>
                {
                 instructors?.length && instructors?.map((users=>{
                      return (
                        <tr>
                        <td className="py-1">
                       {users?.first_name}
                        </td>
                        <td> {users?.last_name}</td>
                       
                        <td> {users?.email}</td>
                        <Link to={`/admin/dashboard/instructors/${users?.id}`}
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
