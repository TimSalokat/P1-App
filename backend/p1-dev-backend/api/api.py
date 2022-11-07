from __future__ import annotations
from fileinput import filename
from tkinter import PROJECTING
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os, sys

import restart_helper
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

    return Todos, newest_version, Projects

class Todo(BaseModel):
    uuid: str
    heading: str
    description: str
    project: str

class Project(BaseModel):
    title: str

# def pull_repo():
#     repo = Repo('C:/Users/timsa/Desktop/Wokspace/P1-App')
#     repo.remotes.origin.pull()
#     with open("../version.txt", "r") as file:
#         newest_version = int(file.read())
#         file.close()
#         return newest_version

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
    log("Ping", "green")
    return True

@app.get("/restart")
async def restart():
    restart_helper.restart()    
    return True

@app.get("/get-version")
async def get_version():
    with open("../version.txt", "r") as file:
        newest_version = int(file.read())
        file.close()
        return newest_version

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
    print(todo)
    Todos.append({
        "uuid": todo.uuid,
        "heading": todo.heading,
        "description": todo.description,
        "project": todo.project,
        "finished": False })
    # update_index()
    log(("Added Todo: ", todo.heading))
    save(Todos, "todos.txt")
    return {"response": "Successful"}

@app.post("/add-project")
async def add_project(project: Project):
    Projects.append({
        "index": len(Projects)+1,
        "title": project.title.title()
    })
    save(Projects, "projects.txt")
    log(("Added Project: ", project.title))
    return {"response": "Successful"}

@app.put("/set-finished")
async def set_finished(uuid: str):
    for todo in Todos:
        if(todo["uuid"] == uuid):
            todo["finished"] = not todo["finished"]
    save(Todos, "todos.txt")
    return {"response": "Successful"}

@app.put("/edit-todo/{uuid}")
async def edit_todo(uuid:str, todo: Todo):
    for todo_item in Todos:
        if(todo_item["uuid"] == uuid):
            todo_item["heading"] = todo.heading
            todo_item["description"] = todo.description
            todo_item["project"] = todo.project
    save(Todos, "todos.txt")
    log(("Changed todo: " + todo.heading))
    return {"response": "Successful"}

@app.delete("/del-todo")
async def del_todo(uuid: str):
    for todo in Todos:
        if(todo["uuid"] == uuid):
            log(("removed ", todo["heading"]), "red")
            Todos.remove(todo)
    save(Todos, "todos.txt")
    return {"response": "Successful"}

@app.delete("/del-project")
async def del_project(title: str):
    title = title.title()
    for project in Projects:
        if(project["title"] == title):
            log(("removed ", title), "red")
            Projects.remove(project)
    save(Projects, "projects.txt")
    return {"response": "Successful"}

Todos, newest_version, Projects = Startup()