
import { displayed_history } from "../pages/History";
import { dev_variables } from "../pages/DevPage";

var history = [];

const Global = {
    backend: "http://127.0.0.1:8000",
    todos: [],
    mainText: "",

    set setBackend(new_backend){
        this.backend = new_backend;
        if(Server.ping()){
            Server.fetchText();
            Server.fetchTodos();
        }else{
            console.error("Server not reachable");
        };

    },

    set setTodos(new_todos){
        this.todos = new_todos;
    },

    set setMainText(new_main_text){
        this.mainText = new_main_text;
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
    
    static loadSave = ( KEY ) => {
        const stored = JSON.parse(localStorage.getItem(KEY));
        if(stored) return stored;
    }

}

class Local {
    static mergeArrays = (local=[], server=Server.todos) => {
        const merged = server;
        var strikes = 0;
        for(var i=0; i<local.length; i++){
            for(var y=0; y<server.length; y++){
                if(local[i].heading === server[y].heading){
                    strikes++;
                }
            }

            if(strikes === 0){
                Server.addTodo(local[i].heading)
                merged.push(local[i]);
            }
            strikes = 0;
        }
        Server.fetchTodos();
    }

    static addLocalTodos = async (to_add) => {
        for(var index=0; index < to_add.length; index++){
            Server.addTodo(to_add[index]);
        }
        History.add("Successfully added local todos", false);
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
                return true;
            } else {
                this.reachable = false;
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

    static fetchTodos = async () => {
        try {
            const res = await fetch(Global.backend + "/get-todos");
            const response = await res.json();

            Global.setTodos = await response.todos;
            return Global.todos;
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