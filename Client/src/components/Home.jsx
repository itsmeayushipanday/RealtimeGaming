import { io } from "socket.io-client";
import Createroom from "./Createroom";
import Joinroom from "./Joinroom";

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
  return (
    <div className="bg-blue-950 text-white h-screen text-center">
      <div>
        Welcome
        <Createroom />
        <Joinroom />
      </div>
    </div>
  );
};

export default Home;
