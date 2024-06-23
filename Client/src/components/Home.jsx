import React from "react";
import { io } from "socket.io-client";

const Home = () => {
  const socket = io("https://server-domain.com");
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
  return <div></div>;
};

export default Home;
