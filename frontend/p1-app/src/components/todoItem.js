import React from "react";

import "../css/Todo.css";
import { MdDone} from "react-icons/md";

function TodoItem(self) {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function isFinished() {
        if (self.todo.finished) {return " finished"}
        else return " notFinished"
    }

    function finishTodo_helper(index) {
        self.todo.finished = !self.todo.finished;
        forceUpdate();
        self.delTodo(index);
    }

    const displayDescription = () => {
        if(self.description === ""){return("No description")}
        return(self.description);
    }

    return (
        <div
            className={self.todo.finished ? "todoItemContainer taskFinished" : "todoItemContainer taskActive"}
        >
            <div className={"checkBox" + isFinished()} onClick={() => finishTodo_helper(self.index)}>
                <MdDone className={"icon" + isFinished()}/>
            </div>

            <span id="todoItemSeperator"/>

            <div onClick={() => console.log(self.todo)} className="todoItemTextContainer">
                <h4>{self.heading}</h4>
                <p style={{gridArea:"Project", alignSelf:"center",
                 color:"var(--main_accent)", textAlign:"right"}}>
                    {self.todo.project}
                </p>
                <p>{displayDescription()}</p>
            </div>
        </div>
    )
}

export default TodoItem;