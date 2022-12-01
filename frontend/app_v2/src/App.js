
import React from "react";

import Init from "./functionality/init";
import Overlay from "./modules/Overlay";
import { Global, Local } from "./functionality/functions";

import Home_Page from "./pages/Home_Page";
import Todo_Page from "./pages/Todo_Page";
import Settings_Page from "./pages/Settings_Page";

import { FormHandler } from "./modules/FormHandler";

import { MdHome, MdLibraryBooks, MdSettings } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import {HiPlus} from "react-icons/hi";
// import {CgMenuLeft} from "react-icons/cg";

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
      data-showfinished="false"
      data-activeproject="All Todos"
    
    >

      <Init style={{display:"none"}}/>

      <div id="PagesContainer">
        
        {/* eslint-disable */}
        <Todo_Page/>
        <Home_Page/>
        <Settings_Page/>
        
        {/* eslint-enable */}
      </div>

      <FormHandler/>
      <BottomMenu/>

      <Overlay click={() => {
        Global.setMenuOpen = false;
        Global.setOverlayActive = false;
        Local.closeForm();
        Global.setFormInputs = [];
        }}/>

    </div>

    </>
  );
}

const BottomMenu = () => {

  function isActive (value) {
    return Global.activepage === value ? " active" : "";
  }

  return (
    <div id="BottomMenuBar">
      <div className={"MainMenuItem"+isActive("Home")} onClick={() => Local.link("Home")}>
        <MdHome id="Icon"/>
      </div>
      <div className={"MainMenuItem"+isActive("Todos")} onClick={() => Local.link("Todos")}>
        <BiTask id="Icon"/>
      </div>

      <div id="TriangleButton" onClick={() => {
        Local.link("Todos");
        Local.openForm("AddTodo");
      }}>
        <span id="Triangle"/>
        <HiPlus id="Icon"/>
      </div>

      {/* <div className={"MainMenuItem"} 
        onClick={() => {
            Local.link("Todos");
            Local.openForm("AddTodo"); 
          }}>
        <BsTriangle id="Icon" style={{fontSize:"80px", rotate:"180deg", color:"var(--accent)"}}/>
      </div> */}

      <div className={"MainMenuItem"+isActive("Library")} onClick={() => Local.link("Library")}>
        <MdLibraryBooks id="Icon"/>
      </div>
      <div className={"MainMenuItem"+isActive("Settings")} onClick={() => Local.link("Settings")}>
        <MdSettings id="Icon"/>
      </div>
    </div>
  )
}

export default App;
