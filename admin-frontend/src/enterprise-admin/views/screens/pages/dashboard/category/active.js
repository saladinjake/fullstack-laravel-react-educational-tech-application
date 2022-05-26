import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";
import { getParentCategories, deleteParentCategory } from "../../../../../api/services/admin.js";
import toast from "react-hot-toast";
import { Link  } from "react-router-dom";
const Active = () => {
  let history = useHistory();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchcategories();
  }, []);

  const fetchcategories = async () => {
    try {
      let allCategories = await getParentCategories();
      setCategories([...allCategories.data.data]);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          `Error occured fetching active categories`
      );
    }
    setLoading(false);
  };

  const handleDelete = async (categoryId) => {
    setLoading(true);
    try {
      await deleteParentCategory(categoryId);
      let allCategories = await getParentCategories();
      setCategories([...allCategories.data.data]);
      toast.success("Category Delete");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          `Error occured fetching active categories`
      );
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Col md="12">
        <div className="sec-title text-center">
          <h4>Active categories</h4>
        </div>
        <Row className="filter-items">
          {loading ? (
            <Loader width="70" />
          ) : categories.length > 0 ? (
            <Fragment>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                   
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((data, i) => {
                    
                    return (
                      <tr key="i">
                        
                        <td>{data?.name}</td>
                        <td className="center">
                          {/* <Button
                            className="mx-4"
                            onClick={() =>
                              history.push(`/admin/category/${data?.id}`)
                            }
                            variant="success"
                          >
                            Update
                          </Button> */}
                          <Link className="mx-4" to={`/admin/dashboard/category/${data?.id}`}>Update</Link>
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
            <p>No Business yet.</p>
          )}
        </Row>
      </Col>
    </Fragment>
  );
};

export default Active;
