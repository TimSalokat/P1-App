
import React from "react";

import Init from "./functionality/init";
import Overlay from "./modules/Overlay";
import { Global, Local, Saving } from "./functionality/functions";

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

  /* eslint-disable */
  React.useEffect(() => {
    Global.setAppRerender = forceUpdate;
  }, [])
  /* eslint-enable */

  // React.useEffect(() => {
  //   if(mode !== undefined)Saving.saveLocal(Global.COLOR_SCHEME_KEY, mode);
  //   if(color !== undefined)Saving.saveLocal(Global.COLOR_ACCENT_KEY, color);
  // }, [mode, color])
  
  let base = Global.mode ? {
      "--base-l": "80%",
      "--text_color": "rgb(35,35,35)"}
    :
    {
        "--base-l": "15%",
        "--text_color": "rgb(185,185,185)"}

  let accent = () => {switch(Global.accent) {
    case "blue":
      return {
        "--accent-h": 214,
        "--accent-s": "64%",
        "--accent-l": "53%",
      }  
    case "red":
      return {
        "--accent-h": 353,
        "--accent-s": "60%",
        "--accent-l": "45%",
      }
    case "orange":
      return {
        "--accent-h": 20,
        "--accent-s": "65%",
        "--accent-l": "45%",
      }
    case "green":
      return {
        "--accent-h": 145,
        "--accent-s": "40%",
        "--accent-l": "45%",
      }
    case "pink":
      return {
        "--accent-h": 305,
        "--accent-s": "40%",
        "--accent-l": "45%",
      }
    case "purple":
      return {
        "--accent-h": 275,
        "--accent-s": "50%",
        "--accent-l": "45%",
      }

    
    case "copper":
      return {
        "--accent-h": 20,
        "--accent-s": "40%",
        "--accent-l": "45%",
      }

    default:
      return {
        "--accent-h": 214,
        "--accent-s": "64%",
        "--accent-l": "53%",
      }
  }}

  let style = {...accent(), ...base}

  return (
    <>

    <div 
      id="AppContainer" 
      style={style}

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
