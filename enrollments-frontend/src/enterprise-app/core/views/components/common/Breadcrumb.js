import React, { useState } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { Styles } from "./styles/breadcrumb.js";
/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: bread crubs component

*/
const  BreadcrumbBox =  () =>{
    
    const [backgroundImage, setBg] = useState('qbreadcrumb.jpg')

    

        return (
            <Styles>
                <section className="breadcrumb-area" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${backgroundImage})` }}>
                    <Container>
                        <Row>
                            <Col md="12" className="text-center">
                                <div className="breadcrumb-box">
                                    <h2 className="breadcrumb-title">{this.props.title}</h2>
                                    <Breadcrumb>
                                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                                        <Breadcrumb.Item active>{this.props.title}</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Styles>
        )
    
}

export default BreadcrumbBox