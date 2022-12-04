
import React from "react";

import Overlay from "./modules/Overlay";
import { Global, Local, Server, Saving} from "./functionality/functions";
import { log, projects, todos, local_actions } from "./functionality/modules";

import Home_Page from "./pages/Home_Page";
import Todo_Page from "./pages/Todo_Page";
import Settings_Page from "./pages/Settings_Page";

import { FormHandler } from "./modules/FormHandler";

import { MdHome, MdLibraryBooks, MdSettings } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import {HiPlus} from "react-icons/hi";

function App(props) {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  /* eslint-disable */
  React.useEffect(() =>  {
    Global.setAppRerender = forceUpdate;
  }, [])
  /* eslint-enable */

    return (
      <ColorHelper>

      <div 
        id="AppContainer" 

        data-menuopen="false"
        data-activepage="Home"
        data-overlayactive="false"
        data-showprojects="true"
        data-showfinished="false"
        data-activeproject="All Todos"
      
      >

        {/* <Init style={{display:"none"}}/> */}

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

      </ColorHelper>
  )
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

      <div className={"MainMenuItem"+isActive("Library")} onClick={() => Local.link("Library")}>
        <MdLibraryBooks id="Icon"/>
      </div>
      <div className={"MainMenuItem"+isActive("Settings")} onClick={() => Local.link("Settings")}>
        <MdSettings id="Icon"/>
      </div>
    </div>
  )
}

class ColorHelper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayedLog: [],
      mode: true,
      accent: "",
    }    
  }

  componentDidMount() {

    log.setLog = this.state.displayedLog;
    Global.makeMode = this.state.mode;
    Global.makeAccent = this.state.accent;

    log.add("init", "Init");

    Global.setSuperContainer = document.getElementById("AppContainer").dataset;
    Global.setFormContainer = document.getElementById("FormContainer");
    Global.setMenuOpen = Global.superContainer.menuopen;
    Global.setOverlayActive = Global.superContainer.overlayactive;
    Global.setActiveProject = Global.superContainer.activeproject;

    let last_page = Saving.loadSave(Global.PAGE_KEY);
    log.add("Last page: " + last_page, "Init");
    if (last_page !== undefined && last_page !== "Settings") Global.setActivePage = last_page;
    else{Global.setActivePage = Global.superContainer.activepage;}

    let local_accent = Saving.loadSave(Global.COLOR_ACCENT_KEY);
    if(local_accent === undefined) Global.accent = "blue";
    else (Global.accent = local_accent);
    log.add("Set Accent: " + Global.accent, "Init");

    let local_scheme = Saving.loadSave(Global.COLOR_SCHEME_KEY);
    log.add("Local Scheme: " + local_scheme, "Init");
    Global.mode = local_scheme;

    todos.load();
    projects.load();
    local_actions.load();

    let lastBackend = Saving.loadSave(Global.BACKEND_KEY);
    if (lastBackend !== undefined) Global.setBackend = lastBackend;

    setTimeout(() => {
      this.setState({
        mode: local_scheme,
        accent: local_accent,
      })
      Global.appRerender();
    }, 1)
    Server.ping();
    log.add("-----Finished-----", "Init");
  }

  render() {

    var base = !Global.mode ? {
      "--base-l": "80%",
      "--text_color": "rgb(35,35,35)"}
      :
      {
          "--base-l": "15%",
          "--text_color": "rgb(185,185,185)"}

    var accent = () => {switch(Global.accent) {
      case "blue":
        return {
          "--accent-h": 230,
          "--accent-s": "64%",
          "--accent-l": "48%",
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

      default:
        return {
          "--accent-h": 0,
          "--accent-s": "0%",
          "--accent-l": "0%",
        }
    }}

    const style = {...accent(), ...base};

    return (    
      <div 
        style={style}
      >
        {this.props.children}
      </div>
    )
  }
}

export default App;
