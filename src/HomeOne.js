import React, { Component } from 'react';
import HeaderTwo from './components/Header';
import HeroSlider from './components/HeroSlider';
import Description from './components/QuestOne';
import Footer from './components/Footer';


/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: Applications landing page
*@params: NULL
*@usage: <HomeOne/>
*/
export default class HomeOne extends Component {
    render() {
        return (
            <div className="main-wrapper" >
                < HeaderTwo />
                < HeroSlider />
                < Description />           
                < Footer />

            </div >
        )
    }
}
