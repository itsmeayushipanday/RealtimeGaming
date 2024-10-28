import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useSocket } from "../contexts/SocketContext";

const Createroom = () => {
  const [id, setId] = useState(""); //roomId when created 
  const [roomName, setRoomName] = useState(""); //roomName entered by user
  const [error, setError] = useState(false); //to know whether error has occured or not 

  const navigate = useNavigate();

  //makes a socket connection & have a listner for readyForGame 
  //when other player joins the game then they both are redirected to the board 
  const socket = useSocket();
  socket.on("readyForGame", (roomId) => {
    navigate("/board/" + roomId);
  });

  //generates random id for roomId
  const idGenerateHandler = (e) => {
    e.preventDefault();
    if (roomName.trim() !== "") {
      setError(false);
      socket.emit("createRoom", roomName);
      socket.on("roomIdCreated", (roomID) => {
        setId(roomID);
      });
    } else {
      setError(true);
    }
  };

  //handles input from user for room name 
  const handleInputChange = (e) => {
    e.preventDefault();
    setRoomName(e.target.value);
    if (error && roomName.trim() !== "") {
      setError(false);
    }
    if (roomName.trim() === "") {
      setId("");
    }
  };

  return (
    <div
      className="bg-cover bg-center text-white h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url(https://wallpapers.com/images/hd/best-gaming-background-37l6eubhbp4bthp9.jpg)",
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-md text-center">
        {/* INPUT FOR TAKING THE ROOM NAME  */}
        <input
          type="text"
          value={roomName}
          onChange={handleInputChange}
          placeholder="Enter your Room Name"
          className="mr-2 w-52 h-14 mb-4 px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* HANDLES ERROR WHILE CREATING ROOM  */}
        {error && (
          <Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
            <Alert severity="error">
              <h3 className="font-serif">Room Name is required</h3>
            </Alert>
          </Stack>
        )}

        {/* CREATE ROOM SUBMIT BUTTON  */}
        <button
          onClick={idGenerateHandler}
          className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 mt-4"
        >
          Create Room
        </button>

        {/* TO SHOW ROOM ID WHEN CREATED + */}
        {id && roomName && (
          <p className="mt-4 text-white font-serif">Room Id: {id}</p>
        )}
      </div>
    </div>
  );
};

export default Createroom;
