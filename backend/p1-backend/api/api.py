from __future__ import annotations
from fileinput import filename
from tkinter import PROJECTING
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# import git
# from git import Repo

from termcolor import colored

Todos = []
Projects = []

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
        Todos = eval(load_save("todos.txt"))
        Projects = eval(load_save("projects.txt"))
    except:
        with open("saves/todos.txt", "w") as file:
            file.write("[]")
            file.close()
            Todos=eval(load_save("todos.txt"))
        with open("saves/projects.txt", "w") as file:
            file.write("[]")
            file.close()
            Projects=eval(load_save("projects.txt"))

    #newest_version = pull_repo()
    newest_version = 1

    return Todos, newest_version

class Todo(BaseModel):
    heading: str
    description: str
    project: str

class Project(BaseModel):
    title: str

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

def save(toSave,fileName):
    path = "saves/" + fileName
    with open(path, "w") as file:
        file.write(str(toSave))
        file.close()

def load_save(fileName):
    path = "saves/" + fileName
    with open(path, "r") as file:
        return file.read() 

@app.get("/ping")
async def ping():
    return True

@app.get("/get-main")
async def get_stuff():
    return {"text": "This is just some text for testing purposes"}

@app.get("/get-todos")
async def get_todos():
    Todos = eval(load_save("todos.txt"))
    return {"todos": Todos}

@app.get("/get-projects")
async def get_projects():
    Projects = eval(load_save("projects.txt"))
    return {"projects": Projects}

@app.post("/add-todo")
async def add_todo(todo: Todo):
    Todos.append({
        "index": len(Todos)+1,
        "heading": todo.heading,
        "description": todo.description,
        "project": todo.project,
         "finished": False })
    update_index()
    save(Todos, "todos.txt")
    return {"response": "Successful"}

@app.post("/add-project")
async def add_project(project: Project):
    Projects.append({
        "index": len(Projects)+1,
        "title": Project.title 
    })
    save(Projects, "projects.txt")
    return {"response": "Successful"}

@app.put("/set-finished")
async def set_finished(index: int):
    for todo in Todos:
        if(todo["index"] == index):
            todo["finished"] =  not todo["finished"]
    save(Todos, "todos.txt")
    return {"response": "Successful"}

@app.delete("/del-todo")
async def del_todo(index: int):
    for todo in Todos:
        if(todo["index"] == index):
            log(("removed ", todo["heading"]), "red")
            Todos.remove(todo)
    update_index()
    save(Todos, "toods.txt")
    return {"response": "Successful"}

Todos, newest_version = Startup()