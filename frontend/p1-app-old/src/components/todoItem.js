import React from "react";
import "../css/Todo.css";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

function TodoItem(self) {
    function isFinished() {
        if (self.finished) {
            return (<MdCheckBox className="todocheckbox" />);
        } else {
            return (<MdCheckBoxOutlineBlank className="todocheckbox" onClick={() => self.finishTodo(self.index)}/>);
        }
    }
    
    return (
        <div className="todoItemContainer">
            <div>
                {isFinished()}
            </div>
            <div>
                <p className={self.finished ? "taskFinished" : "taskActive"}>{self.heading.substring(0, 50) + (self.heading.length >= 50 ? "..." : "")}</p>
            </div>
        </div>
    )
}

export default TodoItem;