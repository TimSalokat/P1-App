import React from 'react';
import "../css/navbar.css";

const Navbar = (self) => {

  return (
    <div className='navbarContainer'>
      <h3>{self.activePage}</h3>
      <button 
        className={self.activePage === "Todo" ? "reload_BTN shown" : "reload_BTN hidden"}
        onClick={() => console.log("think about reloadin")}>
          R
        </button>
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