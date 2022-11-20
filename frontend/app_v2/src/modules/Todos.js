
import React from "react";

import "../css/Todos.css";
import {BsCircle} from "react-icons/bs"
import { Global, Server } from "../functionality/functions";

export default function Todos() {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    React.useState(() => {
      Global.setTodosRerender = forceUpdate;
    }, [])

    let filteredTodos = () => {
        if(Global.activeproject === "All Todos"){return Global.displayedTodos}
        let filtered = Global.displayedTodos.filter((todo) => todo.project === Global.activeproject)
        return filtered
    }

    let unfinishedTodos = () => {
        let unfinished = filteredTodos().filter((todo)=>todo.finished === false);
        return unfinished;
    }

    let finishedTodos = () => {
        let finished = filteredTodos().filter((todo)=>todo.finished === true);
        return finished;
    }

    return (
        <div className="Section">
            <label>Todos in <span className="text_accent text_bold">{Global.activeproject}</span></label>
            <div className="TodoContainer">
                {unfinishedTodos().map((todo) => (
                    <TodoItem 
                    key={todo.uuid}
                    uuid={todo.uuid}
                    todo={todo}
                    title={todo.title}
                    description={todo.description}
                    // delTodo={self.delTodo}
                    />
                ))}

                {finishedTodos().map((todo) => (
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
                    Server.finishTodo(self.uuid);
                    Global.todosRerender();
                    }}/>
                <div/>
                <div/>
            </div>
        </div>
    )
}