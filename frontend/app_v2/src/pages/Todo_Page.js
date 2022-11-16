import Projects from "../modules/Projects";
import Todos from "../modules/Todos";

export default function Todo_Page() {
    return (
        <div id="Todo_Page" className="column nowrap">
            <Todos/>
            <Projects/>
        </div>
    )
}