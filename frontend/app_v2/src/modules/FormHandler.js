
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
    }

    if(Global.form === "AddTodo"){
        return (
            <BottomBase label="Add Todo" closeForm_helper={closeForm_helper}>
                <input type="text" placeholder="Title"></input>
                <textarea placeholder="Description"></textarea>
            </BottomBase>
        )
    }else if(Global.form === "AddProject"){
        return(
            <BottomBase label="Add Project" closeForm_helper={closeForm_helper}>
            </BottomBase>
        )
    }
    console.warn("Error could'nt open form with name: " + Global.form);
}

const BottomBase = (props) => {
    return (
        <div className="bottomForm">
            <div className="Header">
                <label>{props.label}</label>
                <div className="row">
                    <button className="button_secondary small" onClick={() => props.closeForm_helper()}>Cancel</button>
                    <button className="small">Submit</button>
                </div>
            </div>
            {props.children}
        </div>
    )
}