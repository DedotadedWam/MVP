require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const morgan = require("morgan");
const io = require("socket.io")(server, {
  cors: {
    //TODO: may want to set this to the URL of the client app when deploying
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const { PORT: port } = process.env;

app.use(cors());
app.use(express.static("./client/public"));
app.use(morgan("dev"));
app.use(express.json());

app.post("/login", (req, res) => {
  console.log("CHECK!");
  res.status(200).send("Noice");
});

const users = {};

const socketToRoom = {};

// creating a connection via out socket, detects if someone connected to the socket.io server
io.on("connection", (socket) => {
  // provides us with an id on the front end side of things.
  socket.emit("me", socket.id);

  // joins a specific room after logging in
  socket.on("joinRoom", (data) => {
    socket.join(data);
  });

  // we recieve a message from the front end, we then send that data we received and send tit back to all users currently in that room!
  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data);
  });

  // we recieve a guess from the front end, we then send that data we received and send tit back to all users currently in that room!
  socket.on("sendGuess", (data) => {
    socket.to(data.room).emit("receiveGuess", data);
  });

  // socket.on("peerInitiated", ({ signal, from, room }) => {
  //   socket.to(room).emit("peerRequest", { signal, from, room });
  // });

  // socket.on("acceptPeer", ({ to, signal }) => {
  //   io.to(to).emit("peerAccepted", signal);
  // });
  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 10) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("recieving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  // provides instruction on waht to do when a user leaves the app or closes the browser.
  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });
});

server.listen(port, () =>
  console.log(`👂 Listening on http://localhost:${port}`)
);
