import React from 'react';
import "../css/Global.css";
import "../css/Home.css";

import {Server } from '../components/functions';

import {ProjectContainer, SectionSeperator, TodoContainer} from "../components/components";

function Home(self) {

  const [displayed_text, set_displayed_text] = React.useState();

  //* Runs on first render
  React.useEffect(() => {
    async function asyncFunc(){
      var text = await Server.fetchText();
      if(text !== undefined){
        set_displayed_text(text);
      } else {
        set_displayed_text("Keine Serververbindung");
      }
    }
    asyncFunc();
  }, [])

  return (
      
      <div className={"HomeContainer"}>

        <SectionSeperator label="Smth else"/>

        <SectionSeperator label="Last Todos"/>
        <section id="HomeSection">
          <TodoContainer/>
        </section>

        <SectionSeperator label="Projects"/>
        <ProjectContainer/>

      </div>
  )
}

export default Home