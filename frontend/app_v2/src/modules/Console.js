
/* esling-disable */

import React from "react";

import "../css/Console.css";

import { log } from "../functionality/modules";

export default function Console () {

    return (
        <div id="ConsoleContainer">
            {log.log?.map((entry) => {
                return(
                    <ConsoleEntry content={entry}/>
                )
            })}
        </div>
    )
}

const ConsoleEntry = (props) => {
    return (
        <label className="entryText">[Client]: {props.content}</label>
    )
}