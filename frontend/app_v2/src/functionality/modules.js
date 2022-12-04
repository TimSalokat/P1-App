
import { v4 as uuidv4 } from 'uuid';

import { Global, Local, Saving, Server } from "./functions";

// function placeholder_func(){return};

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
        let project = props.project ? props.project : "All Todos";
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

        log.add("Added: " + new_todo.title, "Todos");
        this.todos.push(new_todo);
        this.save();
    },

    async edit(todo) {
        let index = this.getByUuid(todo.uuid);
        this.todos[index] = todo;

        local_actions.add({
            "action": "todo_edited",
            "uuid": todo.uuid,
            "new_title": todo.title,
            "new_description": todo.description,
            "new_project": todo.project,
        })
        log.add("Edited: " + todo.title, "Todos");
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
        
        log.add("Finished: " + this.todos[index].title, "Todos");
        this.save();
    },

    async delete(uuid) {
        let index = this.getByUuid(uuid);
        log.add("Deleted: " + this.todos[index].title, "Todos");
        
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

    getByTitle(title){
        for(let i=0; i < this.projects.length; i++){
            if(this.projects[i].title === title){
                return i;
    }}},

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
        log.add("Added: " + new_project.title, "Projects");
        this.projects.push(new_project);
        this.save();
    },

    async edit(toChange, new_value){
        let index = this.getByTitle(toChange.title);
        this.projects[index].title = new_value.title;

        local_actions.add({
            "action": "project_edited",
            "project_old": toChange.title,
            "project_new": new_value.title,
        })

        todos.todos.forEach((todo) => {
            if(todo.project === toChange.title){
                todo.project = new_value.title;
                local_actions.add({
                    "action": "todo_project_change",
                    "uuid": todo.uuid,
                    "new_project": toChange.title,
                })
            }
        })
        todos.save();

        if(Global.activeproject === toChange.title) {
            Global.setActiveProject = new_value.title;
        }

        log.add("Renamed Project " + toChange.title + " to " + new_value.title, "Projects")
        this.save();
    },

    async delete(toDelete) {

        if(toDelete === "") {toDelete = this.projects[0].title}
        if(Global.activeproject === toDelete) Global.setActiveProject = "All Todos"; 

        let index = this.getByTitle(toDelete) 
        this.projects.splice(index, 1);

        if (Global.serverReachable) Server.deleteProject(toDelete)
        else {
            local_actions.add({
                "action": "project_deleted",
                "title": toDelete,
        })}

        todos.todos.forEach((todo) => {
            if(todo.project = toDelete && todo.finished){
                todos.delete(todo.uuid);
                log.add("Deleted todo: " + todo.title + " due to project deletion", "Info")
            }else if (todo.project = toDelete){
                todo.project = "All Todos";
                local_actions.add({
                    "action": "todo_project_change",
                    "uuid": todo.uuid,
                    "new_project": "All Todos",
                })
                log.add("Moved todo: " + todo.title + " into All Todos", "Info")
            }
        })

        todos.save();        
        log.add("Deleted: " + toDelete, "Projects");
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

    add(entry, from) {
        this.log.push({from, entry});
    },

    show: {
        Info: false,
        Warning: true,

        Todos: true,
        Projects: true,

        Link: false,
        Color: false,
    },
}

export { todos, projects, local_actions, log}