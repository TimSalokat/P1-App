import React from 'react';
import './App.css';
import "./css/Global.css";
import { useState } from 'react';

import Init from './init';

import Navbar from './components/navbar';
import SideMenu from './components/sideMenu';
import History from './components/History';

import Home from './pages/Home';
import Todo from './pages/Todo';
import DevPage from './pages/DevPage';

function App() {
    const [displayedPage, setDisplayedPage] = useState("");
    const [colorScheme,] = useState("testScheme2");

    return (
    <div 
        id="superContainer"
        className={'superContainer ' + colorScheme} 
        data-menuopen="true"
        data-activepage="Home" 
    >
        <Init setDisplayedPage={setDisplayedPage}/>

        <SideMenu
            setDisplayedPage={setDisplayedPage}
        />

        <div className='PageWrapper'>
            <Home/>
            <Todo/>
            <DevPage />
        </div>

        <div id="PageOverlay"/>
        <History/>

        <Navbar 
            displayedPage={displayedPage}
        />
    </div>
    )
}

export default App