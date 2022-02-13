import React, { useEffect, useState } from 'react'
import "../Chat/chat.css"
import { user } from '../Join/Join';
import socketIO from "socket.io-client";
import Message from "../Message/Message";
import ReactScrollToBottom from 'react-scroll-to-bottom';
import cross from "../../Image/cut.png"

let socket;

const ENDPOINT = "https://chitchatofficial.herokuapp.com/"
function Chat() {

  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () =>{
    const message = document.getElementById('chatInput').value;

    socket.emit('message',{message,id})
    document.getElementById('chatInput').value = '';
  }
  
  console.log(messages);
  useEffect(() => {
     socket = socketIO(ENDPOINT, { transports: ['websocket'] });
    socket.on('connect', () => {
      alert('connected')
      setid(socket.id);
    });
    socket.emit('joined',{user})

    socket.on('welcome',(data)=>{
      setMessages([...messages,data])
      console.log(data.user, data.message);
    })

    socket.on('userJoined',(data)=>{
      setMessages([...messages,data])
      console.log(data.user, data.message);
    })

    socket.on('leave',(data)=>{
      setMessages([...messages,data])
      console.log(data.user, data.message);
    })
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, []);

  useEffect(() => {
    socket.on('sendMessage',(data)=>{
      setMessages([...messages,data])
      console.log(data.user, data.message, data.id);
    })
    
  
    return () => {
      // socket.emit('disconnect');
      socket.off();
     
    };
  }, [messages]);
  
  return (

    <>
      <div className="chatPage">
        <div className="chatContainer">
          <div className="header">
            <h3>ChitChat ( Text Room )</h3>
           <a href='/' ><img  className="imgCut" src={cross} alt="cut"  /></a>
          </div>
          <ReactScrollToBottom className="body"> 
         {messages.map((item,i)=> <Message user = {item.id===id ? '': item.user} message={item.message} classs={item.id === id ?'right':'left'}/>)}
          </ReactScrollToBottom>
          <div className="footer">
          <input onKeyPress={(event)=> event.key === 'Enter' ? send() : null} type="text" placeholder="Drop a message" id="chatInput"></input>
          <button onClick={send} type="submit" id="chatButton">Send</button>
           </div>

        </div>
      </div>

    </>
  )
}

export default Chat;
