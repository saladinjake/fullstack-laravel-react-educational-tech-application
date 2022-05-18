import React, { Component } from 'react';
import HeaderTwo from './components/Header';
import HeroSlider from './components/HeroSlider';


import QuestOne from './components/QuestOne';

import Footer from './components/Footer';

export default class HomeOne extends Component {
    render() {
        return (
            <div className="main-wrapper" >
                < HeaderTwo />
                < HeroSlider />
               
                < QuestOne />
                
                < Footer />

            </div >
        )
    }
}
