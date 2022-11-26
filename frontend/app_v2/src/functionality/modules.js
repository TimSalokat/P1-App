
import { Global } from "./functions";

const todos = {
    serverTodos: [],
    set setServerTodos(new_todos){this.serverTodos = new_todos;},

    displayedTodos: [],
    set setDisplayedTodos(new_todos){
        this.displayedTodos = new_todos;
        Global.todosRerender();
    },

    get filtered() {
        return this.displayedTodos.filter((todo) => todo.project === Global.activeproject)
    },
    get unfinished() {
        return this.filtered.filter((todo) => todo.finished === false)
    },
    get finished() {
        return this.filtered.filter((todo) => todo.finished === true)
    },



}

const projects = {

}

export { todos, projects}