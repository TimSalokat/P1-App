import React, {useState, useEffect} from 'react';
import "../css/Global.css";
import "../css/Home.css";

function Home(self) {

  const [text, setText] = useState([]);
  
  useEffect(() => {
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
        <button onClick={fetchText}> Reload </button>
      </div>
    </div>
  )
}

export default Home