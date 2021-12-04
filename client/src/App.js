import React, { Component, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

import { Login } from "./components/Login.jsx";
import { VideoPlayer } from "./components/VideoPlayer.jsx";
import { ChatBoard } from "./components/ChatBoard.jsx";
import { GuessBoard } from "./components/GuessBoard.jsx";
import { ScoreBoard } from "./components/ScoreBoard.jsx";

// creates the connection to the socket in the server
const socket = io.connect("http://localhost:5000");

const App = () => {
  const [actor, setActor] = useState();
  const [guesser, setGuesser] = useState();
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();

  // messaging component state
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [answer, setAnswer] = useState("test");

  const mainVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        // mainVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });
  }, []);

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
      <Login setUser={setUser} setRoom={setRoom} />
      {showChat ? (
        <>
          <ScoreBoard />
          <VideoPlayer />
          <GuessBoard socket={socket} user={user} room={room} answer={answer} />
          <ChatBoard socket={socket} user={user} room={room} />
        </>
      ) : null}
    </div>
  );
};

export default App;
