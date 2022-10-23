
import { displayed_history } from "../pages/History";

const backend = "http://127.0.0.1:8000";

var todos = [];
var main_text = "";
var server_reachable = false;

var history = [];

const historyAdd = async ( text, fromServer = true, dev = false) => {
    history.push({
        fromServer: fromServer,
        dev: dev,
        text: text
    })
    displayed_history.update = history;
}

const mergeArrays = (local, server) => {
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

const addLocalTodos = async (to_add) => {
    for(var index=0; index < to_add.length; index++){
        addTodo(to_add[index]);
    }
    historyAdd("Successfully added local todos", false);
}


//! --- Server Functions ---

const checkReachability = async () => {
    try {
        const res = await fetch(backend + "/ping");
        if (res.status === 200) {
            server_reachable = true;
            return true;
        } else {
            server_reachable = false;
            return false;
        }
    } catch {
        server_reachable = false;
        return false;
    }
}

const fetchText = async () => {
    try {
        const res = await fetch(backend + "/get-main");
        const response = await res.json();
        
        main_text = await response.text;
        return main_text;
    }catch {
        console.error("Server Error")
    }
    checkReachability();
}

const fetchTodos = async () => {
    try {
        const res = await fetch(backend + "/get-todos");
        const response = await res.json();

        todos = await response.todos;
        return todos;
    }catch {
        console.error("Server Error")
    }
    checkReachability();
}

const addTodo = async (heading) => {
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
        await fetchTodos();
        historyAdd("Successfully added todo", false);
    }catch {
        console.error("Server Error");
    }
    checkReachability();
    
}

const finishTodo = async (index) => {
    try {
        await fetch(backend + `/set-finished?index=${index}`, {
        method: "PUT",
        mode: "cors",
        })
        await fetchTodos();
    }catch {
        console.error("Server Error");
    }
    checkReachability();
}

const deleteTodo = async (index) => {
    try {
        await fetch(backend + `/del-todo?index=${index}`, {
        method: "DELETE",
        mode: "cors",
        })
        await fetchTodos();
        historyAdd("Successfully deleted Todo", false);
    }catch {
        console.error("Server Error");
    }
    checkReachability();
}


if(checkReachability()){    
    fetchTodos();
    fetchText();
} else {
    console.error("Can't reach server");
}

export { fetchText, fetchTodos, historyAdd, mergeArrays,
    todos, main_text, server_reachable, history,
    checkReachability, addLocalTodos,
    addTodo, finishTodo, deleteTodo}