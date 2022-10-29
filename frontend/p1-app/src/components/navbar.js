
// !This one disables all errors and warnings. 
// ! That shit scary
/* eslint-disable */

import React from 'react';
import "../css/navbar.css";

import {Server, Global} from "../components/functions";

function Navbar(self){

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  // ? This throws a warning, look up top. But it works and it's real cool
  React.useEffect(() => {
    console.log("Server change to " + Server.reachable);
    forceUpdate();
  }, [Server.reachable])

  return (
    <div className='navbarContainer'>
      <div className={Server.reachable ? "bulb green" : "bulb red"}/>
      <h2>{self.displayedPage}</h2>
      <div 
        className="openMenu_BTN" 
        onClick={() => {
          Global.setMenuOpen = !Global.menuOpen;
        }}
      >
        <span/>
        <span/>
        <span/>
      </div>
    </div>
  )
}

export default Navbar