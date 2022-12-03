/* eslint-disable */
import React from "react";
import {useSwipeable} from "react-swipeable";

import "../css/modules/Todos.css";
import DoneSVG from "../svg/DoneSVG";
import {BsCircle, BsCheck2Circle} from "react-icons/bs";
import { Global, Local } from "../functionality/functions";
import { todos } from "../functionality/modules";
import {TbTrashX} from "react-icons/tb";

export default function Todos() {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    React.useEffect(() => {
      Global.setTodosRerender = forceUpdate;
    }, [])

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

            <div className="Header show-in-todos">
                <label id="SectionLabel">Project: <span className="text_accent text_bold">{Global.activeproject}</span></label>
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

                <div id="FinishedContainer" className="show-in-todos" >
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

    
    const [_showDelete, setShowDelete] = React.useState(false);

    const swipeHandler = useSwipeable({
        onSwipedLeft: (e) => {
            if(e.absX < 80) return   
            setShowDelete(true);
        },
        onSwipedRight: (e) => {
            if(e.absX < 80) return
            setShowDelete(false);
        }
    });

    const isFinished = () => {return self.todo.finished ? "finished" : "";}
    const descriptionEmpty = () => {return self.description === "" ? "hidden" : ""}
    const showDelete = () => {return _showDelete ? "show" : ""};

    const finishTodo_helper = () => {todos.finish(self.uuid);}

    return (
        <div 
            className={"Todo " + isFinished()} 
            id="TodoItem"
            data-uuid={self.uuid}
            {...swipeHandler}
        >

            <div className="CheckBoxContainer">
                {
                    self.todo.finished ? 
                        <BsCheck2Circle id="CheckBox" onClick={() => finishTodo_helper()}/> 
                        : 
                        <BsCircle id="CheckBox" onClick={() => finishTodo_helper()}/>
                }
            </div>

            <div style={{alignSelf:"flex-start", width:"100%"}}>
                <label> {self.title} </label>
                <p className={descriptionEmpty()}> {self.description} </p>
            </div>

            <div id="DelTodoButton" className={showDelete()} onClick={() => todos.delete(self.uuid)}>
                <TbTrashX id="Icon"/>
            </div>
        </div>
    )
}