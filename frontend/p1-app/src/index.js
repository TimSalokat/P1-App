import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <>
    <h1 style={{
        position: "absolute",
        color: "white",
        fontSize: "25px",
        textAlign: "center",
        justifySelf: "center",
        alignSelf: "center",
        margin: "20px",
      }}>If you see this something went wrong</h1>
    <App></App>
  </>
);

reportWebVitals();
