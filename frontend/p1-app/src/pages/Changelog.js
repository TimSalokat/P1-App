import React from 'react';
import "../css/Global.css";
import "../css/Changelog.css";

export default function Changelog({ menuOpen, activePage }) {

  function PageStatus() {
    return (activePage === "C-Log" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    return (menuOpen ? " MenuClosed" : " MenuOpen")
  }

  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className="CLogContainer">
      </div>
    </div>
  )
}