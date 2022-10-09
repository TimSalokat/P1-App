import React, {useState, useEffect} from 'react';
import TodoItem from '../components/todoItem';
import {BiSend} from "react-icons/bi";
import "../css/Global.css";
import "../css/Todo.css";

import {todos, server_reachable, addLocalTodos, addTodo, checkReachability} from "../components/functions";

function Todo(self) {

  const [heading, setHeading] = useState("");
  const [todos_local, set_todos_local] = useState(todos);
  const [to_add,] = useState([]);
  // const [to_remove,] = useState([]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //* runs on the first render
  useEffect(() => {
    
  }, [])

  //* runs every render
  useEffect(() => {
    set_todos_local(todos);
  })

  setInterval(() => {
    // checkReachability();
    if(to_add.length !== 0 && server_reachable){
      addLocalTodos(to_add);

      for(var i=to_add.length+1; i>to_add.length; i--){
        to_add.pop();}
    }
    forceUpdate();
  }, 20000)

  const addTodo_helper = async () => {
    // !Check if this works in the mobile version
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
        await addTodo(tmp_heading);
      }else {
        to_add.push(tmp_heading);}
      tmp_heading = "";
    }
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
    return (self.menuOpen ? " MenuClosed" : " MenuOpen")
  }
}

export default Todo