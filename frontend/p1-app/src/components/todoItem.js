import React from "react";
import "../css/Todo.css";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

import {finishTodo} from "../components/functions";

function TodoItem(self) {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function isFinished() {
        if (self.todo.finished) {
            return (<MdCheckBox className="todocheckbox_finished" />);
        } else {
            return (<MdCheckBoxOutlineBlank className="todocheckbox"/>);
        }
    }

    const finishTodo_helper = async (index) => {
        //client
        forceUpdate();
        self.todo.finished = !self.todo.finished;

        //server
        await finishTodo(index)
    }
    
    return (
        <div className="todoItemContainer">
            <div onClick={() => finishTodo_helper(self.index)}>
                {isFinished()}
            </div>
            
            <div>
                <p className={self.todo.finished ? "taskFinished" : "taskActive"}>
                    {self.heading.substring(0, 50) + (self.heading.length >= 50 ? "..." : "")}
                </p>
            </div>
        </div>
    )
}

export default TodoItem;