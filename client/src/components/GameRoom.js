import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("/");

export const GameRoom = ({ user, room }) => {
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socketId = socket.id;
    socket.emit(user.role === "host" ? "creating room" : "joining room", {
      ...user,
      round,
      phase,
      room,
      socketId,
    });

    socket.on("user joined", (d) => {
      console.log(d);
      setUsers([...users, d]);
    });
  }, []);

  return <h1>Game Room</h1>;
};
