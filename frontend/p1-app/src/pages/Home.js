import React from 'react';
import "../css/Global.css";
import "../css/Home.css";

import { main_text, fetchText } from '../components/functions';

import { saveAs } from 'file-saver';
import axios from "axios"

function Home(self) {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [displayed_text, set_displayed_text] = React.useState(main_text);

  //* Runs on first render
  React.useEffect(() => {
    async function asyncFunc(){
      set_displayed_text(await fetchText());
    }
    asyncFunc();
  }, [])

  const fetchUpdate = async () => {
    console.log("fetching for update");
    return await axios.get(self.backend + '/get-update?version=1', {
      responseType: 'blob',
    })
      .then(response => response.data)
      .then(blob => saveAs(blob, "test2.txt"))
  }

  function PageStatus() {
    return (self.activePage === "Home" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    return (self.menuOpen ? " MenuClosed" : " MenuOpen")
  }

  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <img className="icon" alt="" src="../icon1@2x.png" />
      <div className="homeContainer">
        <h1> Neue News </h1>
        <p> {displayed_text} </p>
        <button onClick={() => {
          fetchText();
          forceUpdate();
        }}> Reload </button>
      </div>
    </div>
  )
}

export default Home