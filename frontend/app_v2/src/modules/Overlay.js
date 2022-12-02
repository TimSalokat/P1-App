import { Global } from "../functionality/functions"


export default function Overlay(props) {

    function onClick_handler() {
        props.click()
        Global.clearForm();
    }

    return (
        <div id="Overlay" onClick={() => {
            onClick_handler()
        }}>
            {props.children}
        </div>
    )
}