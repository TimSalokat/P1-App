import React from 'react';
import "../css/Global.css";
import "../css/History.css";

import {Saving} from "../components/functions";

//TODO make history items with the dev tag only show when the show_dev in here is true
// import { dev_variables } from './DevPage';

// import { show_dev_history } from './DevPage';


const HISTORY_STORAGE_KEY = "todoApp.history";

const displayed_history = {
  history: [],

  set update(new_history){
    this.history = new_history;
    Saving.saveLocal(HISTORY_STORAGE_KEY, displayed_history.history);
  }
};

export default function History(self) {

  //* runs on first render
  React.useEffect(() => {
    const storedHistory = Saving.loadSave(HISTORY_STORAGE_KEY);
    if(storedHistory) displayed_history.update = storedHistory;
  }, [])

  function PageStatus() {
    return (self.activePage === "History" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    if(self.activePage === "History"){
      return (self.menuOpen ? " MenuClosed" : " MenuOpen")
    } return " MenuClosed";
  }

  const HistoryItem = (self) => {
    return(
      <div className={(self.fromServer ? "historyItemClient" : "historyItemServer") + 
      (self.dev ? " fromDev" : "")}>
        <p>
          {self.text}
        </p>
      </div>
    )
  }

  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className="HistoryContainer">
        {displayed_history.history.map((item) => (
            <HistoryItem 
              text={item.text}
              dev={item.dev}
              fromServer={item.fromServer}
            />
          ))}
      </div>
    </div>
  )
}

export {displayed_history}