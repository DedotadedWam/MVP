import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";

export const ChatBoard = ({ socket, user, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      let d = new Date(Date.now());
      d = d.getHours() + ":" + d.getMinutes();
      const messageData = {
        room,
        user,
        message: currentMessage,
        time: d,
      };

      await socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (messageData) => {
      console.log(messageData);
      setMessageList((list) => [...list, messageData]);
    });
  }, [socket]);

  return (
    <div className="chat-board">
      <div className="chat-header">Chat: </div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return (
            <div className="message">
              <div>
                <div className="message-content">{messageContent.message}</div>
                <div className="message-meta">{messageContent.time}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};
