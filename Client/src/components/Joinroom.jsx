import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const Joinroom = () => {
  const [gameid, setGameid] = useState("");
  const [err, setErr] = useState(false);
  const [idGenerate, setIdGenerate] = useState("");
  const [socket, setSocket] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("http://localhost:3000/");
    socket.on("readyForGame", (roomId) => {
      navigate("/board/" + roomId);
    });
    setSocket(socket);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (gameid.trim() !== "") {
      socket.emit("joinRoom", gameid);
      socket.on("roomJoined", (msg) => {
        setIdGenerate(msg);
      });
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const inputChange = (e) => {
    setGameid(e.target.value);
    if (err && gameid.trim() !== "") {
      setErr(false);
    }
    if (gameid.trim() === "") {
      setIdGenerate("");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://wallpapers.com/images/hd/best-gaming-background-37l6eubhbp4bthp9.jpg)",
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-md text-center">
        <input
          type="text"
          value={gameid}
          onChange={inputChange}
          placeholder="Enter your game ID"
          className="mr-2 mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {err && (
          <Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
            <Alert severity="error">
              <h3 className="font-serif">Room id is required</h3>
            </Alert>
          </Stack>
        )}

        <button
          onClick={submitHandler}
          className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 mt-4"
        >
          Join Room
        </button>

        {idGenerate && gameid && (
          <p className="mt-4 text-white font-serif">{idGenerate}</p>
        )}
      </div>
    </div>
  );
};

export default Joinroom;
