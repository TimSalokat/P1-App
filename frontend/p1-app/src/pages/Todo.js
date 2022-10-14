import React, {useState, useEffect} from 'react';
import TodoItem from '../components/todoItem';
import {BiSend} from "react-icons/bi";
import "../css/Global.css";
import "../css/Todo.css";

import {todos, server_reachable, addLocalTodos, addTodo, finishTodo,
    deleteTodo, checkReachability, historyAdd} from "../components/functions";

function Todo(self) {

  const [heading, setHeading] = useState("");
  const [todos_local, set_todos_local] = useState(todos);
  const [to_add,] = useState([]);
  // const [to_remove,] = useState([]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //* runs every render
  //! Smth wrong here when buildin. Cant explain
  useEffect(() => {
    set_todos_local(todos);
  })

  setInterval(() => {
    // ! I need this one below. It's just a pain in development
    // checkReachability();
    if(to_add.length !== 0 && server_reachable){
      addLocalTodos(to_add);
      set_todos_local(todos);
      historyAdd("Adding locally stored todos to server todos");

      for(var i=to_add.length+1; i>to_add.length; i--){
        to_add.pop();}
    }
    forceUpdate();
  }, 20000)

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

      checkReachability();
      if(server_reachable){
        historyAdd("Adding server todo: " + tmp_heading);
        await addTodo(tmp_heading);
      }else {
        historyAdd("Added local todo: " + tmp_heading);
        to_add.push(tmp_heading);}
      tmp_heading = "";
    }
  }

  const delTodo = async (index) => {
    historyAdd("Deleting todo: " + todos_local[index]["heading"]);
    await finishTodo(index);
    await wait(700);
    todos_local.splice(index,1);
    //* update indexes
    for(var i=0; i<todos_local.length; i++){
      todos_local[i]["index"] = i;}
    await deleteTodo(index);
    forceUpdate();
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