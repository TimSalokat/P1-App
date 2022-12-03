
import React from "react";
import "../css/Settings.css";

import { Global, Saving, Server } from "../functionality/functions";
import { projects, log } from "../functionality/modules";

import Collapsible from "../modules/Collapsible";

export default function Settings_Page() {

    const devRun = (func) => {func();}   

    const [new_backend, setNewBackend] = React.useState("");
    const [project_toDelete, setProjectToDelete] = React.useState("");

    const color_options = ["blue", "red", "orange", "green", "pink", "purple", "copper"]

    return(
        <div id="Settings_Page">

            <div className="Section">
                <label>Quick Actions</label>
                <div className="grid2">
                    <button className="stretch" onClick={() => devRun(Server.ping)}>Ping Server</button>
                    <button className="stretch" onClick={() => devRun(Server.fetchTodos)}>Get Todos</button>
                    <button disabled className="stretch" onClick={() => devRun(Server.fetchMain)}>Get Main</button> 

                    <button className="button_secondary stretch" onClick={() => devRun(Server.restart)}>Update Api</button>
                    <button className="button_secondary stretch" onClick={() => devRun(Server.getVersion)}>Get Server Version</button>
                </div>
            </div>

            <div className="Section">
                <label>Stuff</label>
                <p>{Global.backend}</p>
                <div className="grid2" style={{gridTemplateColumns: "75% 25%"}}>
                    <input 
                        className="stretch" 
                        placeholder="New Backend"
                        value={new_backend}
                        onChange={(e) => setNewBackend(e.target.value)}
                        />

                    <button className="small stretch" 
                        onClick={() => {
                            Global.setBackend = new_backend;
                            setNewBackend("");
                            console.log(Global.backend);
                    }}> Apply </button>

                    <select className="stretch" onChange={(e) => setProjectToDelete(e.target.value)}>
                        {projects.projects.map((project) => {
                                return(
                                <option key={project.uuid}>
                                    {project.title}
                                </option>)
                            })}</select>

                    <button className="small stretch" 
                        onClick={() => {
                            projects.delete(project_toDelete);
                            setProjectToDelete("");
                    }}> Delete </button>
                </div>
            </div>

            <div className="Section">
                <label> Theme </label>

                <button onClick={() => {
                    Global.mode = !Global.mode;
                    Global.appRerender();
                    Saving.saveLocal(Global.COLOR_SCHEME_KEY, Global.mode);
                }}>Change Scheme</button>
                
                <div id="ColorContainer">
                    {color_options.map((color) => {
                        return(
                            <button 
                                key={color}
                                className="small" 
                                style={{backgroundColor:color}} 
                                onClick={() => {
                                    Global.accent = color;
                                    Global.appRerender();
                                    Saving.saveLocal(Global.COLOR_ACCENT_KEY, color);
                                    log.add("Set Accent: " + color, "Color");
                                }}/>
                    )})}
                </div>
            </div>

            <Collapsible label="Testing">
                <h4>Hello</h4>
                <h4>Hello</h4>
                <h4>Hello</h4>
            </Collapsible>
            <Collapsible label="wow">
                <h4>Hello</h4>
                <h4>Hello</h4>
                <h4>Hello</h4>
            </Collapsible>

        </div>
    )
}