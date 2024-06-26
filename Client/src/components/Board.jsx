import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

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
        return squares[a]; // return "X" or "0" present at squares[a]
      }
    }
    return null;
  }

  const winner = calculateWinner(squares); //passing sqaures bcoz now calculateWinner will
  //applies its functionality on this square

  const isBoardEmpty = squares.every((square) => square === null); //checks if each square is empty
  const isBoardFull = squares.every((square) => square !== null); //checks if each square is full

  let status;
  if (winner) {
    status = "Winner is: " + winner;
  } else if (isBoardEmpty) {
    status = "Begin the game with X player chance";
  } else if (isBoardFull) {
    status = "Game Draw";
  } else {
    status = "Next Chance is of player: " + (xIsNext ? "X" : "0");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice(); //creates shallow copy of array
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "0";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between pt-56">
        <div className="bg-green-600 font-medium text-white px-4 py-2 rounded-full inline-block">
          {status}
        </div>
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
    </>
  );
};

export default Board;
