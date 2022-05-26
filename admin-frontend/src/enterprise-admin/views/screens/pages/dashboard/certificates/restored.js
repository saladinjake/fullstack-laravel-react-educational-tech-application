import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";
import { getCategories, deleteSubCategory} from "../../../../../api/services/admin.js";
import toast from "react-hot-toast";
import {Link} from "react-router-dom"
const Restored = () => {
  let history = useHistory();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchcategories();
  }, []);

  const fetchcategories = async () => {
    try {
      let subCats = [];
      let allCategories = await getCategories();
      let res = allCategories.data.data;
      res.forEach((category) => {
        if (category.subcategories.length > 0) {
          category.subcategories.forEach((subCat) => {
            subCats.push(subCat);
          });
        }
      });
      setCategories([...subCats]);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          `Error occured fetching active categories`
      );
    }
    setLoading(false);
  };

  // eslint-disable-next-line
  const handleDelete = async (subcategoryId) => {
    setLoading(true);
    try {
      await deleteSubCategory(subcategoryId);
      toast.success("SubCategory Delete");
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
          <h4>Active Subcategories</h4>
        </div>
        <Row className="filter-items">
          {loading ? (
            <Loader width="70" />
          ) : categories.length > 0 ? (
            <Fragment>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Category ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((data, i) => {
                    return (
                      <tr key="i">
                        <td>{data.id}</td>
                        <td>{data?.name}</td>
                        <td className="center">
                          {/* <Button
                            className="mx-4"
                            onClick={() =>
                              history.push({
                                pathname: `/admin/subcategory/${data?.id}`,
                                state: {
                                  name: data?.name,
                                  parent_id:data?.parent_id
                                },
                              })
                            }
                            variant="success"
                          >
                            Update
                          </Button> */}

<Link className="mx-4" to={`/admin/dashboard/subcategory/${data?.id}`}>View</Link>
                          <Button
                            onClick={handleDelete.bind(this, data.id)}
                            variant="danger"
                          >
                            {loading ? (
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Deleting...</span>
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

export default Restored;
