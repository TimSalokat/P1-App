import React from 'react';
import './App.css';
import { useState } from 'react';

import Navbar from './components/navbar';
import SideMenu from './components/sideMenu';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Todo from './pages/Todo';

function App() {
    const [menuOpen, setMenuOpen] = useState(true);
    const [activePage, setActivePage] = useState("Home");

    const backend = "https://127.0.0.1:8000";

    return (
    <div className='superContainer'>
        <div className='relative'><div className='shadow'/></div>
        <SideMenu 
            menuOpen={menuOpen} 
            setMenuOpen={setMenuOpen}
            activePage={activePage}
            setActivePage={setActivePage}
        />
    
        <Home menuOpen={menuOpen} activePage={activePage} backend={backend}/>
        <Chat menuOpen={menuOpen} activePage={activePage} backend={backend}/>
        <Todo menuOpen={menuOpen} activePage={activePage} backend={backend}/>

        <Navbar 
            setMenu={setMenuOpen} 
            menuOpen={menuOpen}
            activePage={activePage}
        />
    </div>
    )
}

export default App