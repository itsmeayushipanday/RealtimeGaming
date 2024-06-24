import { Button } from "@mui/material";
import { useState } from "react";

const Createroom = () => {
  const [id, setId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState(false);

  const idGenerateHandler = () => {
    if (roomName.trim() !== "") {
      setId("Id Created");
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleInputChange = (e) => {
    setRoomName(e.target.value);
    if (error && roomName.trim() !== "") {
      setError(false);
    }
    if (roomName.trim() === "") {
      setId("");
    }
  };

  return (
    <div className="bg-blue-950 h-screen flex flex-col items-center justify-center">
      <input
        type="text"
        value={roomName}
        onChange={handleInputChange}
        placeholder="Enter your Room Name"
        className="w-52 h-14 mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && (
        <p className="text-red-500 mb-5 font-semibold">Room Name is required</p>
      )}
      <Button
        variant="contained"
        size="large"
        className="mt-4"
        onClick={idGenerateHandler}
      >
        Create Room
      </Button>
      {id && roomName && <p className="mt-4 text-white font-serif">{id}</p>}
    </div>
  );
};

export default Createroom;
