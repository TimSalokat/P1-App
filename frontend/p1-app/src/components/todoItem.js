import React from "react";

import { Global, Local, Saving, Server } from "./functions";
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

        if(Global.serverReachable){
            Server.finishTodo(self.uuid); 
        }else{
            Global.localActions.push({
                "action": "todo_changeFinished",
                "uuid": self.uuid,
                "state": self.todo.finished,
            });
            Saving.saveLocal(Global.LOCAL_ACTIONS_KEY, Global.localActions);
        }
        
        Saving.saveLocal(Global.TODO_KEY, Global.displayedTodos);
    }

    function delTodo_helper(uuid) {
        self.delTodo(uuid);
    }

    function editTodo_helper() {
        Global.setOverlayProps = {
            uuid: self.uuid,
            heading_one: "Edit",
            heading_two: "Todo",
            main_placeholder: "Title",
            desc_placeholder: "Description",
            main: self.heading,
            desc: self.description,
            show_desc: true,
            show_project: true,
            on_commit: Local.editTodo,
        }

        if(Global.serverReachable){
            Global.overlay.on_commit = Server.editTodo
        }

        Global.formRerender();
        Global.setOverlayActive = true;        
    }

    const displayDescription = () => {
        if(self.description === "" || self.description === undefined){return("No description")}
        return(self.description);
    }

    return (
        <div
            className={self.todo.finished ? "todoItemContainer taskFinished" : "todoItemContainer taskActive"}
        >
            <div className={"checkBox" + isFinished()} onClick={() => {
                finishTodo_helper();
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
                    <MdDeleteForever id="todoDeleteIcon" onClick={() => delTodo_helper(self.uuid)} />
                </div>
            </div>
        </div>
    )
}

export default TodoItem;