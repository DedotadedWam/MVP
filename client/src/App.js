import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

import { Login } from "./components/Login.jsx";
import { VideoPlayer } from "./components/Videoplayer.jsx";
import { ChatBoard } from "./components/ChatBoard.jsx";
import { GuessBoard } from "./components/GuessBoard.jsx";
import { ScoreBoard } from "./components/ScoreBoard.jsx";

const socket = io.connect("http://localhost:5000");

function App() {
  const [actor, setActor] = useState();
  const [guesser, setGuesser] = useState();
  const [room, setRoom] = useState();
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();

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

  return (
    <div className="container">
      <Login />
      <ScoreBoard />
      <VideoPlayer />
      <GuessBoard />
      <ChatBoard />
    </div>
  );
}

export default App;
