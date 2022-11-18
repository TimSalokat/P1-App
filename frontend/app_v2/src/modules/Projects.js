
import "../css/Projects.css";
import { Global } from "../functionality/functions";

import {BiDownArrow} from "react-icons/bi";

export default function Projects() {

    return (
        <div className="Section column nowrap">
            <div className="ProjectHeader" onClick={() => Global.setShowProjects = !Global.showprojects}>
                <label>Projects</label>
                <BiDownArrow id="Icon" style={{color:"var(--text_color)"}}/>
            </div>
            <div className="ProjectContainer stretch">
                <Project title={"All"}/>

                <Project title={"Testing"}/>
                <Project title={"Some more Testing"}/>
                <Project title={"More Testing"}/>

                <Project title={"New Project"}/>
            </div>
        </div>
    )
}

const Project = (self) => {

    function active(){
        return Global.activeproject == self.title ? "active" : ""
    }

    if(Global.activepage === "Home"){
        return (
            <div className="Project">
    
                <div>
                    <label>{self.title}</label>
                    <label id="PCounter">15</label>
                    <Graphic/>
                </div>
    
                <div className="row">
                    <span id="ProgressBar"/>
                    <h5>50%</h5>
                </div>
            </div>
        )
    }
    return(
        <div id="ProjectChip" className={active()}>
            <label>{self.title}</label>
        </div>
    )
}

function Graphic() {
    return (
        <div>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            viewBox="0 0 300 300"
            id="ProjectGraphic"
            >
            <path
                fill="var(--accent-light)"
                strokeWidth="0.6"
                d="M309.72 29.082l.953-41.899-326.619 1.905Q-11.006 150 28.516 157.549c39.521 7.55 44.259-35.045 71.712 14.369 19.044 34.28 46.08 57.445 79.188 57.445 35.66 0 76.269-40.642 84.597-91.726 9.944-60.993 37.468-93.45 45.707-108.555"
                transform="translate(11.006)"
            ></path>
            </svg>

        </div>
    );
  }