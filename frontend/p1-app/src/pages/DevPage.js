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

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <div className={"DevContainer"}>
      <span id="DevSeperator"/>
      <h1 className="font-section"> Development </h1>
      <h1 className="font-section" style={{color: "var(--main_accent)"}}> Settings </h1>
      
      <DevSection colored={"Mixed "} uncolored={"Debugging"}/>

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

        <DevButton 
          text={"Add testing Todos"}
          function={() => {
            Global.displayedTodos = [
              {"index":0,"heading":"Testing todo1","description":"","finished":false},
              {"index":0,"heading":"Testing todo2","description":"","finished":false},
              {"index":0,"heading":"Testing todo3","description":"","finished":false},
              {"index":0,"heading":"Testing todo4","description":"","finished":false},
              {"index":0,"heading":"Testing todo5","description":"","finished":false},
              {"index":0,"heading":"Testing todo6","description":"","finished":false},
              {"index":0,"heading":"Testing todo7","description":"","finished":false},
              {"index":0,"heading":"Testing todo8","description":"","finished":false},
              {"index":0,"heading":"Testing todo9","description":"","finished":false}
          ]
          forceUpdate();
        }}/>

      </div>

      <DevSection colored={"Change "} uncolored={"Backend"}/>

      <div className="DevBackendContainer">
        <input 
          onChange={(e) => setNewBackend(e.target.value)} 
          value={newBackend}
          placeholder="New address"
        ></input>

        <button className="DevCommit_BTN" onClick={() => {
          if(newBackend !== "") Global.setBackend = newBackend;
          History.add(("New Backend: " + newBackend));
          Saving.saveLocal(Global.BACKEND_KEY, newBackend);
          setNewBackend("");
        }}> Submit </button>
      </div>

      <DevSection colored={"Color "} uncolored={"Schemes"}/>

      <select className="DevSelect" onChange={(e) =>{
        Global.setColorScheme = e.target.value;
        History.add(("Applied Color Scheme: " + e.target.value));
        self.reRenderAll();    
      }}>
        <option value="DefaultLight">Default Light</option>
        <option value="DefaultDark">Default Dark</option>
        <option value="Copper">Copper</option>
        <option value="RottenCopper">RottenCopper</option>
        <option value="Birch">Birch</option>
        <option value="Prismarine">Prismarine</option>
        <option value="Sunrise">[Experimental] Sunrise</option>
      </select>

      <span id="DevSeperator"/>

      <div className="lastActionField" >
          <p> {dev_variables.last_history_entry} </p>
      </div>
    </div>
  )
}

const DevSection = (self) => {
  return (
    <>
      <span id="DevSeperator"/>

      <label className="DevLabel">
        <span style={{color:"var(--main_accent)"}}>
          {self.colored} 
        </span> 

        {self.uncolored}
      </label>
    </>    
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
