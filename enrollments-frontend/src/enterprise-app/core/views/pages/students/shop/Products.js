import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../../components/Header";
import { BreadcrumbBox } from "../../../components/common/Breadcrumb";
// import Pagination from "./../../components/Pagination";
import FooterTwo from "../../../components/Footer";
import { Styles } from "./styles/product.js";
import { getAuthProfile } from "../../../../api/services/learner.js";
import Loader from "../../../components/Loader/Loader";
import toast from "react-hot-toast";


/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: Cart display
*@params: Object  props
*@usage: <Product />
*/
const Product = () => {
  const [activeCourses, setActiveCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthProfile();
  },[]);

  const fetchAuthProfile = async () => {
    try {
      let res = await getAuthProfile();
      setActiveCourses([...res.data.data]);
      console.log(res.data.data);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );
      console.log(
        err?.response?.data?.message || `Error occured fetching active courses`
      );
    }
    setLoading(false);
  };

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper product-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Dashboard" />

        {/* Products */}
        <section className="product-area">
          <Container>
            <Row>
              <Col lg="12" md="12" sm="12">
                <Row>
                  {loading ? (
                    <Loader width="70" />
                  ) : activeCourses.length > 0 ? (
                    <Fragment>
                      {activeCourses.map((data, i) => (
                        <Col lg="4" md="6" key={i}>
                          <div className="product-box">
                            <div className="product-img">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  `/assets/images/${data?.productImg}`
                                }
                                alt=""
                                className="img-fluid"
                              />
                              <span>{data?.course?.course_fee}</span>
                              <div className="layer-box"></div>

                              <Link
                                className="item_view"
                                to={process.env.PUBLIC_URL + data?.productUrl}
                              >
                                View Item
                              </Link>
                            </div>
                            <div className="product-content text-center">
                              <div className="pro-title">
                                <h5>
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      data?.course?.productUrl
                                    }
                                  >
                                    {data?.course?.course_name}
                                  </Link>
                                </h5>
                              </div>
                              <div className="pro-rating">
                                <ul className="list-unstyled list-inline">
                                  <li className="list-inline-item">
                                    <i className="las la-star"></i>
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="las la-star"></i>
                                  </li>
                                </ul>
                              </div>
                              <div className="pro-price">
                                <p>#{data?.course?.course_fee}</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Fragment>
                  ) : (
                    <p>No active course yet.</p>
                  )}
                  <Col md="12" className="text-center">
                    {/* <Pagination /> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </Styles>
  );
};

export default Product;
