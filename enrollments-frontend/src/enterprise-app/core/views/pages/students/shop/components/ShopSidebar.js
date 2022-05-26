import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CourseSearch from './../../courses/components/CourseSearch';
import PriceFilter from './PriceFilter';
import PopularCourse from './../../courses/components/PopularCourse';
import CourseTag from './../../courses/components/CourseTag';

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: side bar for course filtering

*/

class ShopSidebar extends Component {
    render() {
        return (
            <div className="course-sidebar">
                <Row>
                    <Col md="12">
                        <CourseSearch />
                    </Col>
                    <Col md="12">
                        <PriceFilter />
                    </Col>
                    <Col md="12">
                        <PopularCourse />
                    </Col>
                    <Col md="12">
                        <CourseTag />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ShopSidebar
