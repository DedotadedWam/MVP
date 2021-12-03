import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

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
        mainVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {});
  }, []);

  return <div className="app">App</div>;
}

export default App;
