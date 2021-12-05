import React, { useState, useRef, useEffect } from "react";
import Peer from "simple-peer";
import "regenerator-runtime";

export const ActorVideoPlayer = ({ socket, me, room, answer }) => {
  const [stream, setStream] = useState({});
  const [peerRequested, setPeerRequested] = useState(false);
  const [peerAccepted, setPeerAccepted] = useState(false);

  const video = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((currentStream) => {
        setStream(currentStream);
        video.current.srcObject = currentStream;
      })
      .catch((err) => console.log(err));
  }, []);

  const requestConnection = () => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("peerInitiated", { signal: data, from: me, room });
    });

    socket.on("peerAccepted", (signal) => {
      setPeerAccepted(true);

      peer.signal(signal);

      connectionRef.current = peer;
    });
  };

  return (
    <div className="video-player">
      <div className="video">
        <div>{answer}</div>
        <video playsInline muted ref={video} autoPlay className="video-actor" />
      </div>
      <button onClick={requestConnection}>Start Round</button>
    </div>
  );
};

// import React, { useState, useRef, useEffect } from "react";
// // import { SocketContext } from "./SocketContext";
// import Peer from "simple-peer";
// import { Socket } from "socket.io-client";
// import "regenerator-runtime/runtime";

// export const VideoPlayer = ({ socket, actor, user, room, word, me }) => {
//   const [stream, setStream] = useState({});
//   const [call, setCall] = useState({});

//   const videoPlayer = useRef();
//   const connectionRef = useRef();

//   useEffect(async () => {
//     if (actor) {
//       const currentStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: false,
//       });

//       await setStream((prevState) => currentStream);
//       videoPlayer.current.srcObject = currentStream;
//       const peer = new Peer({
//         initiator: true,
//         trickle: false,
//         currentStream,
//       });

//       peer.on("signal", (data) => {
//         socket.emit("broadcasting", { signalData: data, from: me, room });
//       });

//       socket.on("connectedToActor", (signal) => {
//         peer.signal(signal);
//         peer.addStream(stream);
//         connectionRef.current = peer;
//       });
//     } else {
//       socket.on("connectToActor", ({ signalData, from, room }) => {
//         console.log("ping 1");
//         setCall({ signalData, from, room });
//         const peer = new Peer({ initiator: false, trickle: false });

//         peer.on("signal", (data) => {
//           console.log("ping 2");
//           socket.emit("actorAcknowledged", { signal: data, to: from });
//         });

//         peer.on("stream", (currentStream) => {
//           console.log("ping 3");
//           setStream(currentStream);
//           videoPlayer.current.srcObject = currentStream;
//         });

//         peer.signal(signalData);

//         connectionRef.current = peer;
//       });
//     }
//   }, []);

//   return (
//     <div className="video-player">
//       <div>
//         <video
//           playsInline
//           muted
//           ref={videoPlayer}
//           autoPlay
//           className={actor ? "video-me" : "video-other"}
//         />
//       </div>
//     </div>
//   );
// };
