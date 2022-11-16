import React from "react";
import {HiPlus} from "react-icons/hi";
import { MdArrowCircleUp, MdDeleteForever } from "react-icons/md";

import { Global, Local, Server} from "./functions";

// import {motion, AnimatePresence} from "framer-motion";

import TodoItem from "./todoItem";
import SvgAllDone from '../components/svg/SvgAllDone';

/* eslint-disable */

const ProjectContainer = (self) => {

    return (
    <div className="projectContainer">
        <Project 
            title="All"
            todoCount={Global.displayedTodos.length}/>

        {Global.projects.map((project) => (
            <Project
                key={project.index}
                title={project.title}
            />
        ))}

        <div className="projectCard" id="addProjectButton" onClick={() => {
            if (Global.serverReachable){
                Global.setOverlayProps = {
                    heading_one: "Add",
                    heading_two: "Project",
                    main_placeholder: "Project Title",
                    desc_placeholder: "none",
                    show_desc: false,
                    show_project: false,
                    on_commit: Server.addProject,
            }}else {
                Global.setOverlayProps = {
                    type: "display_projects",
            }}
            Global.formRerender();
            Global.setOverlayActive = true;
        }}>
            <HiPlus id="addTodoIcon" style={{
                top:"20px", fontSize:"3rem"
            }}/>

        </div>
    </div>
    )
}

const Project = (self) => {

    let filterTodos = () => {
        if(self.title === "All") {return Global.displayedTodos}
        let filtered = Global.displayedTodos.filter((todo) => todo.project === self.title)
        return filtered;
    }

    let finishedTodos = () => {
        let filtered = filterTodos();
        let finished = filtered.filter((todo)=>todo.finished === true);
        if(finished.length === 0) return 0;
        return finished.length / filtered.length * 100;
    }

    return(
      <div className="projectCard" onClick={() => {
        Global.setFilter = self.title;
        if(Global.activePage !== "Todo") Local.link("Todo");}}>

        <span id="projectCardDecorator"/>

        <h2>{self.title}</h2>
        <h3>{filterTodos().length}</h3>

        <p>Finished</p>
        <p></p>

        <div id="projectProgressBar">
            <span id="projectProgressBarFill" style={{width: finishedTodos()}}/>
        </div>
        <p>{finishedTodos().toFixed(0)}%</p>


      </div>
    )
}
const SmallProject = (self) => {

    return(
      <div className="projectCard small">
        <h2>{self.title}</h2>
        <div>
            <MdDeleteForever id="todoDeleteIcon" onClick={() => delTodo_helper(self.uuid)} />
        </div>
      </div>
    )
}

const TodoContainer = (self) => {

    let filteredTodos = () => {
        if(Global.activeFilter === "All"){return Global.displayedTodos}
        let filtered = Global.displayedTodos.filter((todo) => todo.project === Global.activeFilter)
        return filtered
    }

    let unfinishedTodos = () => {
        let unfinished = filteredTodos().filter((todo)=>todo.finished === false);
        return unfinished;
    }

    let finishedTodos = () => {
        let finished = filteredTodos().filter((todo)=>todo.finished === true);
        return finished;
    }

    return (
        <div className="todoContainer">
            <div className={Global.displayedTodos.length === 0 ? "todoPageEmpty shown" : "todoPageEmpty hidden"}>
                <SvgAllDone/>
                <h2> No Todos </h2>
            </div>
            {unfinishedTodos().map((todo) => (
                <TodoItem 
                key={todo.uuid}
                uuid={todo.uuid}
                todo={todo}
                heading={todo.heading}
                description={todo.description}
                delTodo={self.delTodo}
                project={self.project}
                />
            ))}

            {finishedTodos().map((todo) => (
                <TodoItem 
                key={todo.uuid}
                uuid={todo.uuid}
                todo={todo}
                heading={todo.heading}
                description={todo.description}
                delTodo={self.delTodo}
                project={self.project}
                />
            ))}
        </div>
    )
}

const SectionSeperator = (self) => {

    let displayed_colored = self.colored;
    let displayed_label = self.label;
    if(self.colored === "All"){
        displayed_label = "All";
        displayed_colored = " Todos";
    }

    return (
        <div id="SectionSeperator">
            <span id="SectionSpan"/> 
            <label> {displayed_label} 
                <span style={{color:"var(--main_accent)", fontSize:"inherit"}}> 
                {displayed_colored} 
                </span>
            </label>
        </div>
    )
}


const Form = () => {

    const [mainTitle, setMainTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [project, setProject] = React.useState("");

    let uuid = Global.overlay.uuid;

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    React.useEffect(() => {
        Global.setFormRerender = forceUpdate;
    }, [])

    React.useEffect(() => {
        setMainTitle(Global.overlay.main)
        setDescription(Global.overlay.desc)
    }, [Global.overlay])

    function showDesc(){
        if(!Global.overlay.show_desc){return({display:"none"})}
    }

    function showProject(){
        if(!Global.overlay.show_project){return({display:"none"})}
    }

    if(Global.overlay.type === "display_projects"){
        return (
            <div className="createTodoFormContainer">
                <div className="createTodoForm">

                    {Global.projects.map((project) => (
                        <SmallProject
                            key={project.index}
                            title={project.title}
                        />
                    ))}

                    <form style={{display:"flex",flexDirection:"row", marginTop:"10px"}}>

                        <input 
                        placeholder="New Project"
                        type="text"
                        value={mainTitle}
                        onChange={(e) => setMainTitle(e.target.value)}
                        />

                        <MdArrowCircleUp 
                        id="todoDeleteIcon" 
                        style={{fontSize:"2rem"}}
                        onClick={() => {
                            Server.addProject(mainTitle);
                            setMainTitle("");
                        }}
                        />

                    </form>

                    <div className="createTodoBtnContainer">
                        <button onClick={() => {
                            setMainTitle("");
                            setDescription("");
                            // Global.setOverlayProps = {};
                            Global.setOverlayActive = false;
                        }}>Close</button>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="createTodoFormContainer">
            <div className="createTodoForm">
            <form>

                <div className="createTodoFormHeading">
                <h2> {Global.overlay.heading_one} </h2>
                <h2> {Global.overlay.heading_two} </h2>
                </div>

                <input 
                placeholder={Global.overlay.main_placeholder}
                type="text"
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
                />

                <textarea 
                style={showDesc()}
                placeholder={Global.overlay.desc_placeholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <select 
                className="DevSelect" 
                style={showProject()}
                onChange={(e) => setProject(e.target.value)}
                >

                    <option>General</option>
                    {
                        Global.projects.map((project) => (
                            <option>{project.title}</option>
                        ))                        
                    }
                </select>

            </form>

            <div className="createTodoBtnContainer">
                <button onClick={() => {
                    setMainTitle("");
                    setDescription("");
                    // Global.setOverlayProps = {};
                    Global.setOverlayActive = false;
                }}>Cancel</button>

                <button onClick={() => {
                    setMainTitle("");
                    setDescription("");
                    // Global.setOverlayProps = {};
                    Global.overlay.on_commit(mainTitle, description, project, uuid);
                    Global.setOverlayActive = false;
                }}>Submit</button>
                </div>

            </div>
        </div>
    )
}

export {ProjectContainer, TodoContainer, SectionSeperator, Form}