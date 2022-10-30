import React from 'react';
import './App.css';
import "./css/Global.css";
import { useState } from 'react';

import Init from './init';

import Navbar from './components/navbar';
import SideMenu from './components/sideMenu';

import Home from './pages/Home';
import Todo from './pages/Todo';
import DevPage from './pages/DevPage';
import HistoryPage from './components/History';

function App() {
    const [displayedPage, setDisplayedPage] = useState("");
    const [colorScheme,] = useState("testScheme2");

    const [historyUpdate, setHistoryUpdate] = useState(false);
    const reRenderHistory = () => {
        setHistoryUpdate(!historyUpdate);
    }

    return (
    <div 
        id="superContainer"
        className={'superContainer ' + colorScheme} 
        data-menuopen="true"
        data-activepage="Home" 
        data-overlayactive="false"

        data-todopagemounted="false"
    >
        <Init setDisplayedPage={setDisplayedPage}/>

        <SideMenu
            setDisplayedPage={setDisplayedPage}
            reRenderHistory={reRenderHistory}
        />

        <div className='PageWrapper'>
            <Home/>
            <Todo/>
            <DevPage reRenderHistory={reRenderHistory}/>
        </div>

        <div id="PageOverlay"/>
        <HistoryPage historyUpdate={historyUpdate}/>

        <Navbar 
            displayedPage={displayedPage}
        />
    </div>
    )
}

export default App;