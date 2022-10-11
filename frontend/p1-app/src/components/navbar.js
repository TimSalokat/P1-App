import React from 'react';
import "../css/navbar.css";

import {server_reachable} from "../components/functions";

function Navbar(self){

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  setInterval(() => {
    forceUpdate();
  }, 10000)

  return (
    <div className='navbarContainer'>
      <div className={server_reachable ? "server_bulb green" : "server_bulb red"}/>
      <h3>{self.activePage}</h3>
      <div 
        className={self.menuOpen ? "openMenu_BTN" : "openMenu_BTN active"} 
        onClick={() => self.setMenu(!self.menuOpen)}>
        <span/>
        <span/>
        <span/>
      </div>
    </div>
  )
}

export default Navbar