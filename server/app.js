const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { generateRandomId } = require("./helper.js");

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

  //FOR CREATING A NEW ROOM
  socket.on("createRoom", (msg) => {
    const roomId = generateRandomId();
    socket.join(roomId);
    socket.emit("roomIdCreated", roomId);
  });

  //FOR JOINING A ROOM
  socket.on("joinRoom", (roomId) => {
    const rooms = io.of("/").adapter.rooms;
    const isRoomIdPresent = rooms.has(roomId);

    if (isRoomIdPresent && rooms.get(roomId).size === 1) {
      socket.join(roomId);
      socket.emit("roomJoined", "Joined a Room");
    } else if (isRoomIdPresent && rooms.get(roomId).size > 1) {
      socket.emit("roomJoined", "Room is Full!");
    } else {
      socket.emit("roomJoined", "No such room exits");
    }

    if (isRoomIdPresent && rooms.get(roomId).size === 2) {
      io.to(roomId).emit("readyForGame", "Now you can play the game");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});
