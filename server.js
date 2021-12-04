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

// creating a connection via out socket, detects if someone connected to the socket.io server
io.on("connection", (socket) => {
  // provides us with an id on the front end side of things.
  console.log(`User ${socket.id} connected`);

  // joins a specific room after logging in
  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User ${socket.id} joined room ${data}`);
  });

  // we recieve a message from the front end, we then send that data we received and send tit back to all users currently in that room!
  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data);
  });

  // we recieve a guess from the front end, we then send that data we received and send tit back to all users currently in that room!
  socket.on("sendGuess", (data) => {
    socket.to(data.room).emit("receiveGuess", data);
  });

  // provides instruction on waht to do when a user leaves the app or closes the browser.
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    //TODO: send a patch request to the database to remove the user from the pool of users in a game room.
  });
});

server.listen(port, () =>
  console.log(`👂 Listening on http://localhost:${port}`)
);
