
import React from "react";

import Init from "./functionality/init";
import Overlay from "./modules/Overlay";
import { Global, Local } from "./functionality/functions";

import ComponentsPage from "./pages/Components_Page";

import Home_Page from "./pages/Home_Page";
import Todo_Page from "./pages/Todo_Page";

import {MdArticle, MdHome} from "react-icons/md";
import {CgMenuLeft} from "react-icons/cg";

function App() {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  React.useState(() => {
    Global.setAppRerender = forceUpdate;
  }, [])

  return (
    <>
    <div 
      id="AppContainer" 

      data-menuopen="false"
      data-activepage="Home"
      data-overlayactive="false"
      data-showprojects="true"
    
    >
      <Init/>

      <div id="PagesContainer">
        
        {/* eslint-disable */}
        <Todo_Page/>
        <Home_Page/>
        
        {/* eslint-enable */}
        <ComponentsPage/>
      </div>

      {/* <div id="BotBar" data-open="false"> 
        <div className="IconContainer" onClick={() => Local.link("Todos")}><MdArticle id="Icon"/> </div>
        <div className="IconContainer" onClick={() => Local.link("Home")}><MdHome id="Icon"/> </div>
        <div className="IconContainer" onClick={() => Local.link("Dev")}><MdDns id="Icon"/> </div>
      </div>
      <div className="Section" id="BotButton" onClick={() => {
        Global.setMenuOpen = !Global.menuopen;
      }}/> */}

    <Overlay click={() => {Global.setMenuOpen = false; Global.setOverlayActive = false;}}/>
    <div id="MenuBar">

      {/* <div className="decoration">
        <div className="decorator" onClick={() => Local.link("Todos")}/>
        <div className="decorator" onClick={() => Local.link("Home")}/>
      </div> */}

      <div className="MainMenuItem" onClick={() => Local.link("Todos")}>
        <MdArticle id="Icon"/>
        <label>Todos</label>
      </div>

      <div className="MainMenuItem" onClick={() => Local.link("Home")}>
        <MdHome id="Icon"/>
        <label>Home</label>
      </div>

      <CgMenuLeft id="MenuIcon"/>

      {/* <div className="IconContainer" onClick={() => Local.link("Todos")}> </div>
      <div className="IconContainer" onClick={() => Local.link("Home")}><MdHome id="Icon"/> </div> */}

    </div>
    </div>

    </>
  );
}

export default App;
