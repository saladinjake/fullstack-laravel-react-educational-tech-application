import React, { Component } from 'react';
import Datas from '../data/footer/footer.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BackToTop from './common/BackToTop';
import { Styles } from "./styles/footerOne.js";

class Footer extends Component {
    render() {
        return (
            <Styles>
                {/* Footer Area */}
                <footer className="footer1" style={{ background: `#fff` }}>
                    <Container>
                        <Row>
                            <Col md="8">
                                <div className="footer-logo-info">
                                    <img src={process.env.PUBLIC_URL + "/assets/images/f-logo.png"} alt="" className="img-fluid" />
                                    <p>EMS ONLINE LEARNING. Grow your skills, learn and earn</p>
                                    <ul className="list-unstyled">
                                        <li><i className="las la-map-marker"></i>795 Moon Avenue, Jupiter </li>
                                        <li><i className="las la-envelope"></i>juwavictor@gmail.com</li>
                                        <li><i className="las la-phone"></i>+2348130870416</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="f-links">
                                    <h5>Useful Links</h5>
                                    <ul className="list-unstyled">
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Home</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Help Center</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Our Services</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Privacy Policy</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Online Support</Link></li>
                                    </ul>
                                    <ul className="list-unstyled">
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>About Us</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Courses</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Terms and conditions</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Why EMS</Link></li>
                                        <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Online Support</Link></li>
                                    </ul>
                                </div>
                            </Col>
                            </Row>
                    </Container>
                </footer>

                {/* Copyright Area */}
                <section className="copyright-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="copy-text">
                                    <p>Copyright &copy; 2022 | Designed With <i className="las la-heart"></i> by <a href={process.env.PUBLIC_URL + "/"} target="_blank" rel="noopener noreferrer">Juwa Victor</a></p>
                                </div>
                            </Col>
                            
                        </Row>
                    </Container>

                    {/* Back To Top */}
                    <BackToTop/>
                </section>
            </Styles>
        )
    }
}

export default Footer
