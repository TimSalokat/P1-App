import "../css/Global.css";
import "../css/Chat.css";

function Chat(self) {

  function PageStatus() {
    return (self.activePage === "Chat" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    if(self.activePage === "Chat"){
      return (self.menuOpen ? " MenuClosed" : " MenuOpen")
    } return " MenuClosed";
  }

  return (
    <div className={"PageContainer" + MenuOpen() + PageStatus()}>
      <div className="chatContainer">
      </div>
      
      <textarea className='chatInput' placeholder='Your Text'/>
    </div>
  )
}

export default Chat