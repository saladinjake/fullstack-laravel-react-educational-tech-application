import React, { Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import Loader from "components/Loader/Loader";

const Active = ({ loading, activeCourses, category }) => {
  let history = useHistory();

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
                    <th>Instructor</th>
                    <th>Style</th>
                    <th>Fee</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCourses.map((data, i) => {
                    return (
                      <tr key="i">
                        <td>{data.id}</td>
                        <td>{data?.course_name}</td>
                        <td>{data?.instructor.user.first_name}</td>
                        <td>{data?.learning_style}</td>
                        <td>{data?.price}</td>
                        <td className="center">
                          {/* <Button
                            onClick={() =>
                              history.push(`/admin/courses/${data?.id}`)
                            }
                            variant="success"
                          >
                            View
                          </Button> */}

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
