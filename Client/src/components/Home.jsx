import { io } from "socket.io-client";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "animate.css";

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
    <div
      className="bg-cover bg-center text-white h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg)",
      }}
    >
      {/* <div className="text-center mb-8 bg-black bg-opacity-50 p-4 rounded">
        <h1 className="text-5xl font-bold bounce-in fade-in color-change">
          WELCOME TO ONLINE{" "}
          <span className="font-serif text-6xl no-fade">GAMING</span> PLATFORM
        </h1>
      </div> */}
      <div className="text-center mb-8 bg-black bg-opacity-50 p-4 rounded relative">
        <h1 className="text-5xl font-bold bounce-in fade-in color-change">
          WELCOME TO ONLINE
        </h1>
        <h1 className="text-6xl font-serif bounce-in fade-in color-change">
          GAMING
        </h1>
        <h1 className="text-5xl font-bold bounce-in fade-in color-change">
          PLATFORM
        </h1>
      </div>
      <div className="space-y-4 bg-black bg-opacity-50 p-4 rounded">
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
