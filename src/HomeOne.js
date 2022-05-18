import React, { Component } from 'react';
import HeaderTwo from './components/HeaderTwo';
import HeroSlider from './components/HeroSlider';
import IconBox from './components/IconBox';
import AboutUs from './components/AboutUs';
import CourseFilter from './components/CourseFilter';
import HelpArea from './components/HelpArea';
import QuestOne from './components/QuestOne';
import NewsletterForm from './components/NewsletterForm';
import Footer from './components/Footer';

export default class HomeOne extends Component {
    render() {
        return (
            <div className="main-wrapper" >
                < HeaderTwo />
                < HeroSlider />
                < IconBox />
                < AboutUs />
                < CourseFilter />
                < HelpArea />
                < QuestOne />
                < NewsletterForm />
                < Footer />

            </div >
        )
    }
}
