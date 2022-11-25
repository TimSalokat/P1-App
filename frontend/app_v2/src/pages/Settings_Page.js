
import React from "react";
import { Global, Local, Server } from "../functionality/functions";

import "../css/Settings.css";

export default function Settings_Page() {

    const devRun = (func) => {
        func();
    }   

    const [new_backend, setNewBackend] = React.useState("");
    const [project_toDelete, setProjectToDelete] = React.useState("");

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
                        {Global.projects.map((project) => {
                                return(
                                <option key={project.uuid}>
                                    {project.title}
                                </option>)
                            })}</select>

                    <button className="small stretch" 
                        onClick={() => {
                            Local.deleteProject(project_toDelete);
                            setProjectToDelete("");
                    }}> Delete </button>
                </div>
            </div>

        </div>
    )
}