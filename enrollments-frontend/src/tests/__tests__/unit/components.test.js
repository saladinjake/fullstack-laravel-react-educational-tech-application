/*@testCases: test individual function
 *@testType: unit test
 *@testCategory: simple
 *@author: saladinjake victor
 *@company: Ficticious EMS
 *@date" 5/20/2022
*/
import React from "react"
import ReactDOM from 'react-dom';
import { 
  BrowserRouter , 
  Switch, 
  Route 
} from "react-router-dom";
import { shallow , mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
};


import Footer from "../../../enterprise-app/core/views/components/Footer"
import CourseSlider from "../../../enterprise-app/core/views/components/CourseSlider"
import FreeCourse from "../../../enterprise-app/core/views/components/FreeCourse"
import Header from "../../../enterprise-app/core/views/components/Header"
import HeroImage from "../../../enterprise-app/core/views/components/HeroImage"
import HeroSlider from "../../../enterprise-app/core/views/components/HeroSlider"
import Pagination from "../../../enterprise-app/core/views/components/Pagination"
import QuestOne from "../../../enterprise-app/core/views/components/QuestOne"
import ServiceBox from "../../../enterprise-app/core/views/components/ServiceBox"



import BackToTop from "../../../../src/enterprise-app/core/views/components/common/BackToTop"
import BreadcrumbBox from "../../../../src/enterprise-app/core/views/components/common/Breadcrumb"
import MobileMenu from "../../../../src/enterprise-app/core/views/components/common/MobileMenu"
import PageTitle from "../../../../src/enterprise-app/core/views/components/common/PageTitle"
import Search from "../../../../src/enterprise-app/core/views/components/common/Search"
import Sidebar from "../../../../src/enterprise-app/core/views/components/common/Sidebar"
import StickyMenu from "../../../../src/enterprise-app/core/views/components/common/StickyMenu"


// import App from '../../../../src/App';


// describe('App Component', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = shallow(<App />);
//   });

//   it('should match snapshot', () => {
//     expect(wrapper).toMatchSnapshot();
//   });
//   // it('renders without crashing', () => {
//   //   const div = document.createElement('div');
//   //   ReactDOM.render(<App />, div);
//   //   ReactDOM.unmountComponentAtNode(div);
//   // });
// });

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
     expect(wrapper).toMatchSnapshot();
  });

  
});



describe("FreeCourse  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<FreeCourse />);
     expect(wrapper).toMatchSnapshot();
  });

 });


describe("Header  in the dom shadow", () => {
  it('should render without crashing', () => {
    //for nested components just use the naked butt
    const wrapper = <Header />;
     expect(wrapper).toMatchSnapshot();
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

describe("Pagination  in the dom shadow", () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Pagination />);
    expect(wrapper.find('.pagination-box').exists()).toBe(true);
  });
});

describe("ServiceBox  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<ServiceBox />);
     expect(wrapper).toMatchSnapshot();
  });
});





describe("BackToTop  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<BackToTop />);
     expect(wrapper).toMatchSnapshot();
  });
});


describe("Breadcrumb  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    //for nested components just use the naked butt
    const wrapper = <BreadcrumbBox />;
    expect(wrapper).toMatchSnapshot();
  });
  
});


describe("MobileMenu  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<MobileMenu />);
    expect(wrapper.find('.mobile-menu-area').exists()).toBe(true);
  });
});


describe("PageTitle  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<PageTitle />);
    expect(wrapper).toMatchSnapshot();
  });
});


describe("Search  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find('.nav-search').exists()).toBe(true);
  });
});


describe("StickyMenu  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find('.sidebar').exists()).toBe(true);
  });
});
describe("StickyMenu  in the dom shadow", () => {
  it('should render ServiceBox without crashing', () => {
    const wrapper = shallow(<StickyMenu />);
    expect(wrapper.find('.sticky-menu').exists()).toBe(true);
  });
});