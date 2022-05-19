import React, { Component } from "react";

import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import Guide from "./components/Guide";
import CTA from "./components/cta";
import CourseFilter from "./components/CourseFilter";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default class HomeOne extends Component {
  render() {
    return (
      <div className="main">

        <Hero />
        <Features />
        <CourseFilter />
        <CTA />
        <AboutUs />
        <Guide />
        <Newsletter />
        <Footer />
      </div>
    );
  }
}
