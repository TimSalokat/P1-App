import React from "react";

import { Global, Server } from "./functions";
import "../css/Todo.css";
import { MdDone, MdDeleteForever } from "react-icons/md";

function TodoItem(self) {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function isFinished() {
        if (self.todo.finished) {return " finished"}
        else return " notFinished"
    }

    function finishTodo_helper() {
        self.todo.finished = !self.todo.finished;
        forceUpdate();
    }

    function delTodo_helper(index) {
        self.delTodo(index);
    }

    function editTodo_helper() {
        Global.setOverlayProps = {
            heading_one: "Edit",
            heading_two: "Todo",
            main_placeholder: "Title",
            desc_placeholder: "Description",
            main: self.heading,
            desc: self.description,
            index: self.index,
            show_desc: true,
            on_commit: Server.editTodo,
        }
        Global.formRerender();
        Global.setOverlayActive = true;        
    }

    const displayDescription = () => {
        if(self.description === ""){return("No description")}
        return(self.description);
    }

    return (
        <div
            className={self.todo.finished ? "todoItemContainer taskFinished" : "todoItemContainer taskActive"}
        >
            <div className={"checkBox" + isFinished()} onClick={() => {
                finishTodo_helper(self.index);
                Global.todosRerender();
                }}>
                <MdDone className={"icon" + isFinished()}/>
            </div>

            <span id="todoItemSeperator"/>

            <div className="todoItemTextContainer">
                <h4 onClick={() => editTodo_helper()}>{self.heading}</h4>
                <p  onClick={() => editTodo_helper()}
                    style={{gridArea:"Project", alignSelf:"center",
                    color:"var(--main_accent)", textAlign:"right", textTransform:"capitalize"}}>
                    {self.todo.project}
                </p>
                <p>{displayDescription()}</p>
                <div>
                    <MdDeleteForever id="todoDeleteIcon" onClick={() => delTodo_helper(self.index)} />
                </div>
            </div>
        </div>
    )
}

export default TodoItem;