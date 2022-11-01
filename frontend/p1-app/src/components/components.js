import React from "react";

import { Global } from "./functions";

import {motion, AnimatePresence} from "framer-motion";

import TodoItem from "./todoItem";
import SvgAllDone from '../components/SvgAllDone';

const ProjectContainer = (self) => {
    return (
    <div className="projectContainer">
        <Project 
            title="All"
            todoCount="15"
            unfinishedCount="4"
            setActiveProject={self.setActiveProject}
        />
        <Project 
            title="Development"
            todoCount="12"
            unfinishedCount="2"
            setActiveProject={self.setActiveProject}
        />
        <Project 
            title="Testing"
            todoCount="3"
            unfinishedCount="3"
            setActiveProject={self.setActiveProject}
        />
    </div>
    )
}

const Project = (self) => {
    return(
      <div className="projectCard" onClick={() => self.setActiveProject(self.title)}>
        <h2>{self.title}</h2>
        <p>Total Todos: {self.todoCount} 
          <br/>Unfinished Todos: {self.unfinishedCount}</p>
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
        <div id="todoSection">
            <span id="todoSeperator"/> 
            <label> {displayed_label} 
                <span style={{color:"var(--main_accent)", fontSize:"inherit"}}> 
                {displayed_colored} 
                </span>
            </label>
        </div>
    )
}

export {ProjectContainer, TodoContainer, SectionSeperator}