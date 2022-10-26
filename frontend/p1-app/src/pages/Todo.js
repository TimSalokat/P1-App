import React, {useState, useEffect} from 'react';
import TodoItem from '../components/todoItem';
import {BiSend} from "react-icons/bi";
import "../css/Global.css";
import "../css/Todo.css";

import {History, Local, Server, Saving, Global} from "../components/functions";

export const local_todos = {
  todos: new Array,

  set setTodos(new_todos){
    this.todos = new_todos;
  }
}

function Todo(self) {

  const [heading, setHeading] = useState("");
  const [to_add,] = useState([]);
  // const [to_remove,] = useState([]);

  const [displayedTodos, setDisplayedTodos] = useState([]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //* runs every render
  // useEffect((local_todos.todos) => {
  //   console.log("tryin other stuff");
  //   if(Server.reachable && local_todos.todos !== Global.todo) {
  //     let merged = Local.mergeArraysOld(local_todos.todos, Global.todo);
  //     console.log(merged);
  //     local_todos.setTodos = merged;
  //   }
  // }, [])

  //* runs on first render
  useEffect((todo) => {
    const storedTodos = Saving.loadSave(Global.TODO_KEY);
    if(storedTodos !== undefined) local_todos.setTodos = storedTodos;
    setDisplayedTodos(local_todos.todos);
  }, [])

  // setInterval(() => {
  //   if(to_add.length !== 0 && Server.reachable){
  //     Local.addLocalTodos(to_add);
  //     local_todos.setTodos = Global.todo;
  //     History.add("Adding locally stored todos to server todos");

  //     for(var i=to_add.length+1; i>to_add.length; i--){
  //       to_add.pop();}
  //   }
  //   forceUpdate();
  // }, 5000)

  // ! I need a switch function for getting and losing the server connection
  // setInterval(async () => {
  //   if(Server.reachable && local_todos.todos !== Global.todos) {
  //     console.log("adding the stuff");
  //     let strikes = await Local.mergeArraysOld(local_todos.todos, Global.todos);
  //     console.warn(strikes);
  //     todo.todoLocal = await Server.fetchTodos;
  //     forceUpdate();
  //   }
  // }, 10000)

  //! dun know why this doesnt update each time when server.reachable changes. 
  useEffect((todo) => {
    console.log("update todo");
    if(Server.reachable && false) {
      console.log("Adding local todos");
      let merged = Local.mergeArrays(local_todos.todos, Global.todos);
      console.log(merged);
      todo.todoLocal = merged;
      console.log(local_todos.todos);
      console.log(Global.todos);
    }
  }, [Server.reachable])

  function wait(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const addTodo_helper = async () => {
    if(heading !== ""){
      var tmp_heading = heading;
      setHeading("");

      local_todos.todos.push({
        index: local_todos.todos.length,
        heading: tmp_heading,
        finished: false })

      forceUpdate();

      await Server.ping();

      if(Server.reachable){
        History.add("Adding server todo: " + tmp_heading);
        await Server.addTodo(tmp_heading);
      }else {
        History.add("Added local todo: " + tmp_heading);
        to_add.push(tmp_heading);}

      tmp_heading = "";
      Saving.saveLocal(Global.TODO_KEY, local_todos.todos);
    }
  }

  const delTodo = async (index) => {
    History.add("Deleting todo: " + local_todos.todos[index]["heading"]);
    await Server.finishTodo(index);
    await wait(700);
    local_todos.todos.splice(index,1);

    //* update indexes
    for(var i=0; i<local_todos.todos.length; i++){
      local_todos.todos[i]["index"] = i;}
    await Server.deleteTodo(index);
    forceUpdate();
    Saving.saveLocal(Global.TODO_KEY, local_todos.todos);
}

  return (
  <>
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className={local_todos.todos.length === 0 ? "todoPageEmpty shown" : "todoPageEmpty hidden"}>
        <h1> Congrats! <br/> You're done for <br/> the moment </h1>
      </div>

      <div className="todoPageContainer">
        {displayedTodos.map((todo) => (
            <TodoItem 
            key={todo.index}
            todo={todo}
            heading={todo.heading}
            index={todo.index}
            delTodo={delTodo}
            />
        ))}
      </div>
      <div className='sticky'>
        <textarea 
          className='todoInput' 
          placeholder='New Todo' 
          value={heading}
          onChange={(e) => setHeading(e.target.value)
        }/>

        <div className='todoPostButton' onClick={addTodo_helper}>
          <BiSend className='todoPostIcon'/>
        </div>
      </div>
    </div>
  </>
  )
  
  function PageStatus() {
    return (self.activePage === "Todo" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    if(self.activePage === "Todo"){
      return (self.menuOpen ? " MenuClosed" : " MenuOpen")
    } return " MenuClosed";
  }
}

export default Todo