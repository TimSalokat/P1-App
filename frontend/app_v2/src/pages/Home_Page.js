
import React from 'react';
// import Todos from '../modules/Todos';

import '../css/Pages.css';
import '../css/Home.css';
import { BsCloudMoonFill } from 'react-icons/bs';
import { Global } from '../functionality/functions';

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
    const [weatherFilter, setWeatherFilter] = React.useState("24:00");
    const [selectedConnection, setSelectedConnection] = React.useState("");
    const [menuItem, setMenuItem] = React.useState("Bahn");
    Global.setWeatherFilterFunc = setWeatherFilter;

    React.useEffect(() => {
        This.setConnectionSelector = setSelectedConnection;
        This.setMenuItemSelector = setMenuItem;
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
            <WeatherSection/>
        </div>

        <HomeMainSection selected={menuItem}>

            <div id="Connections_wrapper" className='row nowrap'>
                <Connection selected={selectedConnection} value="One"/>
                <Connection selected={selectedConnection} value="Two"/>
                <Connection selected={selectedConnection} value="Three"/>
                <Connection selected={selectedConnection} value="Four"/>
            </div>
        
        </HomeMainSection>

    </div>
    )
}

const WeatherSection = () => {
    return (
        <div id='WeatherSection' className='row nowrap'>
            <div id='WeatherContainer'>
                <BsCloudMoonFill id='Icon'/>
                <div id="TemperatureContainer">
                    <h4>15</h4>
                </div>
            </div>

            <div className='TextContainer stretch'>
                <h3> Cloudy </h3>
                <h4> There will be no stars to see tonight </h4>
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
            <ul className="ListSelector">
                <li className={isSelected("Bahn").toString()} onClick={() => This.selectMenuItem("Bahn")}>Bahn</li>
                <li className={isSelected("Stundenplan").toString()} onClick={() => This.selectMenuItem("Stundenplan")}>Stundenplan</li>
                <li className={isSelected("Todos").toString()} onClick={() => This.selectMenuItem("Todos")}>Todos</li>
                <li className={isSelected("Something").toString()} onClick={() => This.selectMenuItem("Something")}>Something</li>
            </ul>

            {props.children}

        </div>
    )
}