import React, { useState, useRef, useEffect } from "react";
// import { SocketContext } from "./SocketContext";

export const ActorVideoPlayer = () => {
  const [stream, setStream] = useState({});

  const video = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        video.current.srcObject = stream;
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="video-player">
      <div className="video">
        <video ref={video} muted />
      </div>
    </div>
  );
};
