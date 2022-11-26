
import React from "react";

import { BiSend } from "react-icons/bi";

import { Global, Local } from "../functionality/functions";

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
    React.useState(() => {
      Global.setFormRerender = forceUpdate;
    }, [])

    const closeForm_helper = (event) => {
        var form = document.getElementById("input_form");
        try{event.preventDefault()}catch{}
        Local.closeForm();
        Global.setFormInputs = {};
        form.reset();
    }

    if(Global.form === "AddTodo"){

        function submit_helper(event){
            var form = document.getElementById("input_form");
            event.preventDefault();
            if(Global.formInputs.title){
                Local.addTodo(Global.formInputs);
                closeForm_helper();
            }
            form.reset();
        }

        return (
            <>
            <BottomBase label="Add Todo" 
                closeForm_helper={closeForm_helper} 
                submit={submit_helper}
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

                <div className="ProjectSelect">
                    <ProjectOption title={"All Todos"}/>
                    {Global.projects.map((project) => {
                        return(
                            <ProjectOption 
                                title={project.title}
                                key={project.index}
                                />
                        )
                    })}
                </div>
            </BottomBase>
            </>
        )
    }else if(Global.form === "AddProject"){

        function submit_helper(event){
            var form = document.getElementById("input_form");
            event.preventDefault();
            if(Global.formInputs.title){
                Local.addProject(Global.formInputs);
                closeForm_helper();
            }
            form.reset();
        }

        return(
            <BottomBase label="Add Project" 
                closeForm_helper={closeForm_helper}
                submit={submit_helper}>
                <input type="text" 
                    id="MainInput"
                    placeholder="Title" 
                    value={Global.formInputs.title} 
                    onChange={(e) =>{
                        Global.formInputs.title = e.target.value;
                    }}/>
                
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
                <button className="button" onClick={props.submit}>
                    <BiSend id="Icon" style={{rotate:"270deg", fontSize:"33px"}}/>
                </button>
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