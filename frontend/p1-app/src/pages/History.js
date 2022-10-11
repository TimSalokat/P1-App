import React from 'react';
import "../css/Global.css";
import "../css/History.css";

import {history} from "../components/functions";

export default function History(self) {

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
      <div className={self.fromServer ? "historyItemClient" : "historyItemServer"}>
        <p>
          {self.text}
        </p>
      </div>
    )
  }

  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className="HistoryContainer">
        <HistoryItem text={"Test"} fromServer={false}/>
        {history.map((item) => (
            <HistoryItem 
              key={item.text}
              text={item.text}
              fromServer={item.fromServer}
            />
          ))}
      </div>
    </div>
  )
}