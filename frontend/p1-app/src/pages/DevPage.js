import React from 'react';
import "../css/Dev.css";

import { History, Saving, Server, Global } from "../components/functions";

const dev_variables = {
  show_dev_history: false,
  last_history_entry: "Init",

  set setShowDev(newBool){
    this.show_dev_history = newBool;
  },

  set setLastHistoryEntry(entryText){
    this.last_history_entry = entryText;
  }
};


export default function DevPage(self) {

  const [newBackend, setNewBackend] = React.useState("");

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className="DevContainer">
        <span/>
        <h2> Development <br/> Settings </h2>
        <span/>

        <div className='DevBtnContainer'>

          <button onClick={() => {
            Server.fetchTodos()
            History.add("Refetched Todos", false, true);
            forceUpdate();
          }}> Refetch <br/> Todo's</button>

          <button onClick={() => {
            Server.fetchText();
            History.add("Refetched Text", false, true);
            forceUpdate();
          }}> Refetch <br/> Text </button>

          <button onClick={() => {
            Server.ping();
            History.add("Pinging server", false, true);
            forceUpdate();          
          }}> Check <br/> Reachability </button>

          <button onClick={() => {
            dev_variables.setShowDev = !dev_variables.show_dev_history;
            History.add("Activated Dev History", true, true);
            console.log(Global.backend);
            forceUpdate();
          }}> Show Dev <br/> History </button>
        </div>

        <span/>

        <div className="DevBackendContainer">
          <input 
            onChange={(e) => setNewBackend(e.target.value)} 
            value={newBackend}
            placeholder="New backend address"
          ></input>
          <button className="DevCommit_BTN" onClick={() => {
            if(newBackend !== "") Global.setBackend = newBackend;
            History.add(("New Backend: " + newBackend));
            Saving.saveLocal(Global.BACKEND_KEY, newBackend);
            setNewBackend("");
          }}> Submit </button>
        </div>

        <span/>

      </div>
      <div className="lastActionField sticky">
          <p> {dev_variables.last_history_entry} </p>
      </div>
    </div>
  )


  function PageStatus() {
    return (self.activePage === "Dev" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    if(self.activePage === "Dev"){
      return (self.menuOpen ? " MenuClosed" : " MenuOpen")
    } return " MenuClosed";
  }
}

export {dev_variables}
