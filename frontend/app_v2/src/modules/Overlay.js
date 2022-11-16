

export default function Overlay(props) {
    return (
        <div id="Overlay" onClick={props.click}>
            {props.children}
        </div>
    )
}