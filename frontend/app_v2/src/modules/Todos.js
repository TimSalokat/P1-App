
import React from "react";
import {useSwipeable} from "react-swipeable"

import "../css/Todos.css";
import {BsCircle, BsCheck2Circle} from "react-icons/bs"
import { Global, Local } from "../functionality/functions";

export default function Todos() {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    React.useState(() => {
      Global.setTodosRerender = forceUpdate;
    }, [])

    const swipeHandler = useSwipeable({
        onSwipedLeft: (e) => {
            // console.log(e)
            let items = e.event.path;
            if(e.absX < 140) return
            for(let i = 0; i < items.length; i++){
                if(items[i].id === "TodoItem"){
                    Local.delTodo(items[i].dataset.uuid)
                }
            }
        }
    });

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
                    data-uuid = {todo.uuid}
                    />
                ))}
            </div>
            <div className="TodoContainer show-in-todos" {...swipeHandler}>
                <label>Finished</label>
                <span className="seperator large" style={{backgroundColor: "var(--base-dark)"}}></span>
                {getFinishedTodos().map((todo) => (
                        <TodoItem 
                        key={todo.uuid}
                        uuid={todo.uuid}
                        todo={todo}
                        title={todo.title}
                        description={todo.description}
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

    const finishTodo_helper = () => {
        Local.finishTodo(self.uuid)
        Global.todosRerender();
    }

    return (
        <div 
            className={"Todo " + isFinished()} 
            id="TodoItem"
            data-uuid={self.uuid}
        >
            <div>
                <label> {self.title} </label>
                <p> {self.description} </p>
            </div>

            <div className="CheckBoxContainer">
                {
                    self.todo.finished ? 
                        <BsCheck2Circle id="CheckBox" onClick={() => finishTodo_helper()}/> 
                        : 
                        <BsCircle id="CheckBox" onClick={() => finishTodo_helper()}/>

                }
                <div/>
                <div/>
            </div>
        </div>
    )
}