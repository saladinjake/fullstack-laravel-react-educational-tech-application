import React, { Component } from 'react'
// import { ProgressBar } from 'react-bootstrap';

export class BasicTable extends Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Basic Tables </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
              <li className="breadcrumb-item active" aria-current="page">Basic tables</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          </div>
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Striped Table</h4>
                <p className="card-description"> Add className <code>.table-striped</code>
                </p>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> User </th>
                        <th> First name </th>
                     
                        <th> Amount </th>
                        <th> Deadline </th>
                      </tr>
                    </thead>
                    <tbody>
                    
                      <tr>
                        <td className="py-1">
                         {/* <img src={require("../../assets/images/faces/dummy_user.png")} alt="user icon" />*/}
                        </td>
                        <td> John Doe </td>
                       
                        <td> $ 123.21 </td>
                        <td> April 05, 2015 </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                    {/* <img src={require("../../assets/images/faces/dummy_user.png")} alt="user icon" />*/}
                        </td>
                        <td> Henry Tom </td>
                        
                        <td> $ 150.00 </td>
                        <td> June 16, 2015 </td>
                      </tr>
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
