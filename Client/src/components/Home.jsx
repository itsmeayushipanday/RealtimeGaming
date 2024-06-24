import { io } from "socket.io-client";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const socket = io("http://localhost:3000/");
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });

  const navigate = useNavigate();

  const createRoomHandler = () => {
    navigate("/createRoom");
  };

  const joinRoomHandler = () => {
    navigate("/joinRoom");
  };

  return (
    <div className="bg-blue-950 text-white h-screen text-center">
      <div>
        Welcome
        <Button onClick={createRoomHandler} variant="contained" size="large">
          Create Room
        </Button>
        <Button onClick={joinRoomHandler} variant="contained" size="large">
          Join Room
        </Button>
      </div>
    </div>
  );
};

export default Home;
