

import { Local } from "../functionality/functions";

import "../css/Settings.css";

export default function Settings_Page() {
    return(
        <div id="Settings_Page">
            <div className="Section">
                <label>Settings</label>
            </div>

            <div className="Section">
                <label>Quick Actions</label>
                <div className="grid2">
                    <button className="stretch">Ping Server</button>
                    <button className="stretch">Get Update</button>
                </div>
            </div>

        </div>
    )
}