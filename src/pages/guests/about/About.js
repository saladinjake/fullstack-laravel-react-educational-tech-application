import React, { Component } from 'react';
import Header from '../../../components/Header';
import { BreadcrumbBox } from '../../../components/common/Breadcrumb';


import FaqEvent from '../../../components/FaqEvent';
import FooterTwo from '../../../components/Footer';
import { Styles } from "./styles/about.js";

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: style definition for about

*/

class About extends Component {

    render() {
        return (
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper about-page">

                    {/* Header 2 */}
                    <Header />

                    {/* Breadcroumb */}
                    <BreadcrumbBox title="About Us" />

                   

                    

                    {/* Footer 2 */}
                    <FooterTwo />

                </div>
            </Styles>
        )
    }
}

export default About