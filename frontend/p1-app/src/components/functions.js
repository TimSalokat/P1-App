
import { displayed_history } from "./History";
import { dev_variables } from "../pages/DevPage";

var history = [];

const Global = {
    BACKEND_KEY: "todoApp.backend",
    HISTORY_KEY: "todoApp.history",
    TODO_KEY: "todoApp.local_todos",
    TODO_TO_ADD_KEY: "todoApp.to_add",
    PAGE_KEY: "todoApp.last_page",

    showHistory: false,
    lastShowHistory: false,

    backend: "http://127.0.0.1:8000",
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

    overlayActive: undefined,
    set setOverlayActive(new_state){
        this.overlayActive = new_state;
        this.superContainer.overlayactive = new_state;
    },

    todoPageMounted: false,
    set setTodoPageMounted(new_state){
        this.todoPageMounted = new_state;
        this.superContainer.todopagemounted = new_state;
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
}

//! --- Server Functions ---
class Server{

    reachable = false;

    static ping = async () => {
        console.warn("Pinging: " + Global.backend);
        try {
            const res = await fetch(Global.backend + "/ping");
            const response = await res.json();
            if (response === true) {
                this.reachable = true;
                Server.fetchTodos();
                console.warn("Server reached");
                return true;
            } else {
                this.reachable = false;
                console.warn("Server unreachable");
                return false;
            }
        } catch {
            this.reachable = false;
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

    static fetchTodos = async (update_displayed = false) => {
        try {
            const res = await fetch(Global.backend + "/get-todos");
            const response = await res.json();

            Global.setServerTodos = await response.todos;

            if(update_displayed) Global.displayedTodos = Global.serverTodos;

            return Global.serverTodos;
        }catch {}
    }

    static addTodo = async (heading) => {
        try {
            if(heading){
                var jsonData = {"heading": heading}

                await fetch(Global.backend + "/add-todo", {  
                method: 'POST', 
                mode: 'cors', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
                })
            }   
            await this.fetchTodos();
            History.add("Successfully added todo", false);
        }catch {}
        
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