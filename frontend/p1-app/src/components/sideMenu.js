import React from 'react'
import "../css/sideMenu.css";
// import {MdOutlineDeveloperMode} from "react-icons/md";

import { Saving, Global } from './functions';

function SideMenu(self) {

    function link(page) {
        if(Global.activePage !== page){
            Global.setActivePage = page;
            self.setDisplayedPage(page);
            Saving.saveLocal(Global.PAGE_KEY, page);
            Global.setMenuOpen = true;
        }
    }

    return (
        <div className="sideMenuContainer">
            <div className="selfSection">
                <div className="imageContainer">
                    <img className="midIcon" alt="" src="../nyancat.png" /> 
                </div>
                <h1 className="text_inline">Hello, <br/> Admin <span className="text_accent text_inline">User</span></h1>
            </div>

            <ul>
                <li onClick={() => link("Home")}><h2>Dashboard</h2></li>
                <li onClick={() => link("Todo")}><h2>Projects</h2></li>
            </ul>

            <div className="chartContainer">
                
            </div>

            <div className="sideButtonContainer">
                <button onClick={() => link("Dev")}> 
                    <h2>Settings</h2>
                </button>

                <button onClick={() => {
                    Global.setShowHistory = !Global.showHistory;
                }}>O</button>
            </div>
        </div>
    )
}

export default SideMenu