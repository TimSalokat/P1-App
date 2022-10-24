import React from 'react';
import "../css/Global.css";
import "../css/History.css";

//TODO make history items with the dev tag only show when the show_dev in here is true
// import { dev_variables } from './DevPage';

// import {history} from "../components/functions";
// import { show_dev_history } from './DevPage';

// var displayed_history = [];

const displayed_history = {
  history: [],

  set update(new_history){
    this.history = new_history;
    localStorage.setItem("todoApp.history", JSON.stringify(displayed_history.history))
  }
};

export default function History(self) {

  const LOCAL_STORAGE_KEY = "todoApp.history";

  //* runs on first render
  React.useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
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