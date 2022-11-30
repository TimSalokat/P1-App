
import Projects from "../modules/Projects";
import Todos from "../modules/Todos";

import { MdAdd } from "react-icons/md";

import { Local } from "../functionality/functions";

export default function Todo_Page() {
    return (
        <>
        <div id="Todo_Page" className="column nowrap">
            <Projects/>
            <Todos/>
        </div>
        <AddTodoBtn/>
        </>
    )
}

const AddTodoBtn = () => {

    function openForm_helper (title){
        Local.link("Todos");
        Local.openForm(title);
      }

    return (
        <button 
            id="AddTodoBtn" 
            className="show-in-todos"
            onClick={() => openForm_helper("AddTodo")}
        >
            <MdAdd id="Icon" style={{fill:"var(--base)"}}/>
        </button>
    )
}