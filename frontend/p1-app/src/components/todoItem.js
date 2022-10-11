import React from "react";
import "../css/Todo.css";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

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

    function finishTodo_helper(index) {
        self.todo.finished = !self.todo.finished;
        forceUpdate();
        self.delTodo(index);
    }

    return (
        <div className={self.todo.finished ? "todoItemContainer taskFinished" : "todoItemContainer taskActive"}>
            <div onClick={() => finishTodo_helper(self.index)}>
                {isFinished()}
            </div>
            <div>
                <p>{self.heading.substring(0, 50) + (self.heading.length >= 50 ? "..." : "")}</p>
            </div>
        </div>
    )
}

export default TodoItem;