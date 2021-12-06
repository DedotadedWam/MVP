import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";

export const ChatBoard = ({ socket, user, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
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
              <div
                className={
                  messageContent.user === user
                    ? "my-message"
                    : "opponents-message"
                }
              >
                <div className="message-content">{messageContent.message}</div>
                <div className="message-meta">{`${messageContent.user} ${messageContent.time}`}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            className="field"
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
};
