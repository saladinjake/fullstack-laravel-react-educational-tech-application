import React, { useState, useEffect } from "react";
import { Nav, Container, Row, Col, Tab, Button } from "react-bootstrap";
// import InstructorNavBar from "../../components/Navbar/AdminNavbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
//from "./learners/styles/product.js";

import Active from "./category/active";
import Restored from "./category/restored";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";

import { Link } from "react-router-dom"
import {
    createParentCategory,
    getCategories,
    createSubCategory,
  } from "../../../../api/services/admin";

const AdminBusiness = () => {

    const [loading, setLoading] = useState(false);
    const [scloading, setScLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const initialValues = { name: "" };
    const scValues = { parent_id: "", name: "" };
  
    useEffect(() => {
      (async function loadContent() {
        try {
          let res = await getCategories();
          setCategories([...res.data.data]);
  
          console.log(res.data.data)
        } catch (err) {
          toast.error(`Error fetching categories`);
        }
        setLoading(false);
      })();
      // eslint-disable-next-line
    }, []);
  
    const handleSubmit = async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        await createParentCategory(values);
        toast.success("Category Created");
        setSubmitting(false);
      } catch (err) {
        toast.error(err?.response?.data?.message);
        setSubmitting(false);
      }
      setLoading(false);
    };
  
    const handleScSubmit = async (values, { setSubmitting }) => {
      setScLoading(true);
      try {
        await createSubCategory(values);
        toast.success("SubCategory Created");
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
      setSubmitting(false);
      setScLoading(false);
    };
 
 
 
 
   return (


    <div>
        <div className="page-header">
          <h3 className="page-title"> Courses Categories  </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
              <li className="breadcrumb-item active" aria-current="page">view pending courses</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          </div>
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Manage Course categories</h4>
                <Container style={{height:"2000px"}}>
          <Row>
            <Col lg="12">
              <div className="course-tab-list">
                <Tab.Container defaultActiveKey="active">
                  <Nav className="myClass">
                    <Nav.Item>
                      <Nav.Link eventKey="active">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="create">New</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="delete">Subcategories</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="createsub">
                        Create Subcategories
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="active" className="active-tab">
                      <Row>
                        <Active />
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="create" className="active-tab">
                      <Row>
                        <Col md="12">
                          <Formik
                            initialValues={initialValues}
                            validationSchema={CategorySchema}
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
                              <div className="login-box">
                                <div className="login-title text-center">
                                  <h3>Create Category</h3>
                                </div>
                                <form
                                  id="form_login"
                                  className="form"
                                  onSubmit={handleSubmit}
                                >
                                  <p className="">
                                    <label htmlFor="email">Category</label>
                                    <input className="form-control"
                                      type="text"
                                      placeholder="Category Name"
                                      id="name"
                                      name="name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.name}
                                    />
                                    <span className="login_input-msg">
                                      {errors.name &&
                                        touched.name &&
                                        errors.name}
                                    </span>
                                  </p>

                                  <Button
                                    varirant="info"
                                    type="submit"
                                    disabled={isSubmitting}
                                  >
                                    {loading ? (
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Creating...
                                        </span>
                                      </div>
                                    ) : (
                                      "Create Category"
                                    )}
                                  </Button>
                                </form>
                              </div>
                            )}
                          </Formik>
                        </Col>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="delete" className="active-tab">
                      <Row>
                        <Restored />
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="createsub" className="active-tab">
                      <Row>
                        <Col md="12">
                          <Formik
                            initialValues={scValues}
                            validationSchema={SubCategorySchema}
                            onSubmit={handleScSubmit}
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
                              <div className="login-box">
                                <div className="login-title text-center">
                                  <h3>Create SubCategory</h3>
                                </div>
                                <form
                                  id="form_login"
                                  className="form"
                                  onSubmit={handleSubmit}
                                >
                                  <p className="">
                                    <label htmlFor="registration_user">
                                      Category
                                    </label>
                                    <select
                                      name="parent_id"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.parent_id}
                                      required
                                    >
                                      <option>Category</option>
                                      {categories.length > 0 &&
                                        categories.map((category, i) => {
                                          return (
                                            <option key={i} value={category.id}>
                                              {category.name}
                                            </option>
                                          );
                                        })}
                                    </select>
                                    {touched.parent_id && errors.parent_id ? (
                                      <span className="registration_input-msg">
                                        {errors.parent_id}
                                      </span>
                                    ) : null}
                                  </p>

                                  <p className="">
                                    <label htmlFor="name">SubCategory</label>
                                    <input className="form-control"
                                      type="text"
                                      placeholder="Subcategory Name"
                                      id="name"
                                      name="name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.name}
                                    />
                                    <span className="login_input-msg">
                                      {errors.name &&
                                        touched.name &&
                                        errors.name}
                                    </span>
                                  </p>

                                  <Button
                                    varirant="info"
                                    type="submit"
                                    disabled={isSubmitting}
                                  >
                                    {scloading ? (
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Creating...
                                        </span>
                                      </div>
                                    ) : (
                                      "Create Category"
                                    )}
                                  </Button>
                                </form>
                              </div>
                            )}
                          </Formik>
                        </Col>
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
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

 


 const CategorySchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  
  const SubCategorySchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    parent_id: Yup.string().required("Required"),
  });
  