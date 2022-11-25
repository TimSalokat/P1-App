
import Todos from '../modules/Todos';

import '../css/Pages.css';
import '../css/Home.css';
import { BsCloudMoonFill } from 'react-icons/bs';

export default function Home_Page() {
    return (
        <div id="Home_Page">
        
        <Todos/>

        <div className="Section" id="HvvSection">
            <label> The Way </label>
            <h3>Hello world this is just some text for testing purposes</h3>
        </div>

        
        <div className="" id="YourDaySection">
            <div id='WeatherContainer'>
                <BsCloudMoonFill id='Icon'/>
                <div id="TemperatureContainer">
                    <label>15</label>
                </div>
            </div>
        </div>
        

        </div>
    )
}