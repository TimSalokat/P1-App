
import React from "react";

import { BiSend } from "react-icons/bi";

import { Global, Local, Logging } from "../functionality/functions";
import { todos,projects } from "../functionality/modules";

import "../css/Forms.css"

export function FormHandler() {

    return (
        <div id="FormContainer">
            <Form/>
        </div>
    )
}

const Form = () => {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const closeForm_helper = (event) => {
        var form = document.getElementById("input_form");
        try{event.preventDefault()}catch{}
        Local.closeForm();
        Global.setFormInputs = {};
        form.reset();
    }

    React.useState(() => {
        Global.setFormRerender = forceUpdate;
        Global.setClearForm = closeForm_helper;
      }, [])

    if(Global.form === "AddTodo"){

        function submit_helper(event){
            var form = document.getElementById("input_form");
            event.preventDefault();
            if(Global.formInputs.title){
                todos.add(Global.formInputs);
                closeForm_helper();
            }
            form.reset();
        }

        return (
            <>
            <BottomBase label="Add Todo" 
                closeForm_helper={closeForm_helper} 
                >

                <input type="text" 
                    id="MainInput"
                    placeholder="Title" 
                    onChange={(e) =>{
                        Global.formInputs.title = e.target.value;
                    }}/>

                <div className="Header">
                    <input placeholder="Description"
                        onChange={(e) =>{
                            Global.formInputs.description = e.target.value;
                        }}/>

                    <select
                        onChange={(e) =>{
                            Global.formInputs.priority = e.target.value;
                        }}>
                        <option>Priority 1</option>
                        <option>Priority 2</option>
                        <option>Priority 3</option>
                    </select>
                </div>

                <div className="Header">
                    <div className="ProjectSelect">
                        <ProjectOption title={"All Todos"}/>
                        {projects.projects.map((project) => {
                            return(
                                <ProjectOption 
                                    title={project.title}
                                    key={project.index}
                                    />
                            )
                        })}
                    </div>

                    <button className="button" id="SubmitButton" onClick={submit_helper}>
                        <BiSend id="Icon" style={{rotate:"270deg", fontSize:"inherit"}}/>
                    </button>

                </div>
            </BottomBase>
            </>
        )
    }else if(Global.form === "AddProject"){

        function submit_helper(event){
            var form = document.getElementById("input_form");
            event.preventDefault();
            if(Global.formInputs.title){
                projects.add(Global.formInputs);
                Global.activeproject = Global.formInputs.title;
                closeForm_helper();
            }
            form.reset();
        }

        return(
            <BottomBase label="Add Project" 
                closeForm_helper={closeForm_helper}
                submit={submit_helper}>
                <div className="Header">

                <input type="text" 
                    id="MainInput"
                    placeholder="Title" 
                    value={Global.formInputs.title} 
                    onChange={(e) =>{
                        Global.formInputs.title = e.target.value;
                    }}/>
                <button className="button" id="SubmitButton" onClick={submit_helper}>
                    <BiSend id="Icon" style={{rotate:"270deg", fontSize:"inherit"}}/>
                </button>
                
                </div>
                
            </BottomBase>
        )
    }
    // console.warn("Error could'nt open form with name: " + Global.form);
}

const BottomBase = (props) => {
    return (
        <form className="bottomForm" id="input_form">
            <div className="Header" id="FormHeader">
                <label>{props.label}</label>
                {/* <button className="button_secondary small" onClick={props.closeForm_helper}>Cancel</button> */}
            </div>
            {props.children}
        </form>
    )
}

const ProjectOption = (self) => {

    const active = () => {
        if(Global.formInputs.selectedProject === undefined) Global.formInputs.selectedProject = Global.activeproject;
        return Global.formInputs.selectedProject === self.title ? "active" : "";
    }

    return (
        <label 
            id="Chip" 
            className={active()} 
            onClick={() => {
                Global.formInputs.selectedProject = self.title; 
                Global.formRerender();
            }}
        >
         {self.title} 
        </label>
    )
}