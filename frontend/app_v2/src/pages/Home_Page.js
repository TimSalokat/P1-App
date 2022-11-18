
import Todos from '../modules/Todos';

import '../css/Pages.css';

export default function ComponentsPage() {
    return (
        <div id="Home_Page">
        
        <Todos/>

        <div className="Section" id="HvvSection">
            <label> The Way </label>
            <h3>Hello world this is just some text for testing purposes</h3>
        </div>

        
        <div className="Section" id="YourDaySection">
            <label> Your Day </label>
            <h3>Hello world this is just some testing text</h3>
        </div>
        

        </div>
    )
}