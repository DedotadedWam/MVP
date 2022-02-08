require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const { PORT: port } = process.env;

app.use(cors());
app.use(express.static("./client/public"));
app.use(express.json());

app.post("/hostRoom", (req, res) => {
  console.log("host room: ", req.body);
  res.status(200).send("Created Room");
});

app.post("/joinRoom", (req, res) => {
  console.log("join room: ", req.body);
  res.status(200).send("Joined Room");
});

app.listen(port, () => console.log(`👂 Listening on http://localhost:${port}`));

// app.post("/login", (req, res) => {
//   res.status(200).send("Noice");
// });

// const users = {};

// const socketToRoom = {};

// io.on("connection", (socket) => {
//   socket.on("joinRoom", (data) => {
//     socket.join(data);
//   });

//   socket.on("sendMessage", (data) => {
//     socket.to(data.room).emit("receiveMessage", data);
//   });

//   socket.on("sendGuess", (data) => {
//     socket.to(data.room).emit("receiveGuess", data);
//   });

//   socket.on("join room", (roomID) => {
//     if (users[roomID]) {
//       const length = users[roomID].length;
//       if (length === 10) {
//         socket.emit("room full");
//         return;
//       }
//       users[roomID].push(socket.id);
//     } else {
//       users[roomID] = [socket.id];
//     }
//     socketToRoom[socket.id] = roomID;
//     const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

//     console.log(usersInThisRoom);

//     socket.emit("all users", usersInThisRoom);
//   });

//   socket.on("sending signal", (payload) => {
//     io.to(payload.userToSignal).emit("user joined", {
//       signal: payload.signal,
//       callerID: payload.callerID,
//       actor: payload.actor,
//     });
//   });

//   socket.on("returning signal", (payload) => {
//     io.to(payload.callerID).emit("recieving returned signal", {
//       signal: payload.signal,
//       id: socket.id,
//     });
//   });

//   socket.on("disconnect", () => {
//     const roomID = socketToRoom[socket.id];
//     let room = users[roomID];
//     if (room) {
//       room = room.filter((id) => id !== socket.id);
//       users[roomID] = room;
//     }
//   });
// });
