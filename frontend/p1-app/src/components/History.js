import React, {Component} from 'react';
import "../css/Global.css";
import "../css/History.css";

import {Saving, Global} from "./functions";

const displayed_history = {
  history: [],

  set update(new_history){
    this.history = new_history;
    Saving.saveLocal(Global.HISTORY_KEY, displayed_history.history);
  }
};

class HistoryPage extends Component {

  HistoryItem = (self) => {
    let temp_text = self.text;
    if(self.fromServer) temp_text = "[Client]: " + self.text;
    else temp_text = "[Server]: " + self.text;
    
    return(
        <p className="HistoryText">
          {temp_text}
        </p>
    )
  }

  render() {
    return (
        <div className={Global.showHistory ? "HistoryContainer shown" : "HistoryContainer"}>
          <div>
            {displayed_history.history.map((item) => (
                <this.HistoryItem 
                  text={item.text}
                  dev={item.dev}
                  fromServer={item.fromServer}
                />
              ))}
          </div>
        </div>
    )
  }
}



export default HistoryPage;
export {displayed_history}