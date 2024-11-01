import { useNavigate } from "react-router-dom";
import "animate.css";

const Home = () => {
  const navigate = useNavigate();

  //to move user to create room page 
  const createRoomHandler = (e) => {
    e.preventDefault();
    navigate("/createRoom");
  };

  //to move user to join room page
  const joinRoomHandler = () => {
    navigate("/joinRoom");
  };

  return (
    <div
      className="bg-cover bg-center text-white h-screen flex flex-col items-center justify-end"
      style={{
        backgroundImage:
          "url(https://marketplace.canva.com/EAE-roy2B2I/1/0/1600w/canva-blue-and-purple-cyberpunk-game-zone-facebook-cover-ZwAs2Ol1HMA.jpg)",
      }}
    >
      <div className="mb-28 flex space-x-4  p-4 rounded">
        {/* CREATE ROOM BUTTON  */}
        <button className="p-[3px] relative" onClick={createRoomHandler}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Create Room
          </div>
        </button>
        <div className="h-4"></div>

        {/* JOIN ROOM BUTTON  */}
        <button className="p-[3px] relative" onClick={joinRoomHandler}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Join Room
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
