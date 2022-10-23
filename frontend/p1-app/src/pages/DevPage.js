import React from 'react';
import "../css/Dev.css";

import {} from "../components/functions";

var show_dev_history = false;

export default function DevPage(self) {
  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className="DevContainer">
        <span/>
        <h2> Development <br/> Settings </h2>
        <span/>

        <div className='DevBtnContainer'>
          {/* TODO add functionality to this */}
          <button>Refetch <br/> Todo's</button>
          <button>Refetch <br/> Text </button>
          <button>Check <br/> Reachability </button>
          <button>Clear <br/> History </button>
        </div>

      </div>
    </div>
  )


  function PageStatus() {
    return (self.activePage === "Dev" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    if(self.activePage === "Dev"){
      return (self.menuOpen ? " MenuClosed" : " MenuOpen")
    } return " MenuClosed";
  }
}

export {show_dev_history}
