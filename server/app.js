const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { generateRandomId } = require("./helper.js");

const app = express();

//to handle the CORS error 
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

//creates a http server 
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

//when new user joins 
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  //FOR CREATING A NEW ROOM
  socket.on("createRoom", (msg) => {
    const roomId = generateRandomId(); //random id is generated 
    socket.join(roomId); //sockets joins the room with that roomId 
    socket.emit("roomIdCreated", roomId); //emits an event roomIdCreated => sends room id to the frontend 
  });

  //FOR JOINING A ROOM
  socket.on("joinRoom", (roomId) => {
    const rooms = io.of("/").adapter.rooms; //give all the roomIds at '/' path 
    const isRoomIdPresent = rooms.has(roomId); //checks if the roomId which the user has inputed in the fronted exists or not

    //Three conditions can occur:
    if (isRoomIdPresent && rooms.get(roomId).size === 1) {
      //1) roomId is present & room has empty space 
      socket.join(roomId);
      socket.emit("roomJoined", "Joined a Room");
    } else if (isRoomIdPresent && rooms.get(roomId).size > 1) {
      //2) roomId is present but room is full 
      socket.emit("roomJoined", "Room is Full!");
    } else {
      //3) no such roomId exits 
      socket.emit("roomJoined", "No such room exits");
    }

    //if the room is full that is if both the players have joined then 
    //emits readyForGame event to all the sockets present in room with that roomId
    if (isRoomIdPresent && rooms.get(roomId).size === 2) {
      io.to(roomId).emit("readyForGame", roomId);
    }
  });

  //When both players are playing game 
  socket.on("PlayingGame", (msg) => {
    console.log(msg);

    //emiting the newState event to the socket which has the next turn 
    io.to(msg.roomId).emit("newStates", {
      newSquares: msg.squares,
      xIsNext: msg.xIsNext,
      turn: msg.turn,
    });
  });

  //FOR RESTARTING THE GAME 
  socket.on("restartGame", ({ roomId, squares }) => {
    //emits the gameRestarted event to all the sockets in the room 
    //and resets all the squares 
    io.to(roomId).emit("gameRestarted", {
      squares: squares,
    });
  });

  //GETS THE ROOM DETAILS FOR THE ROOMID 
  socket.on("getCurrentRoom", (roomId) => {
    const rooms = io.of("/").adapter.rooms; //gives all the rooms 
    const room = rooms.get(roomId); //gets the room for the room id -> roomId
    const roomArray = Array.from(room); //converts the room object to array
    socket.emit("currentRoom", roomArray); //emits currentRoom event to send the current room details to frontend 
  });

  //when user gets disconnected 
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

//server listening to the port 3000
httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});
