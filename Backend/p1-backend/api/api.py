from __future__ import annotations
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import wget

Todos = []

wget.download("https://github.com/TimSalokat/Main-Repositories/blob/main/React/p1-app/android/app/build/outputs/apk/debug/app-debug.apk", "file.apk")

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

class Todo(BaseModel):
    heading: str

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

@app.get("/get-main")
async def get_stuff():
    return {"text": "This is just some text for testing purposes"}

@app.get("/get-todos")
async def get_todos():
    Todos = eval(load_save())
    return {"todos": Todos}

@app.post("/add-todo")
async def add_todo(todo: Todo):
    Todos.append({"index": len(Todos)+1, "heading": todo.heading, "finished": False })
    update_index()
    save(Todos)
    return {"response": "Successful"}

@app.delete("/del-todo")
async def del_todo(index: int):
    for todo in Todos:
        if(todo["index"] == index):
            Todos.remove(todo)
    update_index()
    save(Todos)
    return {"response": "Successful"}

try:
    Todos = eval(load_save())
except:
    with open("saves/todos.txt", "w") as file:
        file.write("[]")
        file.close()
        Todos=eval(load_save())