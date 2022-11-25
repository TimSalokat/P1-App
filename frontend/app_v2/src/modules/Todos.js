
import React from "react";
import {useSwipeable} from "react-swipeable"

import "../css/Todos.css";
import {BsCircle, BsCheck2Circle} from "react-icons/bs";
import {MdAdd} from "react-icons/md";
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
                    Local.deleteTodo(items[i].dataset.uuid)
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
            
            <AddTodoBtn/>

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

    const descriptionEmpty = () => {
        return self.description === "" ? "hidden" : ""
    }

    return (
        <div 
            className={"Todo " + isFinished()} 
            id="TodoItem"
            data-uuid={self.uuid}
        >

            <div className="CheckBoxContainer">
                {
                    self.todo.finished ? 
                        <BsCheck2Circle id="CheckBox" onClick={() => finishTodo_helper()}/> 
                        : 
                        <BsCircle id="CheckBox" onClick={() => finishTodo_helper()}/>
                }
            </div>

            <div>
                <label> {self.title} </label>
                <p className={descriptionEmpty()}> {self.description} </p>
            </div>

        </div>
    )
}

const AddTodoBtn = () => {
    return (
        <button 
            id="AddTodoBtn" 
            className="Todo show-in-todos" 
            onClick={() => Local.openForm("AddTodo")}
        >
            <MdAdd id="Icon" style={{fill:"var(--text_color)"}}/>
            <label>Add Todo</label>
        </button>
    )
}