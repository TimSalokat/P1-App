
import React from "react";

import Init from "./functionality/init";
import Overlay from "./modules/Overlay";
import { Global, Local } from "./functionality/functions";

import Home_Page from "./pages/Home_Page";
import Todo_Page from "./pages/Todo_Page";

import {MdArticle, MdHome, MdSettings } from "react-icons/md";
import Settings_Page from "./pages/Settings_Page";
import { FormHandler } from "./modules/FormHandler";
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
      <Init/>

      <div id="PagesContainer">
        
        {/* eslint-disable */}
        <Todo_Page/>
        <Home_Page/>
        <Settings_Page/>
        
        {/* eslint-enable */}
      </div>

    <FormHandler/>

    <Overlay click={() => {
      Global.setMenuOpen = false;
      Global.setOverlayActive = false;
      Local.closeForm();
      Global.setFormInputs = [];
      }}/>

    {/* <BottomMenu/> */}
    <TopMenu/>

    <SideBar/>

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
      <div className={"MainMenuItem"+isActive("Todos")} onClick={() => Local.link("Todos")}>
        <MdArticle id="Icon"/>
      </div>
      <div className={"MainMenuItem"+isActive("Home")} onClick={() => Local.link("Home")}>
        <MdHome id="Icon"/>
      </div>
      <div className={"MainMenuItem"+isActive("Settings")} onClick={() => Local.link("Settings")}>
        <MdSettings id="Icon"/>
      </div>
    </div>
  )
}

const TopMenu = () => {
  return (
    <div id="TopMenuBar" className="row nowrap">
      <span id="Burger" onClick={() => Global.setMenuOpen = !Global.menuopen}/>
      <h3>Home</h3>
      <MdSettings id="Icon" onClick={() => Local.link("Settings")}/>
    </div>
  )
}

const SideBar = () => {

  function isActive (value) {
    return Global.activepage === value ? " active" : "";
  }

  return (
    <div id="SideBar">

      <div className="link_wrapper">
        <div className={"IconLink"+isActive("Home")} onClick={() => Local.link("Home")}>
          <MdHome id="Icon"/>
          <label>Home</label>
        </div>
        <div className={"IconLink"+isActive("Todos")} onClick={() => Local.link("Todos")}>
          <MdArticle id="Icon"/>
          <label>Todos</label>
        </div>        
      </div>

    </div>
  )
}

export default App;
