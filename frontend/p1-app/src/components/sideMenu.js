import React from 'react'
import "../css/sideMenu.css";
import {MdHistory, MdSettings} from "react-icons/md";

import { Local, Global } from './functions';

function SideMenu(self) {

    return (
        <div className="sideMenuContainer">
            <div className="selfSection">
                <div className="imageContainer">
                    <img className="midImage" alt="" src="../nyancat.png" /> 
                </div>
                <h1 className="text_inline">Hello, 
                	<span className="text_accent text_inline font-heading"> Admin</span>
                </h1>
            </div>

            <ul>
                <li onClick={() => Local.link("Home")}>
                    <h2 className="font-section">Dashboard</h2>
                </li>
                <li onClick={() => Local.link("Todo")}>
                    <h2 className="font-section">Projects</h2>
                </li>
                <li onClick={() => Local.link("Testing")}>
                    <h2 className="font-section">Testing</h2>
                </li>
            </ul>

            <div className="chartContainer">
                
            </div>

            <div className="sideButtonContainer">
                <button onClick={() => Local.link("Dev")}> 
                    <MdSettings id="settingsIcon"/>
                    <h2 className="font-section">Settings</h2>
                </button>

                <button onClick={() => {
                    Global.setShowHistory = !Global.showHistory;
                    self.reRenderHistory();
                }}>
                    <MdHistory id="historyIcon"/>
                </button>
            </div>
        </div>
    )
}

export default SideMenu