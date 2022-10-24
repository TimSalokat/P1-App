
import { displayed_history } from "../pages/History";
import { dev_variables } from "../pages/DevPage";

const backend = "http://127.0.0.1:8000";

var history = [];

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
    static mergeArrays = (local=[], server) => {
        const merged = server;
        var strikes = 0;
        for(var i=0; i<local.length; i++){
            for(var y=0; y<server.length; y++){
                if(local[i].heading === server[y].heading){
                    strikes++;
                }
            }

            if(strikes === 0){
                merged.push(local[i]);
            }
            strikes = 0;
        }
        return merged;
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

    todos = [];
    main_text = "";
    reachable = false;

    static ping = async () => {
        try {
            const res = await fetch(backend + "/ping");
            if (res.status === 200) {
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
            const res = await fetch(backend + "/get-main");
            const response = await res.json();
            
            this.main_text = await response.text;
            return this.main_text;
        }catch {
            console.error("Server Error")
        }
        this.ping();
    }

    static fetchTodos = async () => {
        try {
            const res = await fetch(backend + "/get-todos");
            const response = await res.json();

            this.todos = await response.todos;
            return this.todos;
        }catch {
            console.error("Server Error")
        }
        this.ping();
    }

    static addTodo = async (heading) => {
        try {
            if(heading){
                var jsonData = 
                {
                "heading": heading
                }

                await fetch(backend + "/add-todo", {  
                method: 'POST', 
                mode: 'cors', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
                })
            }   
            await this.fetchTodos();
            History.add("Successfully added todo", false);
        }catch {
            console.error("Server Error");
        }
        this.ping();
        
    }

    static finishTodo = async (index) => {
        try {
            await fetch(backend + `/set-finished?index=${index}`, {
            method: "PUT",
            mode: "cors",
            })
            await this.fetchTodos();
        }catch {
            console.error("Server Error");
        }
        this.ping();
    }

    static deleteTodo = async (index) => {
        try {
            await fetch(backend + `/del-todo?index=${index}`, {
            method: "DELETE",
            mode: "cors",
            })
            await this.fetchTodos();
            History.add("Successfully deleted Todo", false);
        }catch {
            console.error("Server Error");
        }
        this.ping();
    }

}

if(Server.ping()){    
    Server.fetchTodos();
    Server.fetchText();
} else {
    console.error("Can't reach server");
}



export { Saving, History, Server, Local}