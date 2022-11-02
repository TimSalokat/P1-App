import React from "react";

/* eslint-disable */

const TestingPage = () => {

    const html = `
        <style contenteditable style="display: block; white-space: pre;background-color: var(--secondary_background); font-family:pixel;">
            .TestingScheme {
                --text_color: #eef2e6;
            
                /* --main_accent: #fdd584; */
                --main_accent-h: 48;
                --main_accent-s: 100%;
                --main_accent-l: 67%;
            
                --dark_shadow: rgb(150,150,150);
            
                --main_background: #6f8c64;
                --secondary_background: #2a4731;   
            }
        </style>
    `

    const InlineCss = () =>  <div className="font-pixel" style={{color:"var(--text_color)"}} dangerouslySetInnerHTML={{ __html: html }} />;

    return (
        <div id="TestingPage">
            <div id="ColorContainer">
                <div style={{backgroundColor:"var(--main_accent-dark)"}}>
                    Base Dark
                </div>

                <div style={{backgroundColor:"var(--main_accent)"}}>
                    Base
                </div>

                <div style={{ backgroundColor:"var(--main_accent-light)"}}>
                    Base Light
                </div>

                <div style={{backgroundColor:"var(--main_background)"}}>
                    Main Background
                </div>

                <div style={{backgroundColor:"var(--secondary_background)"}}>
                    Secondary Background
                </div>

                <div style={{backgroundColor:"var(--dark_shadow)"}}>
                    Dark Shadow
                </div>

            </div>
            <InlineCss/>
            
        </div>
    )
}

export default TestingPage;