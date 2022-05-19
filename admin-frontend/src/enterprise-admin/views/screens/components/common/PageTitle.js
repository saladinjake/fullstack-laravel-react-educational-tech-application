import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//from "./styles/pagetitle.js";

export class PageTitle extends Component {
    state = {
        backgroundImage: 'qbreadcrumb.jpg',
    }

    render() {
        return (
            <>
                <section className="breadcrumb-area" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${this.state.backgroundImage})` }}>
                    <Container>
                        <Row>
                            <Col md="12" className="text-left">
                                <div className="breadcrumb-box">
                                    <h2 className="breadcrumb-title">Search our courses</h2>
                                    
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        )
    }
}