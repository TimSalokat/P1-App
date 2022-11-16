
import Projects from "../modules/Projects";

import '../css/Pages.css';

export default function ComponentsPage() {
    return (
        <div id="Home_Page">
        
        <Projects/>

        <div className="Section">
            <label> The Way </label>
            <span className="seperator" style={{alignSelf: "flex-start"}}/>
        </div>

        
        <div className="Section">
            <label> Your Day </label>
            <span className="seperator" style={{alignSelf: "flex-start"}}/>
        </div>
        

        </div>
    )
}