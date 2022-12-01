
import { useEffect } from "react"
import { Global, Saving, Server} from "./functions"
import { todos, projects, local_actions } from "./modules"

const Init = (self) => {

    useEffect(() => {
        console.warn("Initialization");

        Global.setSuperContainer = document.getElementById("AppContainer").dataset;
        Global.setFormContainer = document.getElementById("FormContainer");
        Global.setMenuOpen = Global.superContainer.menuopen;
        Global.setOverlayActive = Global.superContainer.overlayactive;
        Global.setActiveProject = Global.superContainer.activeproject;

        let last_page = Saving.loadSave(Global.PAGE_KEY);
        if (last_page !== undefined && last_page !== "Settings") Global.setActivePage = last_page;
        else{Global.setActivePage = Global.superContainer.activepage;}

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