import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom"
const Active = ({ loading, activeCourses, category }) => {
  let history = useHistory();
  console.log(activeCourses)
  return (
    <Fragment>
      <Col md="12">
        <div className="sec-title text-center">
          <h4>{category} Courses</h4>
        </div>
        <Row className="filter-items">
          {loading ? (
            <Loader width="70" />
          ) : activeCourses.length > 0 ? (
            <Fragment>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Lead instructor</th>
                    <th>Fee</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCourses.map((data, i) => {
                     let state ="Active";
                    let color ="btn btn-success"
                    if(data?.status ==="-1"){
                       color ="btn btn-warning"
                       state ="Deactivated";
                    }else if(data?.status==="0"){
                      state ="Pending";
                      color ="btn btn-danger"
                    }

                    return (
                      <tr key="i">
                        <td><span className={color}>{state}</span></td>
                        <td>{data?.course_name}</td>
                        <td>{data?.instructor?.first_name} {data?.instructor?.last_name}</td>
                        {/* <td>{ data?.instructors?.length > 0 && data?.instructors?.map(item =>{
                           return (<span>{item.first_name} {item.last_name},</span>)
                        })} </td>
                       
                        <td>{data?.learning_style}</td> */}
                        <td>{data?.price}</td>
                        <td className="center">
                          <Link to={`/admin/dashboard/courses/${data?.id}`}
                            // onClick={() =>
                            //   history.push(`/admin/dashboard/courses/${data?.id}`)
                            // }
                            // variant="info"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Fragment>
          ) : (
            <p>No {category} course yet.</p>
          )}
        </Row>
      </Col>
    </Fragment>
  );
};

export default Active;
