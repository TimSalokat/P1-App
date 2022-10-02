import React, { useState, useEffect } from 'react';
// import { ScrollView } from 'react-ui';
import TodoItem from '../components/todoItem';
import {BiSend} from "react-icons/bi";
import "../css/Global.css";
import "../css/Todo.css";

function Todo(self) {

  const [heading, setHeading] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = async () => {
    if(heading){
      var jsonData = 
      {
        "heading": heading
      }

      await fetch(self.backend + "/add-todo", {  
        method: 'POST', 
        mode: 'cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      })
      fetchTodos();
      setHeading("");
    }    
  }

  const finishTodo = async (index) => {
    await fetch(self.backend + `/del-todo?index=${index}`, {
      method: "DELETE",
      mode: "cors",
    })
    fetchTodos();
  }

  useEffect(() => {
    const fetch = async () =>{
      fetchTodos();
    }
    fetch();
  }, [])

  const fetchTodos = async () => {
    const res = await fetch(self.backend + "/get-todos");
    const response = await res.json();

    setTodos(response.todos);
  } 

  return (
  <>
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className={todos.length === 0 ? "todoPageEmpty shown" : "todoPageEmpty hidden"}>
        <h1> Congrats! <br/> You're done for <br/> the moment </h1>
      </div>

      <div className="todoPageContainer">
        {todos.map((todo, index) => (
            <TodoItem 
            key={todo.index}
            heading={todo.heading}
            finished={todo.finished}
            finishTodo={finishTodo}
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

        <div className='todoPostButton' onClick={addTodo}>
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