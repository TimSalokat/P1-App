// !This one disables all errors and warnings. 
// ! That shit scary

/* eslint-enable */
/* eslint-disable */

import React, {useEffect} from 'react';
import {HiPlus} from "react-icons/hi";
import { v4 as uuidv4 } from 'uuid';

import {ProjectContainer, TodoContainer, SectionSeperator, Form} from "../components/components";
import "../css/Global.css";
import "../css/Todo.css";

import {History, Local, Server, Saving, Global} from "../components/functions";

function Todo(self) {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //* runs on first render
  useEffect(() => {
    const storedTodos = Saving.loadSave(Global.TODO_KEY);
    const storedLocalActions = Saving.loadSave(Global.LOCAL_ACTIONS_KEY, false)
    const storedProjects = Saving.loadSave(Global.PROJECT_KEY);
    if(storedTodos !== undefined) Global.setDisplayedTodos = storedTodos;
    if(storedLocalActions !== undefined) Global.setLocalActions = storedLocalActions;
    if(storedProjects !== undefined) Global.setProjects = storedProjects;
    Global.setTodosRerender = forceUpdate;
  }, [])

  //! Eslint disable removes the warning and i think errors when runnin this part 
  useEffect(() => {
    if(Global.serverReachable) {
      // Local.addLocalTodos();
      History.add("Synced local and server todos");
      Saving.saveLocal(Global.TODO_KEY, Global.displayedTodos);
    }
  }, [Global.serverReachable])

  // ? Wait function might be useful
  // function wait(delay) {
  //   return new Promise( res => setTimeout(res, delay) );
  // }

  const createNewTodo = async () => {
    if(Global.overlayActive = false){return}
    Global.setOverlayProps = {
      heading_one: "Add",
      heading_two: "Todo",
      main_placeholder: "Todo Heading",
      desc_placeholder: "Description",
      show_desc: true,
      on_commit: addTodoHelper,
    }
    Global.formRerender();
    Global.setOverlayActive = true;
  }

  const addTodoHelper = async (heading, description, project) => {
    let new_uuid = uuidv4();
    if(heading !== ""){
      if(description === undefined) description = "";
      if(project === "") project = "General";

      let new_todo = {
        uuid: new_uuid,
        heading: heading,
        description: description,
        project: project,
        finished: false }

      Global.displayedTodos.push(new_todo)

      forceUpdate();

      await Server.ping();

      if(Global.serverReachable){
        History.add("Adding server todo: " + heading);
        await Server.addTodo(new_uuid, heading, description, project);
      }else {
        History.add("Added local todo: " + heading);
        Global.localActions.push({
          "action": "todo_add",
          "uuid": new_uuid,
          "heading": heading,
          "description": description,
          "project": project,
        });
        Saving.saveLocal(Global.LOCAL_ACTIONS_KEY, Global.localActions);
      }
      Saving.saveLocal(Global.TODO_KEY, Global.displayedTodos);
    }
  }

  const delTodo = async (uuid) => {
    History.add("Deleting todo with uuid: " + uuid);
    if(!Global.serverReachable){
      Global.localActions.push({
        "action": "todo_delete",
        "uuid": uuid,
      })
      Saving.saveLocal(Global.LOCAL_ACTIONS_KEY, Global.localActions);
    }

    Global.displayedTodos.forEach(element => {
      if(element["uuid"] === uuid){
        Global.displayedTodos.splice(element,1);
      }
      
    });
    forceUpdate();

    if(Global.serverReachable)(await Server.deleteTodo(uuid))
    Saving.saveLocal(Global.TODO_KEY, Global.displayedTodos);
  }

  return (
  <>
    <div className={"todoPageContainer"} >

      
      <SectionSeperator label={"Projects"}/>
      <section id="todoMainSection">
        <ProjectContainer/>

        <SectionSeperator label={"Todo's of "} colored={Global.activeFilter}/>

        <TodoContainer delTodo={delTodo}/>
      </section>

      <div className="sticky">
        <div className="todoButtonBar">
          <h3>Add</h3>
          <h3>Todo</h3>
        </div>
      </div>

      <div className="overlay" onClick={() => {
        Global.setOverlayActive = false;
        Global.overlay = {};
        Global.formRerender();
        }}/>
      <Form/>

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