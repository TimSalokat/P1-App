/* eslint-disable */
import React from "react";
import {useSwipeable} from "react-swipeable";

import "../css/Todos.css";
import DoneSVG from "../svg/DoneSVG";
import {BsCircle, BsCheck2Circle} from "react-icons/bs";
import { Global, Local } from "../functionality/functions";
import { todos } from "../functionality/modules";

export default function Todos() {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    React.useEffect(() => {
      Global.setTodosRerender = forceUpdate;
    }, [])

    const swipeHandler = useSwipeable({
        onSwipedLeft: (e) => {
            let items = e.event.path;
            if(e.absX < 140) return
            for(let i = 0; i < items.length; i++){
                if(items[i].id === "TodoItem"){
                    todos.delete(items[i].dataset.uuid)
            }}}
    });

    function unfinishedEmpty() {
        return todos.unfinished.length === 0 ? "" : "hidden"
    }
    function finishedEmpty() {
        return todos.finished.length === 0 ? "hidden" : ""
    }
    function filteredEmpty() {
        return todos.filtered.length === 0 ? "" : "hidden"
    }

    return (
        <div className="Section">

            <div className="Header">
                <label id="SectionLabel">Todos in <span className="text_accent text_bold">{Global.activeproject}</span></label>
                <button className="button_secondary show-in-home" onClick={() => Local.link("Todos")}>
                    See All
                </button>
            </div>

            <div className="TodoContainer ">
                <DoneSVG className={"show-in-todos " + filteredEmpty()}/>
                <div className={"show-in-home " + unfinishedEmpty()}>
                    <label> Nothing <br/> to do </label>  
                </div>  

                {todos.unfinished.map((todo) => (
                    <TodoItem 
                    key={todo.uuid}
                    uuid={todo.uuid}
                    data-uuid={todo.uuid}
                    todo={todo}
                    title={todo.title}
                    description={todo.description}
                    />
                ))}

                <span className={"seperator large show-in-todos " + finishedEmpty()} id="finished_seperator"/>

                <div id="FinishedContainer" className="show-in-todos" {...swipeHandler}>
                    {todos.finished.map((todo) => (
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
        </div>
    )
}

function TodoItem(self) {

    const isFinished = () => {
        return self.todo.finished ? "finished" : "";
    }

    const finishTodo_helper = () => {
        todos.finish(self.uuid);
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