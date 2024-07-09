/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../contexts/SocketContext";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [turn, setTurn] = useState(null);
  const [room, setRoom] = useState([]);
  const socket = useSocket();

  const { roomId } = useParams();

  useEffect(() => {
    socket.on("newStates", ({ newSquares, xIsNext, turn }) => {
      setSquares(newSquares);
      setXIsNext(!xIsNext);
      setGameStarted(true);
      setTurn(turn === room[0] ? room[1] : room[0]);
    });

    socket.on("gameRestarted", ({ squares }) => {
      setSquares(squares);
      setXIsNext(true);
      setGameStarted(false);
      setTurn(room[0]);
    });

    socket.emit("getCurrentRoom", roomId);

    socket.on("currentRoom", (room) => {
      setRoom(room);
      setTurn(room[0]);
    });
  }, []);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares); //passing sqaures bcoz now calculateWinner will
  //applies its functionality on this square

  const isBoardEmpty = squares.every((square) => square === null); //checks if each square is empty
  const isBoardFull = squares.every((square) => square !== null); //checks if each square is full

  function handleClick(i) {
    if (turn !== socket.id) {
      console.log("returning from here");
      return;
    }
    if (squares[i] || calculateWinner(squares)) return; //means either block is already filled or winner is declared
    const nextSquares = squares.slice(); //creates shallow copy of array
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    socket.emit("PlayingGame", {
      roomId: roomId,
      squares: nextSquares,
      xIsNext: xIsNext,
      turn: turn,
    });
  }

  const resetHandler = () => {
    socket.emit("restartGame", {
      roomId: roomId,
      squares: Array(9).fill(null),
    });
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/268976/pexels-photo-268976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        {isBoardEmpty && (
          <div className="flex space-x-4 mb-4">
            <button className="bg-[#ffaf10] text-white font-serif text-lg font-bold py-2 px-6 rounded-sm hover:cursor-pointer border-2 border-orange-200">
              Player X
            </button>
            <button className="bg-[#D8AA89] text-white font-serif text-lg font-bold py-2 px-6 rounded-sm hover:cursor-pointer border-2 border-orange-200">
              Player O
            </button>
          </div>
        )}

        {!isBoardEmpty && !winner && (
          <div className="flex space-x-4 mb-4">
            <button
              className={`bg-[#D8AA89] hover:bg-[#ffaf10] text-white font-serif text-lg font-bold py-2 px-6 rounded-sm hover:cursor-pointer border-2 border-orange-200 ${
                xIsNext ? "bg-[#ffaf10]" : ""
              }`}
            >
              Player X
            </button>
            <button
              className={`bg-[#D8AA89] hover:bg-[#ffaf10] text-white font-serif text-lg font-bold py-2 px-6 rounded-sm hover:cursor-pointer border-2 border-orange-200 ${
                !xIsNext ? "bg-[#ffaf10]" : ""
              }`}
            >
              Player 0
            </button>
          </div>
        )}

        {winner && (
          <button className="bg-customOrange hover:bg-[#ffaf10] text-white font-serif text-lg font-bold py-2 px-6 mt-12 mb-12 rounded-sm hover:cursor-pointer border-2 border-orange-200">
            Winner is Player : {winner}
          </button>
        )}
        {isBoardFull && (
          <div className="text-2xl px-8 py-4 rounded-tl-2xl rounded-br-2xl font-serif text-white inline-block mb-4 bg-customOrange hover:bg-[#ffaf10]">
            Game Draw
          </div>
        )}

        <div className="bg-[#D8AA89] p-4 rounded-lg">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex space-x-2">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="flex space-x-2">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="flex space-x-2">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
          </div>
        </div>
        <button
          className="bg-customOrange hover:bg-[#ffaf10] text-white font-serif text-lg font-bold py-2 px-6 mt-12 rounded-sm hover:cursor-pointer border-2 border-orange-200"
          onClick={resetHandler}
        >
          Restart
        </button>
      </div>
    </>
  );
};

export default Board;
