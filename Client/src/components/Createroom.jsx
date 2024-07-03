import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Createroom = () => {
  const [id, setId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState(false);
  const [socket, setSocket] = useState();

  useEffect(() => {
    //ESTABLISHING A SOCKET CONNECTION
    const socket = io("http://localhost:3000/");
    socket.on("readyForGame", (msg) => {
      console.log(msg);
    });
    setSocket(socket);
  }, []);

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
        <input
          type="text"
          value={roomName}
          onChange={handleInputChange}
          placeholder="Enter your Room Name"
          className="mr-2 w-52 h-14 mb-4 px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
            <Alert severity="error">
              <h3 className="font-serif">Room Name is required</h3>
            </Alert>
          </Stack>
        )}
        <button
          onClick={idGenerateHandler}
          className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 mt-4"
        >
          Create Room
        </button>

        {id && roomName && (
          <p className="mt-4 text-white font-serif">Room Id: {id}</p>
        )}
      </div>
    </div>
  );
};

export default Createroom;
