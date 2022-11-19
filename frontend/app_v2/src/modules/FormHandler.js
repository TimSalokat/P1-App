
import React from "react";
import { Global, Local } from "../functionality/functions";

import "../css/Forms.css"

export function FormHandler() {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    React.useState(() => {
      Global.setFormRerender = forceUpdate;
    }, [])

    return (
        <div id="FormContainer">
            <Form/>
        </div>
    )
}

const Form = () => {

    const closeForm_helper = () => {
        Local.closeForm();
        Global.formInputs = {};
    }

    if(Global.form === "AddTodo"){
        return (
            <BottomBase label="Add Todo" 
                closeForm_helper={closeForm_helper} 
                submit={() => {
                    if(Global.formInputs.title){
                        console.log(Global.formInputs);
                        closeForm_helper();
                    }
                }}
            >
                <input type="text" 
                    placeholder="Title" 
                    value={Global.formInputs.title} 
                    onChange={(e) =>{
                        Global.formInputs.title = e.target.value;
                    }}/>

                <div className="Header">
                    <textarea placeholder="Description"
                        value={Global.formInputs.description} 
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
                    <ProjectOption title="Unassigned"/>
                    <ProjectOption title="Ideas"/>
                    <ProjectOption title="Testing"/>
                </div>
            </BottomBase>
        )
    }else if(Global.form === "AddProject"){
        return(
            <BottomBase label="Add Project" closeForm_helper={closeForm_helper}>
                <input type="text" 
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
        <div className="bottomForm">
            <div className="Header">
                <label>{props.label}</label>
                <div className="row">
                    <button className="button_secondary small" onClick={() => props.closeForm_helper()}>Cancel</button>
                    <button className="small" onClick={props.submit}>Submit</button>
                </div>
            </div>
            {props.children}
        </div>
    )
}

const ProjectOption = (self) => {

    const active = () => {
        return Global.formInputs.selectedProject === self.title ? "active" : "";
    }

    return (
        <label 
            id="ProjectChip" 
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