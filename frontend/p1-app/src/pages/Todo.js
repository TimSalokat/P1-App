// !This one disables all errors and warnings. 
// ! That shit scary
/* eslint-disable */
/* eslint-enable */

import React, {useState, useEffect} from 'react';
import {HiPlus} from "react-icons/hi";

import {ProjectContainer, TodoContainer, SectionSeperator} from "../components/components";
import "../css/Global.css";
import "../css/Todo.css";

import {History, Local, Server, Saving, Global} from "../components/functions";

function Todo(self) {

  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  const [activeProject, setActiveProject] = useState("All");

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //* runs on first render
  useEffect(() => {
    const storedTodos = Saving.loadSave(Global.TODO_KEY);
    const storedTodosToAdd = Saving.loadSave(Global.TODO_TO_ADD_KEY, false)
    if(storedTodos !== undefined) Global.setDisplayedTodos = storedTodos;
    if(storedTodosToAdd !== undefined) Global.setTodosToAdd = storedTodosToAdd;
  }, [])

  //! Eslint disable removes the warning and i think errors when runnin this part 
  /* eslint-disable */
  useEffect(() => {
    if(Server.reachable) {
      Local.addLocalTodos();
      History.add("Synced local and server todos");
      Saving.saveLocal(Global.TODO_KEY, Global.displayedTodos);
    }
  }, [Server.reachable])

  useEffect(() => {
    forceUpdate();
  }, [Global.displayedTodos])
  /*eslint-enable */

  // ? Wait function might be useful
  // function wait(delay) {
  //   return new Promise( res => setTimeout(res, delay) );
  // }

  const createNewTodo = async () => {
    if(Global.overlayActive){Global.setOverlayActive = false}
    else{Global.setOverlayActive = true;}
  }

  const addTodo_helper = async () => {
    if(heading !== ""){
      var tmp_heading = heading;
      var tmp_desc = description;
      setDescription("");
      setHeading("");

      Global.displayedTodos.push({
        index: Global.displayedTodos.length,
        heading: tmp_heading,
        description: tmp_desc,
        finished: false })

      forceUpdate();

      await Server.ping();

      if(Server.reachable){
        History.add("Adding server todo: " + tmp_heading);
        await Server.addTodo(tmp_heading);
      }else {
        History.add("Added local todo: " + tmp_heading);
        Global.todosToAdd.push(tmp_heading);
      }
        Saving.saveLocal(Global.TODO_TO_ADD_KEY, Global.todosToAdd);

      tmp_heading = "";
      tmp_desc = "";
      Saving.saveLocal(Global.TODO_KEY, Global.displayedTodos);
    }
  }

  const delTodo = async (index) => {
    History.add("Deleting todo: " + Global.displayedTodos[index]["heading"]);
    Global.displayedTodos.splice(index,1);
    forceUpdate();

    //* update indexes
    for(var i=0; i<Global.displayedTodos.length; i++){
      Global.displayedTodos[i]["index"] = i;}
    if(Server.reachable)(
      await Server.deleteTodo(index)
    )
    Saving.saveLocal(Global.TODO_KEY, Global.displayedTodos);
  }

  return (
  <>
    <div className={"todoPageContainer"} >

      <SectionSeperator label={"Projects"}/>

      <ProjectContainer setActiveProject={setActiveProject}/>

      <SectionSeperator label={"Todo's of "} colored={activeProject}/>
      <section style={{height:"50vh"}}>
        <TodoContainer delTodo={delTodo}/>
      </section>

      <div className="sticky">
        <div className="todoButtonBar">
          <h3>Add</h3>
          <h3>Todo</h3>
        </div>
      </div>

      <div className="overlay" onClick={() => {Global.setOverlayActive = false}}/>

      <div className="createTodoFormContainer">
        <div className="createTodoForm">
          <form>

            <div className="createTodoFormHeading">
              <h2> New </h2>
              <h2> Todo </h2>
            </div>

            <input 
              placeholder="Heading"
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />

            <textarea 
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </form>

          <div className="createTodoBtnContainer">
              <button onClick={() => {
                setHeading("");
                setDescription("");
                Global.setOverlayActive = false;
              }}>Cancel</button>

              <button onClick={() => {
                addTodo_helper();
                Global.setOverlayActive = false;
              }}>Add Todo</button>
            </div>

        </div>
      </div>

      <div className="todoButton">
        <div className="triangle" onClick={createNewTodo}>
          <span/>
          <span/>
          <span/>
          <HiPlus id="addTodoIcon"/>
        </div>
      </div>
    </div>
  </>
  )
}

export default Todo