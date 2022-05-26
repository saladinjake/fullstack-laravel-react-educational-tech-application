import React, { Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import Loader from "components/Loader/Loader";

const Active = ({ loading, instructors }) => {
  let history = useHistory();

  

  return (
    <Fragment>
      <Col md="12">
        <div className="sec-title text-center">
          <h4>Instructors</h4>
        </div>
        <Row className="filter-items">
          {loading ? (
            <Loader width="70" />
          ) : instructors.length > 0 ? (
            <Fragment>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((data, i) => {
                    let state ="Active";
                    let color ="btn btn-success"
                    if(data?.instructor_profile?.status ==="-1"){
                       color ="btn btn-warning"
                       state ="Deactivated";
                    }else if(data?.instructor_profile.status==="0"){
                      state ="Pending";
                      color ="btn btn-danger"
                    }

                    return (
                      <tr key="i">
                        <td><span className={color}>{state}</span></td>
                        <td>{data?.email}</td>
                        <td>{data?.first_name}</td>
                        <td>{data?.last_name}</td>
                        <td className="center">
                          {/* <Button
                            onClick={() =>
                              history.push(`/admin/instructors/${data?.id}`)
                            }
                            variant="info"
                          >
                            View
                          </Button> */}
                          <Link to={`/admin/dashboard/courses/${data?.id}`}
                            // onClick={() =>
                            //   history.push(`/admin/dashboard/instructors/${data?.id}`)
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
            <p>No learner yet.</p>
          )}
        </Row>
      </Col>
    </Fragment>
  );
};

export default Active;
