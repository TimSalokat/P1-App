import React from 'react';
import "../css/Global.css";
import "../css/Home.css";

import { Server } from '../components/functions';

function Home(self) {

  const [displayed_text, set_displayed_text] = React.useState(Server.main_text);

  //* Runs on first render
  React.useEffect(() => {
    async function asyncFunc(){
      var text = await Server.fetchText();
      if(text !== undefined){
        set_displayed_text(text);
      } else {
        set_displayed_text("Keine Serververbindung");
      }
    }
    asyncFunc();
  }, [])

  function PageStatus() {
    return (self.activePage === "Home" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    if(self.activePage === "Home"){
      return (self.menuOpen ? " MenuClosed" : " MenuOpen")
    } return " MenuClosed";
  }

  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <img className="icon" alt="" src="../icon1@2x.png" />
      <div className="homeContainer">
        <h1> Neue News </h1>
        <h3> {displayed_text} </h3>
      </div>
    </div>
  )
}

export default Home