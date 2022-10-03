import React, {useState, useEffect} from 'react';
import "../css/Global.css";
import "../css/Home.css";

import { saveAs } from 'file-saver';
// const axios = require('axios');
import axios from "axios"

function Home(self) {

  const [text, setText] = useState([]);
  
  useEffect((fetchText) => {
    const fetch = async () =>{
      fetchText();
    }
    fetch();
  }, [])

  const fetchText = async () => {
    const res = await fetch(self.backend + "/get-main");
    const response = await res.json();

    const data = response.text;
    setText(data);
  }

  const fetchUpdate = async () => {
    console.log("fetching for update");
    return await axios.get(self.backend + '/get-update?version=1', {
        responseType: 'blob',
    })
    .then(response => response.data)
    .then(blob => saveAs(blob, "test2.txt"))
  }

  const click = async () =>{
    fetchUpdate();
    fetchText();
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
        <p> {text} </p>
        <button onClick={click}> Reload </button>
      </div>
    </div>
  )
}

export default Home