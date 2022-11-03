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
            todoCount={Global.displayedTodos.length}
            unfinishedCount="4"
            setActiveProject={self.setActiveProject}
        />

        {Global.projects.map((project) => (
            <Project
                key={project.index}
                title={project.title}
            />
        ))}

        <div className="projectCard" style={{
            width:"90px", margin:"0px 35px",
            display:"flex", justifyContent:"center",
            alignItems:"center"
        }} onClick={() => {
            Server.addProject("Test")
        }}>
            <HiPlus id="addTodoIcon" style={{
                top:"20px", fontSize:"3rem"
            }}/>

        </div>
    </div>
    )
}

const Project = (self) => {
    return(
      <div className="projectCard" onClick={() => {
        // self.setActiveProject(self.title);
        if(Global.activePage !== "Todo") Local.link("Todo");}}
        >

        <span id="projectCardDecorator"/>

        <h2>{self.title}</h2>
        <h3>{self.todoCount}</h3>

        <p>Finished</p>
        <p></p>

        <div id="projectProgressBar">
            <span id="projectProgressBarFill"/>
        </div>
        <p>{self.unfinishedCount}%</p>


      </div>
    )
}

const TodoContainer = (self) => {
    return (
        <motion.div layout className="todoContainer">
            <div className={Global.displayedTodos.length === 0 ? "todoPageEmpty shown" : "todoPageEmpty hidden"}>
                <SvgAllDone/>
                <h2> No Todos </h2>
            </div>
            <AnimatePresence>
                {Global.displayedTodos.map((todo) => (
                    <TodoItem 
                    key={todo.index}
                    todo={todo}
                    heading={todo.heading}
                    description={todo.description}
                    index={todo.index}
                    delTodo={self.delTodo}
                    />
                ))}
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

export {ProjectContainer, TodoContainer, SectionSeperator}