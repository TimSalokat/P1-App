import React from 'react';
import './App.css';
import "./css/Global.css";
import { useState } from 'react';

import Navbar from './components/navbar';
import SideMenu from './components/sideMenu';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Todo from './pages/Todo';
import History from './pages/History';
import DevPage from './pages/DevPage';

import { Saving, Global } from './components/functions';

function App() {
    const [menuOpen, setMenuOpen] = useState(true);
    const [activePage, setActivePage] = useState("");
    const [colorScheme,] = useState("defaultScheme");

    React.useEffect(() => {
        let last_page = Saving.loadSave(Global.PAGE_KEY);
        if (last_page !== undefined) setActivePage(last_page);

        let lastBackend = Saving.loadSave(Global.BACKEND_KEY);
        if (lastBackend !== undefined) Global.setBackend = lastBackend;
    }, [])

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
        <History menuOpen={menuOpen} activePage={activePage}/>
        <DevPage menuOpen={menuOpen} activePage={activePage}/>

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