
/* esling-disable */

import React from "react";

import "../css/modules/Console.css";

import { log } from "../functionality/modules";

export default function Console () {

    return (
        <div id="ConsoleContainer">
            {log.log?.map((content) => {
                return(
                    <ConsoleEntry content={content.entry} from={content.from}/>
                )
            })}
        </div>
    )
}

const ConsoleEntry = (props) => {

    function isShown() {
        if(log.show[props.from] === undefined) return "";
        return log.show[props.from] ? "" : " hidden";
    }

    return (
        <label className={"entryText "+ isShown()}>
            <span className={"highlighted " + props.from}>[{props.from}]: </span> 
            {props.content}</label>
    )
}