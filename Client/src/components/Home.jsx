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
    <div className="bg-blue-950 text-white h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          Welcome to online gaming platform🎮
        </h1>
      </div>
      <div className="space-y-4">
        <Button
          onClick={createRoomHandler}
          variant="contained"
          size="large"
          className="w-52"
        >
          Create Room
        </Button>
        <div className="h-4"></div>
        <Button
          onClick={joinRoomHandler}
          variant="contained"
          size="large"
          className="w-52"
        >
          Join Room
        </Button>
      </div>
    </div>
  );
};

export default Home;
