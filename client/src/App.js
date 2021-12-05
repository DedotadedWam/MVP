import React, { Component, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

import { Login } from "./components/Login.jsx";
import { ChatBoard } from "./components/ChatBoard.jsx";
import { GuessBoard } from "./components/GuessBoard.jsx";
import { ScoreBoard } from "./components/ScoreBoard.jsx";
import RoomVideo from "./components/RoomVideo.js";

// creates the connection to the socket in the server
const socket = io.connect("http://localhost:5000");

const App = () => {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [answer, setAnswer] = useState("");
  const [actor, setActor] = useState(false);
  const [me, setMe] = useState("");

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true);
    }
  };

  useEffect(() => {
    joinRoom();
  }, [user, room]);

  useEffect(() => {
    socket.on("me", (id) => {
      setMe(id);
      console.log(id);
    });
  }, [me]);

  return (
    <div className="container">
      <Login setUser={setUser} setRoom={setRoom} setActor={setActor} />
      {showChat ? (
        <>
          <ScoreBoard />
          <RoomVideo socket={socket} room={room} />
          <GuessBoard socket={socket} user={user} room={room} answer={answer} />
          <ChatBoard socket={socket} user={user} room={room} />
        </>
      ) : null}
    </div>
  );
};

export default App;
