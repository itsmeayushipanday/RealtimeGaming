import React from "react";
import { io } from "socket.io-client";
import Createroom from "./Createroom";
import Joinroom from "./Joinroom";

const Home = () => {
  const socket = io("https://server-domain.com");
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
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
