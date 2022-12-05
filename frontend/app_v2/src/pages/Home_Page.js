
import React from 'react';
import Todos from '../modules/Todos';
import Console from '../modules/Console';

import '../css/Pages.css';
import '../css/Home.css';
import { BsSun, BsFillCloudSunFill, BsCloudMoonFill, 
    BsCloudRain, BsCloudLightningRain, BsClouds 
} from 'react-icons/bs';
import {TbSnowflake} from "react-icons/tb";
import {RiMoonClearLine} from "react-icons/ri";
import { Global } from '../functionality/functions';
import { todos } from "../functionality/modules";

function func() {return}

const This = {

    selectConnection: func,
    set setConnectionSelector(new_func){
        this.selectConnection = new_func;
    },

    selectMenuItem: func,
    set setMenuItemSelector(new_func){
        this.selectMenuItem = new_func;
    }

}

export default function Home_Page() {

    let Logo = require('../images/nyan-cat.png');

    //eslint-disable-next-line
    const [weather, setWeather] = React.useState("moon");
    const [, setWeatherFilter] = React.useState("24:00");
    const [selectedConnection, setSelectedConnection] = React.useState("");
    const [menuItem, setMenuItem] = React.useState();
    Global.setWeatherFilterFunc = setWeatherFilter;

    React.useEffect(() => {
        This.setConnectionSelector = setSelectedConnection;
        This.setMenuItemSelector = setMenuItem;
        setMenuItem(
            todos.unfinished.length === 0 ? "Bahn" : "Todos")
    }, [])

    return (
        <div id="Home_Page">

        <div id="YouSection">
            <div id='LogoContainer'>
                <img src={Logo} alt="User_Icon"/>
            </div>
            <div>
                <h2>Morning <span className='text_accent text_bold'>Admin</span></h2>    
                <h4>Should be a day like any other.</h4>    
            </div>    
        </div>
        
        <div id="YourDaySection">
            <WeatherSection weather={weather} setWeather={setWeather}/>
        </div>

        <HomeMainSection selected={menuItem}>
            <MainComponent selected={menuItem} selectedConnection={selectedConnection}/>
        </HomeMainSection>

    </div>
    )
}

const WeatherSection = (props) => {

    const [mainText, setMainText] = React.useState("");
    const [subText, setSubText] = React.useState("");

    function cycleWeather() {
        let possible = ["sun", "sun_cloudy", "moon", "moon_cloudy", "cloudy", "rain", "thunder", "snow"]
        let current = possible.indexOf(props.weather);
        let next = current+1 <= possible.length ? possible[current+1] : possible[0];
        props.setWeather(next);
    }

    let WeatherIcon = (props) => {switch(props.weather) {
        case "sun":
            setMainText("Sunny");
            setSubText("Perfect weather for shorts and some drinks");
            return (<BsSun id="Icon"/>);
        case "sun_cloudy":            
            setMainText("Partly Cloudy");
            setSubText("Think twice about your shorts, you might freeze");
            return (<BsFillCloudSunFill id="Icon"/>);
        case "moon":
            setMainText("Clear Sky");
            setSubText("A perfect night for some stargazing");
            return (<RiMoonClearLine id="Icon"/>);
        case "moon_cloudy":
            setMainText("Cloudy Night");
            setSubText("There will be no stars to see tonight");
            return (<BsCloudMoonFill id='Icon'/>);
        case "cloudy":
            setMainText("Cloudy");
            setSubText("No sun for you my man");
            return(<BsClouds id="Icon"/>);
        case "rain":
            setMainText("Rainy");
            setSubText("You should have an umbrella with you today");
            return (<BsCloudRain id="Icon"/>);
        case "thunder":
            setMainText("Thunder");
            setSubText("Yeah. Thunder.");
            return (<BsCloudLightningRain id="Icon"/>);
        case "snow":
            setMainText("It's snowing");
            setSubText("May Olaf's grace be with you today");
            return (<TbSnowflake id="Icon"/>);

        default:
            setMainText("Error");
            setSubText("Could'nt load");
            return(<label>Error</label>)
    }}

    return (
        <div id='WeatherSection' className='row nowrap'>
            <div id='WeatherContainer' onClick={cycleWeather}>
                <WeatherIcon weather={props.weather}/>
                <div id="TemperatureContainer">
                    <h4>
                        15
                        <span style={{color:"var(--text-color)", fontSize:"16px"}}>
                            &deg;
                        </span>
                    </h4>
                </div>
            </div>

            <div className='TextContainer stretch'>
                <h3> {mainText} </h3>
                <h4> {subText} </h4>
            </div>
        </div>
    )
}

const Connection = (props) => {
    
    function isSelected(value){
        return value === props.selected ? " active" : ""
    }

    function onClick_handler(value){
        value === props.selected ? This.selectConnection("") : This.selectConnection(value);
    }

    return (
        <div 
            id="Connection" 
            className={'row' + isSelected(props.value).toString()} 
            value={props.value}
            onClick={() => onClick_handler(props.value)}
        >
            <h4>
                Meckelfeld<br/>
                Harburg<br/>
                Altona<br/>
                Lukas
            </h4>
            <h4>
                06:56<br/>
                07:12<br/>
                07:57<br/>
                08:11
            </h4>
            <label></label>
            <div id='Decorator'/>
        </div>
    )
}

const HomeMainSection = (props) => {

    function isSelected(value) {
        return value === props.selected ? " selected" : ""
    }

    return (
        <div id="HomeMainSection">
            <ul className="ListSelector" style={{marginTop:"10px"}}>
                <li className={isSelected("Todos").toString()} onClick={() => This.selectMenuItem("Todos")}>Todos</li>
                <li className={isSelected("Bahn").toString()} onClick={() => This.selectMenuItem("Bahn")}>Bahn</li>
                <li className={isSelected("Weather").toString()} onClick={() => This.selectMenuItem("Weather")}>Weather</li>
                <li className={isSelected("Console").toString()} onClick={() => This.selectMenuItem("Console")}>Console</li>
            </ul>

            {props.children}

        </div>
    )
}

const MainComponent = (props) => {
    switch(props.selected){
        case "Bahn":
            return (
            <div id="Connections_wrapper" className='row nowrap'>
                <Connection selected={props.selectedConnection} value="One"/>
                <Connection selected={props.selectedConnection} value="Two"/>
                <Connection selected={props.selectedConnection} value="Three"/>
                <Connection selected={props.selectedConnection} value="Four"/>
            </div> );
        case "Todos":
            return <Todos/>;
        case "Console":
            return <Console/>;


        default: 
            return <div>Couldnt load</div>
    }
}