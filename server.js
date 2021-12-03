require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const { PORT: port } = process.env;

app.use(cors());
app.use("/", express.static("./client/dist"));

app.get("/", (req, res) => {
  res.send("Server is running.");
});

// creating a connection via out socket
io.on("connection", (socket) => {
  // provides us with an id on the front end side of things.
  socket.emit("me", socket.id);

  //
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  // socket.on("guessSubmitted", () => {
  //   socket.broadcase.emit()
  // })

  // socket.on("callUser", (data) => {
  //   io.to(data.userToCall).emit("callUser", {
  //     signal: data.signalData,
  //     from: data.from,
  //     name: data.name,
  //   });
  // });

  // socket.on(
  //   "answerCall",
  //   (data) => io.to(data.to).emit("callAccepted"),
  //   data.signal
  // );
});

server.listen(port, () =>
  console.log(`👂 Listening on http://localhost:${port}`)
);
