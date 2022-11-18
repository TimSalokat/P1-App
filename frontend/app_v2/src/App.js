
import React from "react";

import Init from "./functionality/init";
import Overlay from "./modules/Overlay";
import { Global, Local } from "./functionality/functions";

import Home_Page from "./pages/Home_Page";
import Todo_Page from "./pages/Todo_Page";

import {MdArticle, MdHome, MdSettings, MdAdd} from "react-icons/md";
import Settings_Page from "./pages/Settings_Page";
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
      data-activeproject="All"
    
    >
      <Init/>

      <div id="PagesContainer">
        
        {/* eslint-disable */}
        <Todo_Page/>
        <Home_Page/>
        <Settings_Page/>
        
        {/* eslint-enable */}
      </div>

    <Overlay click={() => {Global.setMenuOpen = false; Global.setOverlayActive = false;}}/>
    <div id="MenuBar">

      <div className="MainMenuItem" onClick={() => Local.link("Todos")}>
        <MdArticle id="Icon"/>
      </div>

      <div className="MainMenuItem" onClick={() => Local.link("Home")}>
        <MdHome id="Icon"/>
      </div>
      
      <button className="button_secondary">
        <MdAdd id="Icon" style={{color:"var(--text_color)"}}/>
        <label>Add Todo</label>
      </button>

      <MdSettings id="MenuIcon" onClick={() => Local.link("Settings")}/>

    </div>
    </div>

    </>
  );
}

export default App;
