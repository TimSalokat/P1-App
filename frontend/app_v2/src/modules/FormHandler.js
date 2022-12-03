
import React from "react";

import { BiSend } from "react-icons/bi";

import { Global, Local } from "../functionality/functions";
import { todos,projects } from "../functionality/modules";

import "../css/modules/Forms.css"

export function FormHandler() {

    return (
        <div id="FormContainer">
            <Form/>
        </div>
    )
}

const Form = (props) => {

    if(Global.newForm && Global.form === "EditTodo"){
        Global.formInputs = {...Global.formArgs[0]};
        Global.setNewForm = false;
    }

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const closeForm_helper = (event) => {
        var form = document.getElementById("input_form");
        try{event.preventDefault()}catch{}
        Local.closeForm();
        Global.setFormInputs = {};
        form.reset();
    }

    /* eslint-disable */
    React.useEffect(() => {
        Global.setFormRerender = forceUpdate;
        Global.setClearForm = closeForm_helper;
      }, [])
    /* eslint-enable */


    // * --- Adding Todos ---
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
    }
    

    //* --- Adding Projects ---    
    else if(Global.form === "AddProject"){

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

    //* --- Edit Todos ---
    else if(Global.form === "EditTodo") {

        function submit_helper(event){
            var form = document.getElementById("input_form");
            event.preventDefault();
            if(Global.formInputs.title){
                todos.edit(Global.formInputs);
                closeForm_helper();
            }
            form.reset();
        }

        return(
            <FloatyBase>
                <input id="MainInput"
                    type="text"
                    placeholder="Title"
                    value={Global.formInputs.title}
                    onChange={(e) => {
                        Global.formInputs.title = e.target.value;
                        Global.formRerender();
                    }}
                />

                <textarea id="DescriptionInput"
                    placeholder="Description"
                    value={Global.formInputs.description}
                    onChange={(e) =>{
                        Global.formInputs.description = e.target.value;
                        Global.formRerender();
                }}/>

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
            </FloatyBase>
        )
    }
    // console.warn("Error could'nt open form with name: " + Global.form);
}

const BottomBase = (props) => {
    return (
        <form className="bottomForm" id="input_form">
            <div className="Header" id="FormHeader">
                <label>{props.label}</label>
            </div>
            {props.children}
        </form>
    )
}

const FloatyBase = (props) => {
    return (
        <form className="floatyForm" id="input_form">
            {props.children}
        </form>
    )
}

const ProjectOption = (self) => {
    const active = () => {
        if(Global.formInputs.project === undefined) Global.formInputs.project = Global.activeproject;
        return Global.formInputs.project === self.title ? "active" : "";
    }

    return (
        <label 
            id="Chip" 
            className={active()} 
            onClick={() => {
                Global.formInputs.project = self.title;
                Global.formRerender();
            }}
        >
         {self.title} 
        </label>
    )
}