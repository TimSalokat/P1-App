import React from 'react';
import "../css/Dev.css";

import { History, Saving, Server, Global, Local } from "../components/functions";

const dev_variables = {
  last_history_entry: "Init",

  set setLastHistoryEntry(entryText){
    this.last_history_entry = entryText;
  }
};

export default function DevPage() {

  const [newBackend, setNewBackend] = React.useState("");

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <div className={"DevContainer"}>
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
          Global.setShowHistory = !Global.showHistory;
          History.add("Activated History", true, true);
          forceUpdate();
        }}> Show <br/> History </button>

        <button onClick={() => {
          Global.setMenuOpen = !Global.setMenuOpen;
          console.log("MenuOpen: " + Global.menuOpen);
          forceUpdate();
        }}> State MenuOpen </button>
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

      <div className="lastActionField sticky">
          <p> {dev_variables.last_history_entry} </p>
      </div>
    </div>
  )
}

export {dev_variables}
