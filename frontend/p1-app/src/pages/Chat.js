import "../css/Global.css";
import "../css/Chat.css";

function Chat({ menuOpen, activePage }) {

  function PageStatus() {
    return (activePage === "Chat" ? " SlideIn" : " SlideOut");
  }
  function MenuOpen() {
    return (menuOpen ? " MenuClosed" : " MenuOpen")
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