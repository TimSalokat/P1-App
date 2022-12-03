
import React from "react";

import "../css/modules/Collapsible.css";

export default function Collapsible(props) {

    const [open, setOpen] = React.useState(false);

    function isOpen() {
        return open ? " open" : "";
    }

    return(
        <div id="Collapsible" className={isOpen()}>
            <div className="Header" onClick={() => setOpen(!open)}>
                <label id="SectionLabel"> {props.label} </label>
                <span id="CollapsibleIndicator"/>
            </div>
            <div id="CollapsibleContent">
                {props.children}
            </div>
        </div>
    )
}