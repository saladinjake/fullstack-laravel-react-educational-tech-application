import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";

import toast from "react-hot-toast";
import {Link } from "react-router-dom"

import Loader from "../../../components/Loader/Loader";
import { getDeactivatedBusiness } from "../../../../../api/services/admin.js";
const DeActivated = () => {
  let history = useHistory();
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchbusiness();
  }, []);

  const fetchbusiness = async () => {
    try {
      let allbusiness = await getDeactivatedBusiness();
      setBusiness([...allbusiness.data.data.profiles.data]);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || `Error occured fetching DeActivated business`
      );
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Col md="12">
        <div className="sec-title text-center">
          <h4>DeActivated Business</h4>
        </div>
        <Row className="filter-items">
          {loading ? (
            <Loader width="70" />
          ) : business.length > 0 ? (
            <Fragment>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Company ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {business.map((data, i) => {
                    return (
                      <tr key="i">
                        <td>{data.id}</td>
                        <td>{data?.company_name}</td>
                        <td>{data?.company_phone}</td>
                        <td className="center">
                        <Link className="mx-4" to={`/admin/dashboard/business/${data?.id}`}>View</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Fragment>
          ) : (
            <p>No Business yet.</p>
          )}
        </Row>
      </Col>
    </Fragment>
  );
};

export default DeActivated;
