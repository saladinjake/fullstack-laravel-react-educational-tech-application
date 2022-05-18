import React, { Component } from 'react';
import Datas from '../../../data/404/error.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/Header';
import FooterTwo from '../../../components/Footer';
import { Styles } from './styles/pageNotFound.js';

class PageNotFound extends Component {
    render() {
        return (
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper error-page">

                    {/* Header 2 */}
                    <Header />

                    {/* 404 Area */}
                    <section className="error-area" >
                        <Container>
                            <Row>
                                <Col md="12">
                                    <div className="error-box text-center">
                                        <h1>4<span>0</span>4</h1>
                                        <h3>Page Not Found</h3>
                                        <p>Ooops! The page you are looking for, couldn't be found.</p>
                                        <Link to={process.env.PUBLIC_URL + "/"}><i className="fas fa-home"></i>Go To Homepage</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    {/* Footer 2 */}
                    <FooterTwo />
                </div>
            </Styles>
        )
    }
}

export default PageNotFound