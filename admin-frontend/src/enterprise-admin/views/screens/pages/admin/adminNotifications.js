import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import InstructorNavBar from "components/Navbar/AdminNavbar";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
// import Pagination from "./../../components/Pagination";
import Footer from "../../components/Footer";
//from "./learners/styles/product.js";
import { getNotifications } from "services/notification";
import toast from "react-hot-toast";
import Loader from "components/Loader/Loader";

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
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper product-page">
        {/* Header 2 */}
        <InstructorNavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Notifications" />

        {/* Products */}
        <section className="product-area">
          <Container>
            <Row>
              <Col lg="12">
                <Row>
                  <Col md="12" className="">
                    {loading ? (
                      <Loader width="70" />
                    ) : notifications.length > 0 ? (
                      <Fragment>
                        <ul className="list-group check-list">
                          {notifications.map((item, i) => {
                            return <li className="list-group-item" key={i}>{item.message}</li>;
                          })}
                        </ul>
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
        </section>

        {/* Footer 2 */}
        <Footer />
      </div>
    </>
  );
};

export default InstructorNotifications;
