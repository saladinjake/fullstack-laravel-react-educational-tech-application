import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';

export class BasicElements extends Component {
  state = {
    startDate: new Date()
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount() {
    bsCustomFileInput.init()
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Form elements </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Forms</a></li>
              <li className="breadcrumb-item active" aria-current="page">Form elements</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Default form</h4>
                <p className="card-description"> Basic form layout </p>
                <form className="forms-sample">
                  <Form.Group>
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <Form.Control type="text" id="exampleInputUsername1" placeholder="Username" size="lg" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <Form.Control type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <Form.Control type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                    <Form.Control type="password" className="form-control" id="exampleInputConfirmPassword1" placeholder="Password" />
                  </Form.Group>
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input className="form-control" type="checkbox" className="form-check-input"/>
                      <i className="input-helper"></i>
                      Remember me
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary mr-2">Submit</button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Horizontal Form</h4>
                <p className="card-description"> Horizontal form layout </p>
                <form className="forms-sample">
                  <Form.Group className="row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                    <Form.Control type="text" className="form-control" id="exampleInputUsername2" placeholder="Username" />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                    <Form.Control type="email" className="form-control" id="exampleInputEmail2" placeholder="Email" />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="exampleInputMobile" className="col-sm-3 col-form-label">Mobile</label>
                    <div className="col-sm-9">
                    <Form.Control type="text" className="form-control" id="exampleInputMobile" placeholder="Mobile number" />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-9">
                    <Form.Control type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label htmlFor="exampleInputConfirmPassword2" className="col-sm-3 col-form-label">Re Password</label>
                    <div className="col-sm-9">
                    <Form.Control type="password" className="form-control" id="exampleInputConfirmPassword2" placeholder="Password" />
                    </div>
                  </Form.Group>
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input className="form-control" type="checkbox" className="form-check-input"/>
                      <i className="input-helper"></i>
                      Remember me
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary mr-2">Submit</button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
          
        </div>
      </div>
    )
  }
}

export default BasicElements
