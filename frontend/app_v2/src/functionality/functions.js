
import {todos} from './modules';

function placeholder_func() {
    return 
}

const Global = {
    BACKEND_KEY: "todoApp.backend",
    TODO_KEY: "todoApp.local_todos",
    PROJECT_KEY: "todoApp.projects",
    LOCAL_ACTIONS_KEY: "todoApp.local_actions",
    PAGE_KEY: "todoApp.last_page",
    COLOR_SCHEME_KEY: "todoApp.color_scheme",
    COLOR_ACCENT_KEY: "todoApp.color_accent",

    backend: "http://127.0.0.1:8000",
    set setBackend(new_backend){
        this.backend = new_backend;
        if(Server.ping()){
            Server.fetchTodos();
        }else{console.error("Server not reachable");};
    },

    activeScheme: undefined,
    set setLocalScheme(new_scheme){
        this.activeScheme = new_scheme;
    },
    setActiveScheme: placeholder_func,
    set setActiveSchemeSetter(new_func){
        this.setActiveScheme = new_func;
    },

    setAccent: placeholder_func,
    set setAccentSetter(new_func){
        this.setAccent = new_func;
    },

    form: "",
    set setForm(new_form){this.form = new_form;},

    formInputs: {},
    set setFormInputs(new_thing){this.formInputs = new_thing;},

    formPlaceholder: {},
    set setFormPlaceholder(new_placeholder){this.formPlaceholder = new_placeholder;},

    clearForm: placeholder_func,
    set setClearForm(new_func){
        this.clearForm = new_func;
    },

    appRerender: placeholder_func,
    set setAppRerender(new_func){this.appRerender = new_func;},

    formRerender: placeholder_func,
    set setFormRerender(new_func){this.formRerender = new_func;},

    todosRerender: placeholder_func,
    set setTodosRerender(new_func){this.todosRerender = new_func;},

    superContainer: undefined,
    set setSuperContainer(new_supercontainer){this.superContainer = new_supercontainer;}, 
    
    formContainer: undefined,
    set setFormContainer(new_instance){this.formContainer = new_instance;},
    
    serverReachable: undefined,
    set setServerReachable(new_bool){
        this.serverReachable = new_bool;
        this.superContainer.serverreachable = new_bool;
    }, 

    serverVersion: 0,
    set setServerVersion(new_version){
        this.serverVersion = new_version;
        Global.appRerender();
    }, 

    menuopen: undefined,
    set setMenuOpen(new_state){
        this.menuopen = new_state;
        // eslint-disable-next-line
        if(new_state == true) this.setOverlayActive = true;
        else this.setOverlayActive = false;
        this.superContainer.menuopen = new_state;
    },

    activepage: undefined,
    set setActivePage(new_page){
        this.activepage = new_page;
        this.superContainer.activepage = new_page;
    },

    overlayactive: undefined,
    set setOverlayActive(new_state){
        this.overlayactive = new_state;
        this.superContainer.overlayactive = new_state;
    },

    showprojects: undefined,
    set setShowProjects(new_state){
        this.showprojects = new_state;
        this.superContainer.showprojects = new_state;
    },
    
    showfinished: undefined,
    set setShowFinished(new_state){
        this.showfinished = new_state;
        this.superContainer.showfinished = new_state;
    },

    activeproject: "All",
    set setActiveProject(new_project){
        this.activeproject = new_project;
        this.superContainer.activeproject = new_project;
    },

    setWeatherFilter: placeholder_func,
    set setWeatherFilterFunc(new_func){
        this.setWeatherFilter = new_func;
    }

}
class Saving {
    static saveLocal = (KEY, toSave) => {
        localStorage.setItem(KEY, JSON.stringify(toSave));
    }
    
    static loadSave = ( KEY, raw = false) => {
        let stored = localStorage.getItem(KEY);
        if(stored === undefined || stored === null) return
        const storedJson = JSON.parse(stored);
        if(raw) return storedJson
        else if(storedJson !== null) return storedJson;
    }
}

class Local {

    static editTodo = async (new_heading, new_description, new_project, uuid) => {
        if(new_project === "") new_project = "General";
        todos.displayedTodos.forEach(todo => {
            if(todo["uuid"] === uuid){
                todo["heading"] = new_heading;
                todo["description"] = new_description;
                todo["project"] = new_project;
            }
        });

        Global.localActions.push({
            "action": "todo_edited",
            "uuid": uuid,
            "heading": new_heading,
            "description": new_description,
            "project": new_project,
        })

        Global.appRerender();
        Saving.saveLocal(Global.LOCAL_ACTIONS_KEY, Global.localActions);
        Saving.saveLocal(Global.TODO_KEY, todos.displayedTodos);
    }

    static link = async (page) => {
        Global.appRerender();
        Global.setActivePage = page;
        Saving.saveLocal(Global.PAGE_KEY, page);
        Global.setMenuOpen = false;
    }

    static openForm = async (formName, ...args) => {
        Global.setOverlayActive = true;
        Global.setForm = formName;
        Global.formRerender();
        Global.formContainer.style.display = "block";
    }
    static closeForm = async () => {
        Global.formContainer.style.display = "none";
        Global.setOverlayActive = "false";
    }
}

//! --- Server Functions ---
class Server{

    static restart = async () => {
        const res = await fetch(Global.backend + "/restart");
        const response = await res.json();
        console.log(response);
    }

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
            console.warn("Server unreachable");
            Global.setServerReachable = false;
            return false;
        }
    }

    static getVersion = async () => {
        try {
            const res = await fetch(Global.backend + "/get-version");
            const response = await res.json();
            
            Global.setServerVersion = response;
        } catch {}
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

            if(update_displayed) todos.displayedTodos = Global.serverTodos;
            Global.todosRerender();
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

    static addTodo = async (props) => {

        try {
            let json_data = {
                "uuid": props.uuid,
                "title": props.title,
                "description": props.description,
                "project": props.project,
                "priority": props.priority,
            }

            console.log(json_data);

            await fetch(Global.backend + "/add-todo", {  
                method: 'POST', 
                mode: 'cors', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json_data)
            })
             
            await this.fetchTodos();
            History.add("Successfully added todo", false);
        }catch {}   
    }

    static editTodo = async (heading, description, project, uuid) => {
        try {
            if(heading){
                let json_data = {
                    "uuid": uuid,
                    "heading": heading,
                    "description": description,
                    "project": project
                }

                await fetch(Global.backend + "/edit-todo/" + uuid, {  
                method: 'PUT', 
                mode: 'cors', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json_data)
                })
            }   
            await this.fetchTodos();
            History.add("Successfully changed todo", false);
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

    static finishTodo = async (uuid) => {
        try {
            await fetch(Global.backend + `/set-finished?uuid=${uuid}`, {
            method: "PUT",
            mode: "cors",
            })
            await this.fetchTodos();
        }catch {}
    }

    static deleteTodo = async (uuid) => {
        try {
            await fetch(Global.backend + `/del-todo?uuid=${uuid}`, {
            method: "DELETE",
            mode: "cors",
            })
            await this.fetchTodos();
            History.add("Successfully deleted Todo", false);
        }catch {}
    }

    static deleteProject = async (title) => {
        try {
            await fetch(Global.backend + `/del-project?title=${title}`, {
            method: "DELETE",
            mode: "cors",
            })
            await this.fetchProjects();
            History.add(("Successfully deleted " + title), false);
        }catch {}
    }

}

export { Saving, Server, Local, Global}