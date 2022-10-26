
// !This one disables all errors and warnings. 
// ! That shit scary
/* eslint-disable */

import React from 'react';
import "../css/navbar.css";

import {Server, Global, History} from "../components/functions";

function Navbar(self){

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [displayedReachability, setDisplayedReachability] = React.useState(Global.testo);
  
  // ? This shit works but not in build
  React.useEffect(() => {
    History.add(Global.testo);
  }, [Global.testo])

  setInterval(() => {
    forceUpdate();
    //! For final build uncomment this or maybe dont
    // Server.ping();
  }, 5000)

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
        onClick={() => self.setMenu(!self.menuOpen)}
      >
        <span className={dev_active() ? "bg_main_accent" : ""}/>
        <span className={dev_active() ? "bg_main_accent" : ""}/>
        <span className={dev_active() ? "bg_main_accent" : ""}/>
      </div>
    </div>
  )
}

export default Navbar