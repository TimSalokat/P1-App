import React from "react";
import "../css/Todo.css";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdDone} from "react-icons/md";

function TodoItem(self) {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function isFinished() {
        if (self.todo.finished) {
            // return (<MdCheckBox className="todocheckbox_finished" />);
            return " finished"
        } else return " notFinished"
    }

    function finishTodo_helper(index) {
        self.todo.finished = !self.todo.finished;
        forceUpdate();
        self.delTodo(index);
    }

    return (
        <div className={self.todo.finished ? "todoItemContainer taskFinished" : "todoItemContainer taskActive"}>
            <div className={"checkBox" + isFinished()} onClick={() => finishTodo_helper(self.index)}>
                <MdDone className={"icon" + isFinished()}/>
            </div>
            <span className="todoSeperator"/>
            <div>
                <h4>{self.heading.substring(0, 50) + (self.heading.length >= 50 ? "..." : "")}</h4>
            </div>
        </div>
    )
}

export default TodoItem;