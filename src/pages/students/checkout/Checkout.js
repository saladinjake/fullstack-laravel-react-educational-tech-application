import React, { Fragment,useState} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import HeaderTwo from "../../../components/Header";
import { BreadcrumbBox } from "../../../components/common/Breadcrumb";
import FooterTwo from "../../../components/Footer";
import { Styles } from "./styles/checkout.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { enrollCourses } from "services/enrollment.js";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";


/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: page checkout

*/

const Checkout = ({ cart: { cart, total }, auth: { user } }) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);


  const enrollStudent = async () => {
    setLoading(true);
    if (cart.length > 0) {
      let payload = [];
      cart.forEach((item) => {
        let newObj = {};
        newObj.user_id = user.id;
        newObj.course_id = item.id;
        payload.push(newObj);
      });

      try {
        await enrollCourses({
          enrollments: payload,
        });
        toast.success(`Courses enrolled succesfully`);
        history.push("products");
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            `Error occured enrolling you for this Course`
        );
      }
    }
    setLoading(false);
  };
  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper about-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Checkout" />

        <Container>
          <Row>
            <Col md="12">
              <section className="checkout">
                <h4 className="tab-title">
                  Customer Name: {`${user?.first_name} ${user?.last_name}`}
                </h4>
                <p className="tab-desc">Customer Email: {user?.email}</p>
                <ul className="list-unstyled check-list">
                  {cart.length > 0 ? (
                    <Fragment>
                      {cart.map((data, i) => {
                        return (
                          <li>
                            <i className="fa fa-check"></i>
                            {data.course_name}
                          </li>
                        );
                      })}
                    </Fragment>
                  ) : (
                    <li>No items in cart</li>
                  )}
                </ul>
                {cart.length > 0 && (
                  <Button
                    onClick={enrollStudent}
                    className="mt-4"
                    variant="success"
                  >
                    
                    {loading ? (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                         `Pay #${total} with Paystack`
                    )}
                  </Button>
                )}
              </section>
            </Col>
          </Row>
        </Container>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </Styles>
  );
};

Checkout.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Checkout);
