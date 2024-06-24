import { io } from "socket.io-client";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const socket = io("http://localhost:3000/");
  socket.on("connect", () => {
    socket.emit("join", "room1");
  });

  socket.on("created", (msg) => {
    alert(msg);
  });

  socket.on("joined", (msg) => {
    alert(msg);
  });

  socket.on("full", (msg) => {
    alert(msg);
  });

  socket.on("disconnect", () => {
    console.log(socket.id);
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
