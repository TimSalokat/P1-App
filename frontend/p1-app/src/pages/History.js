import React from 'react';
import "../css/Global.css";
import "../css/History.css";

// import {history} from "../components/functions";
// import { show_dev_history } from './DevPage';

// var displayed_history = [];

const displayed_history = {
  history: [],

  set update(new_history){
    this.history = new_history;
  }
};

export default function History(self) {

  // const [displayed_history, set_displayed_history] = React.useState(history);

  // React.useEffect(() => {
  //   if(show_dev_history){
  //     set_displayed_history(history);
  //   }else{
  //     set_displayed_history(history.filter((item) => (
  //       item.dev
  //     )))
  //     console.log(displayed_history);
  //   }
  // }, [history])

  React.useEffect((displayed_history) => {
    //* This reloads the page on change of the given property
  }, [displayed_history.history])

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