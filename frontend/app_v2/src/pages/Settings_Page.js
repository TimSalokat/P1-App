
import React from "react";
import "../css/Settings.css";

import { Global, Saving, Server } from "../functionality/functions";
import { projects, log } from "../functionality/modules";

import Collapsible from "../modules/Collapsible";

export default function Settings_Page() {

    const devRun = (func) => {func();}   

    const [new_backend, setNewBackend] = React.useState("");
    const [project_toDelete, setProjectToDelete] = React.useState("");

    const color_options = ["blue", "red", "orange", "green", "pink", "purple"]

    let initialMode = Global.mode;

    return(
        <div id="Settings_Page">

            <Collapsible label=" Quick Actions">
                <div className="grid2">
                    <button className="stretch" onClick={() => devRun(Server.ping)}>Ping Server</button>
                    <button className="stretch" onClick={() => devRun(Server.fetchTodos)}>Get Todos</button>
                    <button disabled className="stretch" onClick={() => devRun(Server.fetchMain)}>Get Main</button> 
                    <button className="stretch" onClick={() => projects.add({title: "Testo " + projects.projects.length})}>Add Project</button> 

                    <button className="button_secondary stretch" onClick={() => devRun(Server.restart)}>Update Api</button>
                    <button className="button_secondary stretch" onClick={() => devRun(Server.getVersion)}>Get Server Version</button>
                </div>
            </Collapsible>

            <Collapsible label="Inputs">
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
                            log.add("New Backend: " + Global.backend, "Error");
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
            </Collapsible>

            <Collapsible label="Theme">
                <div className="Header">
                    <label style={{padding:"5px", margin:"10px"}}>Dark Mode</label>
                    <Switch 
                        onChange={(value) => {
                            Global.mode = value;
                            Global.appRerender();
                            Saving.saveLocal(Global.COLOR_SCHEME_KEY, Global.mode);
                        }} 
                        initial={Global.mode}
                    />
                </div>
                
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
                                    log.add("Set Accent: " + color, "Info");
                                }}/>
                    )})}
                </div>
            </Collapsible>

            <Collapsible label="Log Settings">
                <LogOption title="Info"/>
                <LogOption title="Warning"/>

                <LogOption title="Todos"/>
                <LogOption title="Projects"/>
                <LogOption title="Link"/>
            </Collapsible>

        </div>
    )
}

const LogOption = (props) => {

    return (
        <div id="LogOption">
            <label> Show {props.title} </label>
            <Switch 
                onChange={(value) => {
                    if(value) log.add("Now showing " + props.title, "Warning")
                    else log.add("Not showing " + props.title + " anymore", "Warning")
                    log.show[props.title] = value;
                }} 
                initial = {log.show[props.title]}
            />
        </div>
    )
}

const Switch = (props) => {
    const [active, setActive] = React.useState(props.initial);
    function isActive() {return active ? " active" : "";}

    React.useEffect(() => {
        setActive(props.initial);
    }, [props.initial])

    function onClick_handler() {
        props.onChange(!active);
        setActive(!active);
    }

    return (
        <div id="Switch" className={isActive()} onClick={() => onClick_handler()}/>
    )
}