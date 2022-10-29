import React from 'react';
import "../css/Global.css";
import "../css/Home.css";

import { Local, Server } from '../components/functions';

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
        <Section title="News">
          <p>{displayed_text}</p>
        </Section>
        <Section title="Last Todos"/>
        <Section title="Smth else"/>
      </div>
  )
}

const Section = (self) => {
  return (
    <div className="SectionContainer">
      <h2>{self.title}</h2>
    </div>
  )
}

export default Home