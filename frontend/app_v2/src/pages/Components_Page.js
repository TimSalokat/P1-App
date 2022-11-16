
import Projects from "../modules/Projects";
import Todos from "../modules/Todos";


import '../css/Pages.css';

export default function ComponentsPage() {
    return (
        <div id="Components_Page">
        
        <div className="Section">
            <h1> This is an h1</h1>
            <h2> This is an h2</h2>
            <h3> This is an h3</h3>
            <h4> This is an h4</h4>
            <label> This is a label</label>
            <p>This is a paragraph</p>
            <a href="#"> And this is a link </a>

            <span className="seperator small"/>
        </div>

        <div className="Section">

            <button> Primary </button>
            <button className="button_secondary"> Secondary </button>

            <button className="large"> large </button>
            <button className="button_secondary"> default </button>
            <button className="button_secondary small"> small </button>
            
            <span className="seperator"/>

            <div className="row">
                <button className="stretch"> Primary stretch</button>
                <button className="button_secondary stretch"> Secondary stretch</button>
            </div>
            
            <span className="seperator large"/>
        
        </div>

        <div className="Section">

            <h3>Accent colors</h3>
            <div className="row">
                <div id="test"/>
            </div>

            <form>
                <input placeholder="Name"></input>
                <select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </select>
                <textarea placeholder="more text"/>
            </form>

        </div>

        <span className="seperator" style={{alignSelf:"flex-start"}}/>
        <h2>Components</h2>

        <div className="row" style={{alignSelf:"center"}}>
            <button className="large flex">Do shit</button>
            <button className="large flex">Do more shit</button>
            <button className="large flex">Do even more shit</button>
        </div>

        <span className="seperator" style={{alignSelf:"flex-start"}}/>
        <h2>Dev Settings</h2>

        </div>
    )
}