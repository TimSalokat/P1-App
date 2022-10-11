import React from 'react'

export default function DevPage(self) {
  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
        Hello
    </div>
  )


  function PageStatus() {
    return (self.activePage === "Dev" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    if(self.activePage === "Dev"){
      return (self.menuOpen ? " MenuClosed" : " MenuOpen")
    } return " MenuClosed";
  }
}
