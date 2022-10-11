import React from 'react';
import "../css/Global.css";
import "../css/Home.css";

import { main_text, fetchText } from '../components/functions';

// ? dependencies for commented func later
// import { saveAs } from 'file-saver';
// import axios from "axios"

function Home(self) {

  const [displayed_text, set_displayed_text] = React.useState(main_text);

  //* Runs on first render
  React.useEffect(() => {
    async function asyncFunc(){
      var text = await fetchText();
      if(text !== undefined){
        set_displayed_text(text);
      } else {
        set_displayed_text("Keine Serververbindung");
      }
    }
    asyncFunc();
  }, [])

  // ? dont know about this. idea was pushing newer apk from api
  // const fetchUpdate = async () => {
  //   console.log("fetching for update");
  //   return await axios.get(self.backend + '/get-update?version=1', {
  //     responseType: 'blob',
  //   })
  //     .then(response => response.data)
  //     .then(blob => saveAs(blob, "test2.txt"))
  // }

  function PageStatus() {
    return (self.activePage === "Home" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    if(self.activePage === "Home"){
      return (self.menuOpen ? " MenuClosed" : " MenuOpen")
    } return " MenuClosed";
  }

  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <img className="icon" alt="" src="../icon1@2x.png" />
      <div className="homeContainer">
        <h1> Neue News </h1>
        <h3> {displayed_text} </h3>
      </div>
    </div>
  )
}

export default Home