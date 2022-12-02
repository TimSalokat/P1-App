
import { v4 as uuidv4 } from 'uuid';

import { Global, Saving, Server } from "./functions";

function placeholder_func(){return};

const todos = {
    serverTodos: [],
    set setServerTodos(new_todos){this.serverTodos = new_todos;},

    todos: [],
    set setTodos(new_todos){
        this.todos = new_todos;
    },

    
    get filtered() {
        if (Global.activeproject === "All Todos") return this.todos;
        return this.todos.filter((todo) => todo.project === Global.activeproject)
    },
    get unfinished() {
        return this.filtered.filter((todo) => todo.finished === false)
    },
    get finished() {
        return this.filtered.filter((todo) => todo.finished === true)
    },

    save(){
        Global.appRerender();
        Saving.saveLocal(Global.TODO_KEY, this.todos);
    },

    load(){
        let local_save = Saving.loadSave(Global.TODO_KEY);
        if(local_save !== undefined) this.todos = local_save;
    },

    getByUuid(uuid){
        for(let i=0; i < this.todos.length; i++){
            if(this.todos[i].uuid === uuid){
                return i;
    }}},

    async add(props) {
        const new_uuid = () => uuidv4();

        let description = props.description ? props.description : "";
        let project = props.selectedProject ? props.selectedProject : "All Todos";
        let new_todo = {
            "uuid": new_uuid(),
            "title": props.title,
            "description": description,
            "project": project,
            "priority": 1,
            "finished": false,
        }

        if (Global.serverReachable) Server.addTodo(new_todo)
        else { local_actions.add({
                "action": "todo_added",
                "todo": new_todo,
        })}

        log.add("Added Todo: " + new_todo.title);
        this.todos.push(new_todo);
        this.save();
    },

    async finish(uuid) {
        let index = this.getByUuid(uuid);
        this.todos[index].finished = !this.todos[index].finished;

        if (Global.serverReachable) Server.finishTodo(uuid)
        else {
            local_actions.add({
                "action": "todo_finished",
                "uuid": uuid,
                "new_state": this.todos[index].finished,
        })}
        
        // log.add("Finished Todo: " + this.todos[index].title);
        this.save();
    },

    async delete(uuid) {
        let index = this.getByUuid(uuid);
        log.add("Deleted Todo: " + this.todos[index].title);
        
        this.todos.splice(index, 1);

        if (Global.serverReachable) Server.deleteTodo(uuid);
        else {
            local_actions.add({
                "action": "todo_deleted",
                "uuid": uuid
        })}
        this.save();
    }
}

const projects = {
    projects: [],
    set setProjects(new_projects) {this.projects = new_projects;},

    save(){
        Global.appRerender();
        Saving.saveLocal(Global.PROJECT_KEY, this.projects);
    },

    load(){
        let local_save = Saving.loadSave(Global.PROJECT_KEY);
        if(local_save !== undefined) this.projects = local_save;
    },

    async add(props) {
        const new_uuid = () => uuidv4();

        let new_project = {
            "uuid": new_uuid(),
            "title": props.title
        }

        if (Global.serverReachable) Server.addProject(new_project)
        else {
            local_actions.add({
                "action": "project_added",
                "project": new_project,
            })}
        log.add("Added Project: " + new_project.title);
        this.projects.push(new_project);
        this.save();
    },

    async delete(toDelete) {

        if(toDelete === "") {toDelete = this.projects[0].title}
        if(Global.activeproject === toDelete) Global.setActiveProject = "All Todos"; 

        else {for(let i=0; i < this.projects.length; i++){
            if(this.projects[i].title === toDelete){
                this.projects.splice(i, 1);
        }}}

        if (Global.serverReachable) Server.deleteProject(toDelete)
        else {
            local_actions.add({
                "action": "project_deleted",
                "title": toDelete,
        })}
        
        log.add("Deleted Project: " + toDelete);
        this.save();
    }

}

const local_actions = {
    actions: [],
    set setActions(new_actions){this.actions = new_actions;},

    add(action) {
        this.actions.push(action);
        this.save();
    },

    save(){
        Saving.saveLocal(Global.LOCAL_ACTIONS_KEY, this.actions);
    },

    load(){
        let local_save = Saving.loadSave(Global.LOCAL_ACTIONS_KEY);
        if(local_save !== undefined) this.setActions = local_save;
    },
}

const log = {

    log: undefined,
    set setLog(new_thing){this.log = new_thing},

    add(value) {
        this.log.push(value);
    },
}

export { todos, projects, local_actions, log}