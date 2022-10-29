import React from 'react';
import "../css/Global.css";
import "../css/History.css";

import {Saving, Global} from "./functions";

//TODO make history only show if certain dev setting is true
// import { dev_variables } from './DevPage';
// import { show_dev_history } from './DevPage';

const displayed_history = {
  history: [],

  set update(new_history){
    this.history = new_history;
    Saving.saveLocal(Global.HISTORY_KEY, displayed_history.history);
  }
};

export default function History() {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //* runs on first render
  React.useEffect(() => {
    const storedHistory = Saving.loadSave(Global.HISTORY_KEY);
    if(storedHistory) displayed_history.update = storedHistory;
  }, [])

  React.useEffect(() => {
    forceUpdate();
  }, [Global.showHistory])

  const HistoryItem = (self) => {

    let temp_text = self.text;
    if(self.fromServer) temp_text = "[Server]: " + self.text;
    else temp_text = "[Client]: " + self.text;
    
    return(
        <p className="HistoryText">
          {temp_text}
        </p>
    )
  }

  return (
      <div className={Global.showHistory ? "HistoryContainer shown" : "HistoryContainer"}>
        <div>
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