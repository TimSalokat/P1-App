import React, { useState } from 'react';
import "../css/Global.css";

function Template({ menuOpen, activePage }) {

  function PageStatus() {
    return (activePage === "Chat" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    return (menuOpen ? " MenuClosed" : " MenuOpen")
  }

  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className="mainContainer">
        <h1>Chat</h1>
      </div>
    </div>
  )
}

export default Template