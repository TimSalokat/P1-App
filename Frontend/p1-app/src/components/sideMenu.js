import React from 'react'
import "../css/sideMenu.css";

function SideMenu({ menuOpen, setMenuOpen, activePage, setActivePage }) {

    function link(page) {
        if(activePage !== page){
            setActivePage(page);
            setMenuOpen(true);
        }
    }

    return (
        <div className={menuOpen ? "sideMenuContainer closed" : "sideMenuContainer" }>
            <ul>
                <li onClick={() => link("Home")}>Home</li>
                <li onClick={() => link("Chat")}>Chat</li>
                <li onClick={() => link("Todo")}>Todo's</li>
            </ul>
        </div>
    )
}

export default SideMenu