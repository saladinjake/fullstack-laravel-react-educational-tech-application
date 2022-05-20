/*@testCases: test individual function
 *@testType: unit test
 *@testCategory: simple
 *@author: saladinjake victor
 *@company: Ficticious EMS
 *@date" 5/20/2022
*/
import React from "react"
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

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


import BackToTop from "../../../../src/enterprise-app/core/views/components/common/BackToTop"
import Breadcrumb from "../../../../src/enterprise-app/core/views/components/common/Breadcrumb"
import MobileMenu from "../../../../src/enterprise-app/core/views/components/common/MobileMenu"
import PageTitle from "../../../../src/enterprise-app/core/views/components/common/PageTitle"
import Search from "../../../../src/enterprise-app/core/views/components/common/Search"
import Sidebar from "../../../../src/enterprise-app/core/views/components/Sidebar"
import StickyMenu from "../../../../src/enterprise-app/core/views/components/common/StickyMenu"


import App from '../../../src/enterprise-app/App';


describe('App Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

//snake in the monkey shadow
describe("Footer  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.footer1').exists()).toBe(true);


  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});



describe("CourseSlider  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CourseSlider />);
    expect(wrapper.find('.free-course-area').exists()).toBe(true);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CourseSlider />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});



describe("FreeCourse  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<FreeCourse />);
    expect(wrapper.find('.footer1').exists()).toBe(true);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FreeCourse />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});


describe("Header  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('.logo-area2').exists()).toBe(true);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("HeroImage  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<HeroImage />);
    expect(wrapper.find('.hero-image-area').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HeroImage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("HeroSlider  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<HeroSlider />);
    expect(wrapper.find('.hero-slider-area').exists()).toBe(true);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HeroSlider />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("ImageGallery   in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ImageGallery  />);
    expect(wrapper.find('.gallery-area').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ImageGallery />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Pagination  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Pagination />);
    expect(wrapper.find('.pagination-box').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Pagination />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("ServiceBox  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<ServiceBox />);
    expect(wrapper.find('.totop-btn').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ServiceBox />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});





describe("BackToTop  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<BackToTop />);
    expect(wrapper.find('.about-content').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BackToTop />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});


describe("Breadcrumb  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<Breadcrumb />);
    expect(wrapper.find('.breadcrumb-area').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Breadcrumb />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});


describe("MobileMenu  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<MobileMenu />);
    expect(wrapper.find('.mobile-menu-area').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MobileMenu/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});


describe("PageTitle  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<PageTitle />);
    expect(wrapper.find('.breadcrumb-area').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageTitle />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});


describe("Search  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find('.nav-search').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});


describe("StickyMenu  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find('.sidebar').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sidebar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
describe("StickyMenu  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<StickyMenu />);
    expect(wrapper.find('.sticky-menu').exists()).toBe(true);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StickyMenu />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});