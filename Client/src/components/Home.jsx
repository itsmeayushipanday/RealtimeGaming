import { io } from "socket.io-client";
import Createroom from "./Createroom";
import Joinroom from "./Joinroom";

const Home = () => {
  const socket = io("http://localhost:3000/");
  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id);
  });
<<<<<<< HEAD
  return (
    <div className="bg-blue-950 text-white h-screen text-center">
      <div>
        Welcome
        <Createroom />
        <Joinroom />
      </div>
    </div>
  );
=======

  return <div>Hello</div>;
>>>>>>> dccfe4dedecff1514998941813db87b0e5977557
};

export default Home;
