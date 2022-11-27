
import React from 'react';
import Todos from '../modules/Todos';

import '../css/Pages.css';
import '../css/Home.css';
import { BsCloudMoonFill } from 'react-icons/bs';
import { Global } from '../functionality/functions';

export default function Home_Page() {

    const [weatherFilter, setWeatherFilter] = React.useState("24:00");
    Global.setWeatherFilterFunc = setWeatherFilter;

    React.useEffect(() => {
        // console.log(weatherFilter)
    }, [weatherFilter])

    const [selectedConnection, setSelectedConnection] = React.useState("ConnectionOne");

    return (
        <div id="Home_Page">
        
        <Todos/>

        <div id="HvvSection">
            <label id='SectionLabel'> Train Timings </label>  
            <div id="Connections_wrapper" className='row nowrap'>
                <Connection selected={selectedConnection} setSelected={setSelectedConnection} value="ConnectionOne"/>
                <Connection selected={selectedConnection} setSelected={setSelectedConnection} value="ConnectionTwo"/>
                <Connection selected={selectedConnection} setSelected={setSelectedConnection} value="ConnectionThree"/>
            </div>
        </div>

        
        <div id="YourDaySection">
            <WeatherSection/>
            <div className='chip_wrapper row nowrap'>
                <TimeOption label="Whole Day" value="24:00" weatherFilter={weatherFilter}/>
                <TimeOption label="Till 13:25" value="13:25" weatherFilter={weatherFilter}/>
                <TimeOption label="Till 18:00" value="18:00" weatherFilter={weatherFilter}/>
            </div>
        </div>
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

const TimeOption = (props) => {
    function isActive() {
        return props.value === props.weatherFilter ? "active" : ""}

    return (
        <div id='Chip' className={isActive()} onClick={() => {
            Global.setWeatherFilter(props.value);
        }}>
            <label>
                {props.label}
            </label>
        </div>
    )
}

const Connection = (props) => {
    
    function isSelected(value){
        return value === props.selected ? " selected" : ""
    }

    return (
        <div 
            id="Connection" 
            className={'row'+isSelected(props.value)} 
            value={props.value}
            onClick={() => props.setSelected(props.value)}
        >
            <h4>
                Meckelfeld<br/>
                Harburg<br/>
                Altona<br/>
                Lukas
            </h4>
            <h4>
                88:88<br/>
                88:88<br/>
                88:88<br/>
                88:88
            </h4>
        </div>
    )
}