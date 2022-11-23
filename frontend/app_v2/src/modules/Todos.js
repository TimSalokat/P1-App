
import React from "react";

import "../css/Todos.css";
import {BsCircle} from "react-icons/bs"
import { Global, Local } from "../functionality/functions";

export default function Todos() {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    React.useState(() => {
      Global.setTodosRerender = forceUpdate;
    }, [])


    let getFilteredTodos = () => {
        if(Global.activeproject === "All Todos"){return Global.displayedTodos}
        let filtered = Global.displayedTodos.filter((todo) => todo.project === Global.activeproject)
        return filtered
    }

    let getUnfinishedTodos = () => {
        let unfinished = getFilteredTodos().filter((todo)=>todo.finished === false);
        return unfinished
    }

    let getFinishedTodos = () => {
        let finished = getFilteredTodos().filter((todo)=> todo.finished === true);
        return finished
    }

    return (
        <div className="Section">
            <label>Todos in <span className="text_accent text_bold">{Global.activeproject}</span></label>
            <div className="TodoContainer">
                {getUnfinishedTodos().map((todo) => (
                    <TodoItem 
                    key={todo.uuid}
                    uuid={todo.uuid}
                    todo={todo}
                    title={todo.title}
                    description={todo.description}
                    // delTodo={self.delTodo}
                    />
                ))}
            </div>
            <div className="TodoContainer show-in-todos">
                <label>Finished</label>
                <span className="seperator large" style={{backgroundColor: "var(--base-dark)"}}></span>
                {getFinishedTodos().map((todo) => (
                        <TodoItem 
                        key={todo.uuid}
                        uuid={todo.uuid}
                        todo={todo}
                        title={todo.title}
                        description={todo.description}
                        // delTodo={self.delTodo}
                        />
                    ))}

            </div>
        </div>
    )
}

function TodoItem(self) {

    const isFinished = () => {
        return self.todo.finished ? "finished" : "";
    }

    return (
        <div className={"Todo " + isFinished()}>
            <div>
                <label> {self.title} </label>
                <p> {self.description} </p>
            </div>

            <div className="CheckBoxContainer">
                <BsCircle id="CheckBox" onClick={() => {
                    Local.finishTodo(self.uuid)
                    Global.todosRerender();
                    }}/>
                <div/>
                <div/>
            </div>
        </div>
    )
}