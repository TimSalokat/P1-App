import React from 'react';
import "../css/navbar.css";

import {Server} from "../components/functions";

function Navbar(self){

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  setInterval(() => {
    forceUpdate();
  }, 10000)

  function dev_active(){
    if(self.activePage === "Dev" && self.menuOpen){return true}
    else{return false}
  }

  return (
    <div className='navbarContainer'>
      <div className={Server.reachable ? "bulb green" : "bulb red"}/>
      <h3 className={dev_active() ? "c_main_accent" : ""}>{self.activePage}</h3>
      <div 
        className={self.menuOpen ? "openMenu_BTN" : "openMenu_BTN active"} 
        onClick={() => self.setMenu(!self.menuOpen)}>
        <span className={dev_active() ? "bg_main_accent" : ""}/>
        <span className={dev_active() ? "bg_main_accent" : ""}/>
        <span className={dev_active() ? "bg_main_accent" : ""}/>
      </div>
    </div>
  )
}

export default Navbar