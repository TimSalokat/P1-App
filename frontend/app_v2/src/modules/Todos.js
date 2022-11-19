
import "../css/Todos.css";
import {BsCircle} from "react-icons/bs"
import { Global } from "../functionality/functions";

export default function Todos() {
    return (
        <div className="Section">
            <label>Todos in <span className="text_accent text_bold">{Global.activeproject}</span></label>
            <div className="TodoContainer">
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
            </div>
        </div>
    )
}

function TodoItem() {
    return (
        <div className="Todo">
            {/* <p>Project</p> */}
            <div>
                <label> todo title </label>
                <p> Todo Description </p>
            </div>

            <div className="CheckBoxContainer">
                <BsCircle id="CheckBox"/>
                <div/>
                <div/>
            </div>
        </div>
    )
}