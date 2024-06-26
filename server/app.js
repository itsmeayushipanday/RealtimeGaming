const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "connected",
  });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (roomName) => {
    console.log("Joining a room....");
    let rooms = io.sockets.adapter.rooms;
    let room = rooms.get(roomName);

    if (room == undefined) {
      socket.join(roomName);
      socket.emit("created", "New Room Created");
    } else if (room.size == 1) {
      socket.join(roomName);
      socket.emit("joined", "You joined a room");
    } else {
      socket.emit("full", "This room is full");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});
