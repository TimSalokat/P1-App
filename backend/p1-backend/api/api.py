from __future__ import annotations
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
# import git
# from git import Repo

from termcolor import colored

Todos = []

app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://127.0.0.1:3000",
    "127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins = origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]    
)

def log(message, color="green"):
    prefix = colored("[Back-Log]", color)
    print(f"{prefix} - {message}")


def Startup():
    try:
        Todos = eval(load_save())
    except:
        with open("saves/todos.txt", "w") as file:
            file.write("[]")
            file.close()
            Todos=eval(load_save())

    #newest_version = pull_repo()
    newest_version = 1

    return Todos, newest_version

class Todo(BaseModel):
    heading: str

def pull_repo():
    repo = Repo('C:/Users/timsa/Desktop/Wokspace/P1-App')
    repo.remotes.origin.pull()
    with open("../version.txt", "r") as file:
        newest_version = int(file.read())
        file.close()
        return newest_version

def update_index():
    for index in range(len(Todos)):
        Todos[index]["index"] = index;

def save(Todos):
    with open("saves/todos.txt", "w") as file:
        file.write(str(Todos))
        file.close()

def load_save():
    with open("saves/todos.txt", "r") as file:
        newTodos = file.read()
        return newTodos

@app.get("/ping")
async def ping():
    return None

@app.get("/get-main")
async def get_stuff():
    return {"text": "This is just some text for testing purposes"}

@app.get("/get-todos")
async def get_todos():
    Todos = eval(load_save())
    return {"todos": Todos}

@app.get("/get-update")
async def get_update(version: int):
    log(f"Serverside version - {newest_version}", "yellow")
    log(f"Passed version - {version}", "yellow")
    # if version < newest_version:
    return FileResponse("C:/Users/timsa/Desktop/Wokspace/P1-App/yes.txt", media_type="txt", filename="test.txt")
    # return {"response": "Hello"}

@app.post("/add-todo")
async def add_todo(todo: Todo):
    Todos.append({"index": len(Todos)+1,"heading": todo.heading, "finished": False })
    update_index()
    save(Todos)
    return {"response": "Successful"}

@app.put("/set-finished")
async def set_finished(index: int):
    for todo in Todos:
        if(todo["index"] == index):
            todo["finished"] =  not todo["finished"]
    save(Todos)
    return {"response": "Successful"}

@app.delete("/del-todo")
async def del_todo(index: int):
    for todo in Todos:
        if(todo["index"] == index):
            log(("removed ", todo["heading"]), "red")
            Todos.remove(todo)
    update_index()
    save(Todos)
    return {"response": "Successful"}

Todos, newest_version = Startup()