import React from 'react';
import './App.css';
import "./css/Global.css";
import { useState } from 'react';

import Navbar from './components/navbar';
import SideMenu from './components/sideMenu';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Todo from './pages/Todo';
import Changelog from './pages/Changelog';

function App() {
    const [menuOpen, setMenuOpen] = useState(true);
    const [activePage, setActivePage] = useState("Home");
    const [colorScheme,] = useState("defaultScheme");

    return (
    <div className={'superContainer ' + colorScheme}>
        <SideMenu 
            menuOpen={menuOpen} 
            setMenuOpen={setMenuOpen}
            activePage={activePage}
            setActivePage={setActivePage}
        />

        
        <PageUnderlay menuOpen={menuOpen}/>
    
        <Home menuOpen={menuOpen} activePage={activePage}/>
        <Chat menuOpen={menuOpen} activePage={activePage}/>
        <Todo menuOpen={menuOpen} activePage={activePage}/>
        <Changelog menuOpen={menuOpen} activePage={activePage}/>

        <PageOverlay menuOpen={menuOpen}/>


        <Navbar 
            setMenu={setMenuOpen} 
            menuOpen={menuOpen}
            activePage={activePage}
        />
    </div>
    )
}

function PageUnderlay(self) {
    function MenuOpen() {
        return (self.menuOpen ? " MenuClosed" : " MenuOpen") }
    return (
        <div className={"PageContainer Underlay" + MenuOpen()}/>
    )
}

const PageOverlay = (self) => {
    function MenuOpen() {
        return (self.menuOpen ? " MenuClosed" : " MenuOpen")}
    return (
        <div className={'PageContainer Overlay' + MenuOpen()}/>
    )
} 

export default App