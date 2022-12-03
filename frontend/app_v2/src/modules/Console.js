
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
    return (
        <label className={"entryText " + props.from}>[{props.from}]: {props.content}</label>
    )
}