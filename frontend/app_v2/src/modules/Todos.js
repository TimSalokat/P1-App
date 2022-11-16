
import "../css/Todos.css";
import {BsCircle} from "react-icons/bs"

export default function Todos() {
    return (
        <div className="Section">
            <label>Todos</label>
            <div className="TodoContainer">
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
                <TodoItem/>
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