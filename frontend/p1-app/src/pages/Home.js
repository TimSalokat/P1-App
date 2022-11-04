import React from 'react';
import "../css/Global.css";
import "../css/Home.css";

// import {Server } from '../components/functions';

import {ProjectContainer, SectionSeperator} from "../components/components";
import SvgMorning from '../components/svg/SvgMorning';

function Home() {

  return (
      <div className={"HomeContainer"}>

        <section id="DailyImgSection" style={{height: "200px"}}>
          <div id="DailyImgOverlay"/>
          <label id="HomeHeading"> Good Morning <span id="HomeHeadingColored"> Admin </span></label>
          <SvgMorning/>
        </section>

        <SectionSeperator label="Your day"/> 
        <section id="DailySection">

        </section>

        <SectionSeperator label="Categories"/>
        <ProjectContainer/>

      </div>
  )
}

export default Home