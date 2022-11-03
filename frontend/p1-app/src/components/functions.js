
import { displayed_history } from "./History";
import { dev_variables } from "../pages/DevPage";

var history = [];

const Global = {
    BACKEND_KEY: "todoApp.backend",
    HISTORY_KEY: "todoApp.history",
    TODO_KEY: "todoApp.local_todos",
    PROJECT_KEY: "todoApp.projects",
    TODO_TO_ADD_KEY: "todoApp.to_add",
    PAGE_KEY: "todoApp.last_page",
    COLOR_SCHEME_KEY: "todoApp.color_scheme",

    showHistory: false,
    lastShowHistory: false,

    backend: "http://127.0.0.1:8000",
    projects: [],
    serverTodos: [],
    displayedTodos: [],
    todosToAdd: [],
    mainText: "",

    set setShowHistory(new_showHistory){
        this.showHistory = new_showHistory;
    },
    set setLastShowHistory(new_lastShowHistory){
        this.lastShowHistory = new_lastShowHistory;
    },

    set setBackend(new_backend){
        this.backend = new_backend;
        if(Server.ping()){
            Server.fetchText();
            Server.fetchTodos();
        }else{console.error("Server not reachable");};
    },

    set setProjects(new_projects){
        this.projects = new_projects;
    },

    set setServerTodos(new_todos){
        this.serverTodos = new_todos;},
    set setDisplayedTodos(new_todos){
        this.displayedTodos = new_todos;},
    set setTodosToAdd(new_todos_to_add){
        this.todosToAdd = new_todos_to_add;},

    set setMainText(new_main_text){
        this.mainText = new_main_text;},

    superContainer: undefined,
    set setSuperContainer(new_supercontainer){
        this.superContainer = new_supercontainer;
    }, 
    
    serverReachable: undefined,
    set setServerReachable(new_bool){
        this.serverReachable = new_bool;
        this.superContainer.serverreachable = new_bool;
    }, 

    menuOpen: undefined,
    set setMenuOpen(new_state){
        this.menuOpen = new_state;
        this.superContainer.menuopen = new_state;
    },

    activePage: undefined,
    set setActivePage(new_page){
        this.activePage = new_page;
        this.superContainer.activepage = new_page;
    },

    colorScheme: "DefaultDark",
    set setColorScheme(new_scheme){
        this.colorScheme = new_scheme;
        this.superContainer.colorscheme = new_scheme;
        Saving.saveLocal(this.COLOR_SCHEME_KEY, this.colorScheme);
    },

    overlayActive: undefined,
    set setOverlayActive(new_state){
        this.overlayActive = new_state;
        this.superContainer.overlayactive = new_state;
    }

}
class History {
    static add = async ( text, fromServer = true, dev = false) => {
        history.push({
            fromServer: fromServer,
            dev: dev,
            text: text
        })
        displayed_history.update = history;
        dev_variables.setLastHistoryEntry = text;
    }
}

class Saving {
    static saveLocal = (KEY, toSave) => {
        localStorage.setItem(KEY, JSON.stringify(toSave));
    }
    
    static loadSave = ( KEY, raw = false) => {
        const stored = JSON.parse(localStorage.getItem(KEY));
        if(raw) return stored
        else if(stored !== null) return stored;
    }
}

class Local {

    static addLocalTodos = async () => {
        if(Global.todosToAdd === undefined) return;
        for(var index=0; index < Global.todosToAdd.length; index++){
            Server.addTodo(Global.todosToAdd[index]);
        }
        Global.setTodosToAdd = [];
        Saving.saveLocal(Global.TODO_TO_ADD_KEY, Global.todosToAdd);

        History.add("Successfully added local todos", false);
        await Server.fetchTodos(true);
    }

    static link = async (page) => {
        Global.setActivePage = page;
        Saving.saveLocal(Global.PAGE_KEY, page);
        Global.setMenuOpen = true;
    }
}

//! --- Server Functions ---
class Server{

    static ping = async () => {
        try {
            const res = await fetch(Global.backend + "/ping");
            const response = await res.json();
            if (response === true) {
                if(Global.serverReachable){return true}
                Global.setServerReachable = true;
                Server.fetchTodos();
                Server.fetchProjects();
                console.warn("Server reached");
                return true;
            } else {
                Global.setServerReachable = false;
                console.warn("Server unreachable");
                return false;
            }
        } catch {
            Global.setServerReachable = false;
            return false;
        }
    }

    static fetchText = async () => {
        try {
            const res = await fetch(Global.backend + "/get-main");
            const response = await res.json();
            
            Global.setMainText = await response.text;
            return Global.mainText;
        }catch {}
    }

    static fetchTodos = async (update_displayed = true) => {
        try {
            const res = await fetch(Global.backend + "/get-todos");
            const response = await res.json();

            Global.setServerTodos = await response.todos;

            if(update_displayed) Global.displayedTodos = Global.serverTodos;

            return Global.serverTodos;
        }catch {}
    }

    static fetchProjects = async () => {
        try {
            const res = await fetch(Global.backend + "/get-projects");
            const response = await res.json();
            Global.setProjects = await response.projects;
            
            Saving.saveLocal(Global.PROJECT_KEY, Global.projects);
            return Global.projects;
        }catch {}
    }

    static addTodo = async (heading, description, project) => {
        try {
            if(heading){
                let json_data = {
                    "heading": heading,
                    "description": description,
                    "project": project
                }

                console.log(json_data)

                await fetch(Global.backend + "/add-todo", {  
                method: 'POST', 
                mode: 'cors', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json_data)
                })
            }   
            await this.fetchTodos();
            History.add("Successfully added todo", false);
        }catch {}   
    }

    static addProject = async (title) => {
        try {
            if(title){
                let json_data = {
                    "title": title
                }

                await fetch(Global.backend + "/add-project", {
                    method: "POST",
                    mode: "cors",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(json_data)
                })
            }
            await this.fetchProjects();
            History.add("Successfully added Project", false);
        }catch{}
    }

    static finishTodo = async (index) => {
        try {
            await fetch(Global.backend + `/set-finished?index=${index}`, {
            method: "PUT",
            mode: "cors",
            })
            await this.fetchTodos();
        }catch {}
    }

    static deleteTodo = async (index) => {
        try {
            await fetch(Global.backend + `/del-todo?index=${index}`, {
            method: "DELETE",
            mode: "cors",
            })
            await this.fetchTodos();
            History.add("Successfully deleted Todo", false);
        }catch {}
    }

}

export { Saving, History, Server, Local, Global}