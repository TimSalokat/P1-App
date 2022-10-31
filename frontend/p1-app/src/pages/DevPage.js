import React from 'react';
import "../css/Dev.css";

import { History, Saving, Server, Global } from "../components/functions";

const dev_variables = {
  last_history_entry: "Init",

  set setLastHistoryEntry(entryText){
    this.last_history_entry = entryText;
  }
};

export default function DevPage(self) {

  const [newBackend, setNewBackend] = React.useState("");
  const [newScheme, setNewScheme] = React.useState("");

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <div className={"DevContainer"}>
      <span/>
      <h1 className="font-section"> Development <br/> Settings </h1>
      <span/>

      <div className='DevBtnContainer'>

        <DevButton 
          text={"Refetch Todos"}
          function={() => {
            Server.fetchTodos();
            forceUpdate();}}/>

        <DevButton 
          text={"Refetch Text"}
          function={() => {
            Server.fetchText();
            forceUpdate();}}/>

        <DevButton 
          text={"Ping Server"}
          function={() => {
            Server.ping();
            forceUpdate();}}/>

        <DevButton 
          text={"Update History"}
          function={() => self.reRenderHistory()}/>

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

      <div className="DevBackendContainer">
        <input 
          onChange={(e) => setNewScheme(e.target.value)} 
          value={newScheme}
          placeholder="New Color Scheme"
        ></input>

        <button className="DevCommit_BTN" onClick={() => {
          if(newScheme !== "") self.setColorScheme(newScheme);
          History.add(("New Color Scheme: " + newScheme));
          setNewScheme("");
        }}> Submit </button>
      </div>

      <span/>

      <div className="lastActionField" >
          <p> {dev_variables.last_history_entry} </p>
      </div>
    </div>
  )
}

const DevButton = (self) => {
  return(
    <button onClick={() => {
      self.function();
      History.add(("Pressed and ran: " + self.text), false, true);
    }}>
      {self.text}
    </button>
  )
}

export {dev_variables}
