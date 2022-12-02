/* eslint-disable */
import React, { useEffect } from "react"
import { Global, Saving, Server} from "./functions"
import { todos, projects, local_actions, log } from "./modules"

const Init = (self) => {

    let [displayedLog,] = React.useState([]);

    let [mode, ] = React.useState(Global.activeScheme);
    let [color, ] = React.useState();

    useEffect(() => {
        log.setLog = displayedLog;
        Global.makeMode = mode;
        Global.makeAccent = color;
    }, [])

    useEffect(() => {
        console.warn("Initialization");
        log.add("init");

        Global.setSuperContainer = document.getElementById("AppContainer").dataset;
        Global.setFormContainer = document.getElementById("FormContainer");
        Global.setMenuOpen = Global.superContainer.menuopen;
        Global.setOverlayActive = Global.superContainer.overlayactive;
        Global.setActiveProject = Global.superContainer.activeproject;

        let last_page = Saving.loadSave(Global.PAGE_KEY);
        log.add("Last page: " + last_page);
        if (last_page !== undefined && last_page !== "Settings") Global.setActivePage = last_page;
        else{Global.setActivePage = Global.superContainer.activepage;}

        let local_accent = Saving.loadSave(Global.COLOR_ACCENT_KEY);
        log.add("Local Accent: " + local_accent);
        Global.accent = local_accent;

        let local_scheme = Saving.loadSave(Global.COLOR_SCHEME_KEY);
        log.add("Local Scheme: " + local_scheme);
        Global.mode = local_scheme;

        todos.load();
        projects.load();
        local_actions.load();

        let lastBackend = Saving.loadSave(Global.BACKEND_KEY);
        if (lastBackend !== undefined) Global.setBackend = lastBackend;

        Server.ping();

        Global.appRerender();

    }, []) 

    setInterval(() => {
        // ! Commented just for dev
        // Server.ping();
    }, 10000)


    return (null)
}

export default Init