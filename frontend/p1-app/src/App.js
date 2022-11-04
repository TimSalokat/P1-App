import React from 'react';
import './App.css';
import "./css/Global.css";
import { useState } from 'react';

import Init from './init';

import Navbar from './components/navbar';
import SideMenu from './components/sideMenu';
import HistoryPage from './components/History';

import Home from './pages/Home';
import Todo from './pages/Todo';
import TestingPage from "./pages/TestingPage";
import DevPage from './pages/DevPage';

import { Global } from './components/functions';

function App() {
    const [displayedPage, setDisplayedPage] = useState("");

    const [historyUpdate, setHistoryUpdate] = useState(false);
    const reRenderHistory = () => {
        setHistoryUpdate(!historyUpdate);}
    
    const [all, updateAll] = useState(false);
    const reRenderAll = () => {
        updateAll(!all);}


    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    React.useState(() => {
        Global.setAppRerender = forceUpdate;
    }, [])

    return (
    <div 
        id="superContainer"
        className={'superContainer ' + Global.colorScheme} 

        data-serverreachable=""

        data-menuopen="true"
        data-activepage="Home" 
        data-colorscheme=""
        data-overlayactive="false"
    >
        <Init setDisplayedPage={setDisplayedPage}/>

        <SideMenu
            setDisplayedPage={setDisplayedPage}
            reRenderHistory={reRenderHistory}
        />

        <div className='PageWrapper'>
            <Home/>
            <Todo/>
            <TestingPage/>
            <DevPage reRenderHistory={reRenderHistory}/>
        </div>

        <div id="PageOverlay" onClick={() => Global.setMenuOpen = true}/>
        <HistoryPage historyUpdate={historyUpdate}/>

        <Navbar 
            displayedPage={displayedPage}
        />

        {/* <div id="page-center-vertical"/>
        <div id="page-center-horizontal"/> */}

    </div>
    )
}

export default App;