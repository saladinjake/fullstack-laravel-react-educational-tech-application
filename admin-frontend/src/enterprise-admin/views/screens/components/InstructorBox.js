import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
//from "./styles/learnerBox.js";
import { Link } from "react-router-dom"

class ServiceBox extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const {
            courseTotal, 
            activeCourses,
            user,
            learnersTotal,
            summary
        } = this.props;
        return (
            <>
                {/* Service Box */}
                <section className="service-area">
                    
                </section>
            </>
        )
    }
}

export default ServiceBox
