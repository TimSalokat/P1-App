// !This one disables all errors and warnings. 
// ! That shit scary
/* eslint-disable */
/* eslint-enable */

import React, {useState, useEffect} from 'react';
import TodoItem from '../components/todoItem';
import {BiSend} from "react-icons/bi";
import "../css/Global.css";
import "../css/Todo.css";

import {History, Local, Server, Saving, Global} from "../components/functions";

function Todo(self) {

  const [heading, setHeading] = useState("");
  // const [to_remove,] = useState([]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //* runs on first render
  useEffect(() => {
    const storedTodos = Saving.loadSave(Global.TODO_KEY);
    const storedTodosToAdd = Saving.loadSave(Global.TODO_TO_ADD_KEY, true)
    if(storedTodos !== undefined) Global.setDisplayedTodos = storedTodos;
    if(storedTodosToAdd !== undefined) Global.setTodosToAdd = storedTodosToAdd;
    console.log(Global.todosToAdd);
  }, [])

  //! Eslint disable removes the warning and i think errors when runnin this part 
  /* eslint-disable */
  useEffect(() => {
    if(Server.reachable) {
      console.log(Global.todosToAdd);
      Local.addLocalTodos();
      History.add("Synced local and server todos");

      Global.setDisplayedTodos = Global.serverTodos;
    }
  }, [Server.reachable])
  /*eslint-enable */

  function wait(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const addTodo_helper = async () => {
    if(heading !== ""){
      var tmp_heading = heading;
      setHeading("");

      Global.displayedTodos.push({
        index: Global.displayedTodos.length,
        heading: tmp_heading,
        finished: false })

      forceUpdate();

      await Server.ping();

      if(Server.reachable){
        History.add("Adding server todo: " + tmp_heading);
        await Server.addTodo(tmp_heading);
      }else {
        History.add("Added local todo: " + tmp_heading);
        Global.todosToAdd.push(tmp_heading);}
        console.log(Global.todosToAdd);
        Saving.saveLocal(Global.TODO_TO_ADD_KEY, Global.todosToAdd);

      tmp_heading = "";
      Saving.saveLocal(Global.TODO_KEY, Global.displayedTodos);
    }
  }

  const delTodo = async (index) => {
    History.add("Deleting todo: " + Global.displayedTodos[index]["heading"]);
    await Server.finishTodo(index);
    await wait(700);
    Global.displayedTodos.splice(index,1);

    //* update indexes
    for(var i=0; i<Global.displayedTodos.length; i++){
      Global.displayedTodos[i]["index"] = i;}
    await Server.deleteTodo(index);
    forceUpdate();
    Saving.saveLocal(Global.TODO_KEY, Global.displayedTodos);
}

  return (
  <>
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className={Global.displayedTodos.length === 0 ? "todoPageEmpty shown" : "todoPageEmpty hidden"}>
        <h1> Congrats! <br/> You're done for <br/> the moment </h1>
      </div>

      <div className="todoPageContainer">
        {Global.displayedTodos.map((todo) => (
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