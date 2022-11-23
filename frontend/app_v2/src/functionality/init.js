
import { useEffect } from "react"
import { Global, Saving, Server} from "./functions"

const Init = (self) => {

    useEffect(() => {
        console.warn("Initialization");

        Global.setSuperContainer = document.getElementById("AppContainer").dataset;
        Global.setFormContainer = document.getElementById("FormContainer");
        Global.setMenuOpen = Global.superContainer.menuopen;
        Global.setOverlayActive = Global.superContainer.overlayactive;
        Global.setActiveProject = Global.superContainer.activeproject;

        let last_colorScheme = Saving.loadSave(Global.COLOR_SCHEME_KEY);
        if(last_colorScheme !== undefined) Global.setColorScheme = last_colorScheme;

        let last_page = Saving.loadSave(Global.PAGE_KEY);
        if (last_page !== undefined && last_page !== "Settings") Global.setActivePage = last_page;
        else{Global.setActivePage = Global.superContainer.activepage;}

        let local_todos = Saving.loadSave(Global.TODO_KEY);
        if (local_todos !== undefined) Global.setDisplayedTodos = local_todos;

        let lastBackend = Saving.loadSave(Global.BACKEND_KEY);
        if (lastBackend !== undefined) Global.setBackend = lastBackend;

        let local_actions = Saving.loadSave(Global.LOCAL_ACTIONS_KEY);
        if (local_actions !== undefined) Global.setLocalActions = []; // ! This is just for dev purposes and should be changed

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