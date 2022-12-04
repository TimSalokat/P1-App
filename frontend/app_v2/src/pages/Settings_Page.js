
import React from "react";
import "../css/Settings.css";

import { Global, Local, Saving, Server } from "../functionality/functions";
import { todos, projects, log } from "../functionality/modules";

import Collapsible from "../modules/Collapsible";

export default function Settings_Page() {

    const devRun = (func) => {func();}   

    const [new_backend, setNewBackend] = React.useState("");
    const [project_toDelete, setProjectToDelete] = React.useState("");

    const color_options = ["blue", "red", "orange", "green", "pink", "purple"]

    let initialMode = Global.mode;

    return(
        <div id="Settings_Page">

            <Collapsible label="Quick Actions Server">
                <div className="grid2">
                    <button className="stretch" onClick={() => devRun(Server.ping)}>Ping Server</button>
                    <button className="stretch" onClick={() => devRun(Server.fetchTodos)}>Get Todos</button>
                    <button disabled className="stretch" onClick={() => devRun(Server.fetchMain)}>Get Main</button> 


                    <button className="button_secondary stretch" onClick={() => devRun(Server.restart)}>Update Api</button>
                    <button className="button_secondary stretch" onClick={() => devRun(Server.getVersion)}>Get Server Version</button>
                </div>
            </Collapsible>

            <Collapsible label="Quick Actions Client">
                <div className="grid2">
                <button className="stretch" onClick={() => {
                    localStorage.clear();
                }}>Clear localstorage</button> 

                <button className="stretch" onClick={() => {
                    projects.add({title: "Next Version"})
                    projects.add({title: "Bugs"})
                    Local.link("Todos");
                }}>Add Project</button> 

                <button className="button_secondary stretch" onClick={() => {
                    todos.add({title: "No Description"})
                    todos.add({
                        title: "Some Description",
                        description: "The Description",
                    })
                    Local.link("Todos");
                    }}>Add some Todos</button> 
                <button className="button_secondary stretch" onClick={() => {
                    todos.todos.forEach((todo) => {
                        if(todo.finished) todos.delete(todo.uuid);
                    })
                    Local.link("Todos");
                }}>Delete all finished</button>

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

            <Collapsible label="New Backend">
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
                </div>
            </Collapsible>

            <Collapsible label="Information" initial={true}>
                <div id="sysInfoContainer">
                    <label>Backend: {Global.backend} </label>
                    <label>Api reachable: {Global.serverReachable} </label>
                    <label>Api Version: {Global.serverVersion} </label>
                    <label>Client Version: v1.2 </label>
                </div>
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