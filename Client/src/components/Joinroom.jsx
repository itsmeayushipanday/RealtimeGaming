import { useState } from "react";

const Joinroom = () => {
  const [gameid, setGameid] = useState("");
  const [err, setErr] = useState(false);
  const [idGenerate, setIdGenerate] = useState("");

  const submitHandler = () => {
    if (gameid.trim() !== "") {
      setIdGenerate("Your game id is generated");
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
          <p className="text-red-500 mb-5 font-medium">
            Please enter a valid game ID
          </p>
        )}
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={submitHandler}
        >
          Submit
        </button>
        {idGenerate && gameid && (
          <p className="mt-4 text-white font-serif">{idGenerate}</p>
        )}
      </div>
    </div>
  );
};

export default Joinroom;
