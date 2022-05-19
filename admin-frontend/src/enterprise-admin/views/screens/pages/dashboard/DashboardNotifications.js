import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";



// import Pagination from "./../../components/Pagination";
import Footer from "../../components/Footer";
//from "./learners/styles/product.js";
import { getNotifications } from "../../../../api/services/notification";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const InstructorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function loadContent() {
      setLoading(true);
      try {
        let res = await getNotifications();
        setNotifications([...res.data.data]);
      } catch (err) {
        toast.error(`Error occured fetching notifications`);
      }
      setLoading(false);
    })();
  }, []);
 
 
   return (


    <div>
        <div className="page-header">
          <h3 className="page-title"> All Notifications </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
            
            </ol>
          </nav>
        </div>
        <div className="row">
          </div>
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Notifications</h4>
                <Container>
            <Row>
              <Col lg="12">
                <Row>
                  <Col md="12" className="">
                    {loading ? (
                      <Loader width="70" />
                    ) : notifications.length > 0 ? (
                      <Fragment>

<div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> S/NO </th>
                        <th> user id </th>
                     
                        <th> Course id </th>
                        <th> message </th>
                      </tr>
                    </thead>
                    <tbody>

                        
                          {notifications.map((item, index) => {
                             return (

                              <tr>
                              <td className="py-1" >
                                {index+1}
                              </td>
                              <td> {item?.data?.user_id}</td>
                             
                              <td> {item?.data?.user_id || item?.data?.instructor_id }</td>
                              <td> {item?.data?.message} </td>
                            </tr>

                             )
                          })}
                          </tbody>
                  </table>
                </div>
                      </Fragment>
                    ) : (
                      <h4>No new notifications yet</h4>
                    )}
                  </Col>
                  {/* <Col md="12" className="text-center">
                      <Pagination />
                    </Col> */}
                </Row>
              </Col>
            </Row>
          </Container>
              </div>
            </div>
          </div>
          
      
      </div>

     
   );
 };
 
 export default InstructorNotifications;

 


