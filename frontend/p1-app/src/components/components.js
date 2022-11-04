import React from "react";
import {HiPlus} from "react-icons/hi";

import { Global, Local, Server} from "./functions";

import {motion, AnimatePresence} from "framer-motion";

import TodoItem from "./todoItem";
import SvgAllDone from '../components/svg/SvgAllDone';

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
                    on_commit: Server.addProject,
                }
                Global.formRerender();
                Global.setOverlayActive = true;
            }            
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
        <p>{finishedTodos()}%</p>


      </div>
    )
}

const TodoContainer = (self) => {

    let filteredTodos = () => {
        if(Global.activeFilter === "All"){return Global.displayedTodos}
        let filtered = Global.displayedTodos.filter((todo) => todo.project === Global.activeFilter)
        return filtered
    }

    return (
        <motion.div layout className="todoContainer">
            <div className={Global.displayedTodos.length === 0 ? "todoPageEmpty shown" : "todoPageEmpty hidden"}>
                <SvgAllDone/>
                <h2> No Todos </h2>
            </div>
            <AnimatePresence>
                {filteredTodos().map((todo) => (
                    <TodoItem 
                    key={todo.index}
                    todo={todo}
                    heading={todo.heading}
                    description={todo.description}
                    index={todo.index}
                    delTodo={self.delTodo}
                    />
                ))}
                {/* {Global.displayedTodos.map((todo) => (
                    <TodoItem 
                    key={todo.index}
                    todo={todo}
                    heading={todo.heading}
                    description={todo.description}
                    index={todo.index}
                    delTodo={self.delTodo}
                    />
                ))} */}
            </AnimatePresence>
        </motion.div>
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

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    React.useEffect(() => {
        Global.setFormRerender = forceUpdate;
    }, [])

    function showDesc(){
        if(!Global.overlay.show_desc){
            return({display:"none"})
        }
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

            </form>

            <div className="createTodoBtnContainer">
                <button onClick={() => {
                    setMainTitle("");
                    setDescription("");
                    Global.setOverlayActive = false;
                }}>Cancel</button>

                <button onClick={() => {
                    setMainTitle("");
                    setDescription("");
                    Global.overlay.on_commit(mainTitle, description);
                    Global.setOverlayActive = false;
                }}>Submit</button>
                </div>

            </div>
        </div>
    )
}

export {ProjectContainer, TodoContainer, SectionSeperator, Form}