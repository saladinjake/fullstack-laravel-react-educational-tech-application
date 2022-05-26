import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./styles/account.js";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
import Footer from "../../components/Footer";
import { loginUser } from "../../../../api/services/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logOut, setPrevPath } from "../../../../core/redux/actions/authActions";


const Login = ({ auth: { prevPath, isAuthenticated }, login, logOut, setPrevPath }) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const initialValues = { email: "", password: "" };
  useEffect(() => {
    // if (history.location.state?.from) {
    //   setPrevPath(history.location.state?.from);
    // }

    if(isAuthenticated){
      history.push("/admin/dashboard")
      
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const res = await loginUser(values);
      toast.success("Login Succesfull");
      login(res.data);
      if (prevPath.length > 0) {
        //history.push(prevPath);
        history.push("/admin/dashboard");
      } else {
        history.push("/admin/dashboard");
      }
      setSubmitting(false);
    } catch (err) {
      toast.error(err?.response?.data?.message|| `Poor network connection`);
      logOut();
      setSubmitting(false);
    }
    setLoading(false);
  };
 
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  {/* <img src={require("../../assets/images/faces/dummy_user.png")} alt="user icon" />*/}
                </div>
                <h4>Questence Admin Portal</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>

                <Formik
                  initialValues={initialValues}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (

                <Form className="pt-3" onSubmit={handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" placeholder="Username" size="lg" className="h-auto"  id="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <span className="login_input-msg">
                            {errors.email && touched.email && errors.email}
                          </span>
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Password" size="lg" className="h-auto" id="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <span className="login_input-msg">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                  </Form.Group>
                  <div className="mt-3">
                    
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit" disabled={isSubmitting}>
                          {loading ? (
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            "Signin"
                          )}
                        </button>
                  
                  
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    {/* <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input className="form-control" type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div> */}
                    {/* <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a> */}
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div>
                  {/* <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                  </div> */}
                </Form>

                   )}
                 </Formik>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  
}


Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  setPrevPath: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
  setPrevPath,
  logOut,
})(Login);

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

