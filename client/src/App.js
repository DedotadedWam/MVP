import React, { Component, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

import { Login } from "./components/Login.jsx";
import { ChatBoard } from "./components/ChatBoard.jsx";
import { GuessBoard } from "./components/GuessBoard.jsx";
import { ScoreBoard } from "./components/ScoreBoard.jsx";
import { ActorVideoPlayer } from "./components/ActorVideoPlayer.jsx";
import { GuesserVideoPlayer } from "./components/GuesserVideoPlayer.jsx";

// creates the connection to the socket in the server
const socket = io.connect("http://localhost:5000");

const App = () => {
  // messaging component state
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [answer, setAnswer] = useState("test");
  const [actor, setActor] = useState(false);

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true);
    }
  };

  useEffect(() => {
    joinRoom();
  }, [user, room]);

  return (
    <div className="container">
      <Login setUser={setUser} setRoom={setRoom} setActor={setActor} />
      {showChat ? (
        <>
          <ScoreBoard />
          {actor ? <ActorVideoPlayer /> : <GuesserVideoPlayer />}
          <GuessBoard socket={socket} user={user} room={room} answer={answer} />
          <ChatBoard socket={socket} user={user} room={room} />
        </>
      ) : null}
    </div>
  );
};

export default App;
