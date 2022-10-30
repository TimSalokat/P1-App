
import { useEffect } from "react"
import { Global, Saving} from "./components/functions"

const Init = (self) => {

    useEffect(() => {
        console.warn("Initialization");

        Global.setSuperContainer = document.getElementById("superContainer").dataset;
        Global.setMenuOpen = Global.superContainer.menuopen;
        Global.setOverlayActive = Global.superContainer.overlayactive;
        Global.setTodoPageMounted = false;

        let last_page = Saving.loadSave(Global.PAGE_KEY);
        if (last_page !== undefined) Global.setActivePage = last_page;
        else{Global.setActivePage = Global.superContainer.activepage;}

        let lastBackend = Saving.loadSave(Global.BACKEND_KEY);
        if (lastBackend !== undefined) Global.setBackend = lastBackend;

        /* eslint-disable */
        self.setDisplayedPage(Global.activePage);
    }, []) 


    return (null)
}

export default Init