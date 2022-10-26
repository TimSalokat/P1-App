import React, {useState, useEffect} from 'react';
import TodoItem from '../components/todoItem';
import {BiSend} from "react-icons/bi";
import "../css/Global.css";
import "../css/Todo.css";

import {History, Local, Server, Saving, Global} from "../components/functions";

function Todo(self) {

  const [heading, setHeading] = useState("");
  const [todos_local, set_todos_local] = useState([]);
  const [to_add,] = useState([]);
  // const [to_remove,] = useState([]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //* runs every render
  useEffect((todos_local) => {
    console.log("tryin other stuff");
    if(Server.reachable && todos_local !== Global.todos) {
      let merged = Local.mergeArraysOld(todos_local, Global.todos);
      console.log(merged);
      set_todos_local(merged);
    }
  }, [])

  //* runs on first render
  useEffect(() => {
    const storedTodos = Saving.loadSave(Global.TODO_KEY);
    if(storedTodos) set_todos_local(storedTodos);
  }, [])

  // setInterval(() => {
  //   if(to_add.length !== 0 && Server.reachable){
  //     Local.addLocalTodos(to_add);
  //     set_todos_local(Global.todos);
  //     History.add("Adding locally stored todos to server todos");

  //     for(var i=to_add.length+1; i>to_add.length; i--){
  //       to_add.pop();}
  //   }
  //   forceUpdate();
  // }, 5000)

  // ! I need a switch function for getting and losing the server connection
  setInterval(async () => {
    if(Server.reachable && todos_local !== Global.todos) {
      console.log("adding the stuff");
      let strikes = await Local.mergeArraysOld(todos_local, Global.todos);
      console.warn(strikes);
      set_todos_local(await Server.fetchTodos);
      forceUpdate();
    }
  }, 5000)

  function wait(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const addTodo_helper = async () => {
    if(heading !== ""){
      var tmp_heading = heading;
      setHeading("");

      todos_local.push({
        index: todos_local.length,
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
      Saving.saveLocal(Global.TODO_KEY, todos_local);
    }
  }

  const delTodo = async (index) => {
    History.add("Deleting todo: " + todos_local[index]["heading"]);
    await Server.finishTodo(index);
    await wait(700);
    todos_local.splice(index,1);

    //* update indexes
    for(var i=0; i<todos_local.length; i++){
      todos_local[i]["index"] = i;}
    await Server.deleteTodo(index);
    forceUpdate();
    Saving.saveLocal(Global.TODO_KEY, todos_local);
}

  return (
  <>
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className={todos_local.length === 0 ? "todoPageEmpty shown" : "todoPageEmpty hidden"}>
        <h1> Congrats! <br/> You're done for <br/> the moment </h1>
      </div>

      <div className="todoPageContainer">
        {todos_local.map((todo) => (
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