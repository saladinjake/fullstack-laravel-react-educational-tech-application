import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";

import { getCertificates, deleteCetificate } from "../../../../../api/services/admin";
import toast from "react-hot-toast";
import {Link } from "react-router-dom"
const Active = () => {
  let history = useHistory();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getCertificates();
        setCertificates([...res.data.data]);
      } catch (err) {
        toast.error(`Error fetching certificates`);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (categoryId) => {
    setLoading(true);
    try {
      await deleteCetificate(categoryId);
      let allCertificates = await getCertificates();
      setCertificates([...allCertificates.data.data]);
      toast.success("Certificate Deleted");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          `Error occured fetching active certificates`
      );
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Col md="12">
        <div className="sec-title text-center">
          <h4>Active Certificates</h4>
        </div>
        <Row className="filter-items">
          {loading ? (
            <Loader width="70" />
          ) : certificates.length > 0 ? (
            <Fragment>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                  
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((data, i) => {
                    return (
                      <tr key="i">
                       
                        <td>{data?.name}</td>
                        <td className="center">
                          {/* <Button
                            className="mx-4"
                            onClick={() =>
                              history.push(`/admin/certificates/${data?.id}`)
                            }
                            variant="success"
                          >
                           View
                          </Button> */}

                          <Link className="mx-4" to={`/admin/dashboard/certificates/${data?.id}`}>View</Link>
                          <Button
                            onClick={handleDelete.bind(this, data.id)}
                            variant="danger"
                          >
                            {loading ? (
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Creating...</span>
                              </div>
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Fragment>
          ) : (
            <p>No Certificate yet.</p>
          )}
        </Row>
      </Col>
    </Fragment>
  );
};

export default Active;
