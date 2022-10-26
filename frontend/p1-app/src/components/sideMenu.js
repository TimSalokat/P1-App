import React from 'react'
import "../css/sideMenu.css";
import {MdOutlineDeveloperMode} from "react-icons/md";

import { Saving, Global } from './functions';

function SideMenu({ menuOpen, setMenuOpen, activePage, setActivePage }) {

    function link(page) {
        if(activePage !== page){
            setActivePage(page);
            Saving.saveLocal(Global.PAGE_KEY, page);
            setMenuOpen(true);
        }
    }

    return (
        <div className={menuOpen ? "sideMenuContainer closed" : "sideMenuContainer" }>
            <ul>
                <li onClick={() => link("Home")}><h2>Home</h2></li>
                <li onClick={() => link("History")}><h2>History</h2></li>
                {/* <li onClick={() => link("Chat")}><h2>Chat</h2></li> */}
                <li onClick={() => link("Todo")}><h2>Todo's</h2></li>
            </ul>
            <button onClick={() => link("Dev")}> 
                <MdOutlineDeveloperMode className="devIcon"/>
                <h2>Dev-env</h2>
            </button>
        </div>
    )
}

export default SideMenu