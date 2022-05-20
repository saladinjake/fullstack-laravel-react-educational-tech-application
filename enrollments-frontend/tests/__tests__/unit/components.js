import React from "react"
import { shallow } from "enzyme"
import Footer from "../../../../src/enterprise-app/core/views/components/Footer"
import CourseSlider from "../../../../src/enterprise-app/core/views/components/CourseSlider"
import FreeCourse from "../../../../src/enterprise-app/core/views/components/FreeCourse"
import Header from "../../../../src/enterprise-app/core/views/components/Header"
import HeroImage from "../../../../src/enterprise-app/core/views/components/HeroImage"
import HeroSlider from "../../../../src/enterprise-app/core/views/components/HeroSlider"
import ImageGallery from "../../../../src/enterprise-app/core/views/components/ImageGallery"
import Pagination from "../../../../src/enterprise-app/core/views/components/Pagination"
import QuestOne from "../../../../src/enterprise-app/core/views/components/QuestOne"
import ServiceBox from "../../../../src/enterprise-app/core/views/components/ServiceBox"
import TabBox from "../../../../src/enterprise-app/core/views/components/TabBox"


//snake in the monkey shadow
describe("Footer  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.footer1').exists()).toBe(true);
  });
});



describe("CourseSlider  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CourseSlider />);
    expect(wrapper.find('.free-course-area').exists()).toBe(true);
  });
});



describe("FreeCourse  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<FreeCourse />);
    expect(wrapper.find('.footer1').exists()).toBe(true);
  });
});


describe("Header  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('.logo-area2').exists()).toBe(true);
  });
});

describe("HeroImage  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<HeroImage />);
    expect(wrapper.find('.hero-image-area').exists()).toBe(true);
  });
});

describe("HeroSlider  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<HeroSlider />);
    expect(wrapper.find('.hero-slider-area').exists()).toBe(true);
  });
});

describe("ImageGallery   in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ImageGallery  />);
    expect(wrapper.find('.gallery-area').exists()).toBe(true);
  });
});

describe("Pagination  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.pagination-box').exists()).toBe(true);
  });
});

describe("QuestOne  in the dom shadow", () => {
  it('should render QuestOne without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.about-content').exists()).toBe(true);
  });
});