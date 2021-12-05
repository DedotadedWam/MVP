import React, { useState, useRef, useEffect } from "react";
import Peer from "simple-peer";
import "regenerator-runtime";

export const GuesserVideoPlayer = ({ socket }) => {
  const [stream, setStream] = useState({});
  const [peerRequest, setPeerRequest] = useState();
  const [peerAccepted, setPeerAccepted] = useState();

  const video = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    socket.on("peerRequest", ({ signal, from, room }) => {
      console.log("this happened");
      setPeerRequest({ isPeerInitiated: true, signal, from, room });
    });
  }, []);

  const acceptConnection = () => {
    setPeerAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false });

    peer.on("signal", (signal) => {
      console.log("this too!");
      socket.emit("acceptPeer", { signal, to: peerRequest.from });
    });

    peer.on("stream", (currentStream) => {
      setStream(currentStream);
      video.current.srcObject = currentStream;
    });

    console.log("Is this rendering?: ", peerRequest);
    peer.signal(peerRequest.signal);
    console.log("Broke at signal...");

    connectionRef.current = peer;
  };

  return (
    <div className="video-player">
      <div className="video">
        <video
          playsInline
          muted
          ref={video}
          autoPlay
          className="video-guesser"
        />
      </div>
      <button onClick={acceptConnection}>Ready!</button>
    </div>
  );
};
