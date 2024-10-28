import { useState } from "react";
import ChoiceButton from "./ChoiceButton";
import Result from "./Result";
import Scoreboard from "./Scoreboard";

const choices = ["Stone", "Paper", "Scissors"];
const maxLives = 3;

const Rps = () => {
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [result, setResult] = useState("");
  const [turn, setTurn] = useState(1);
  const [lives, setLives] = useState({ player1: maxLives, player2: maxLives });
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);

  const playGame = (choice) => {
    if (gameOver) return;
    setResult("");
    setPlayer2Choice("");

    if (turn === 1) {
      setPlayer1Choice(choice);
      setTurn(2);
    } else {
      setPlayer2Choice(choice);
      determineWinner(choice);
    }
  };

  const determineWinner = (player2Choice) => {
    let gameResult = "";
    setResult("");
    if (player1Choice === player2Choice) {
      gameResult = "It's a tie!";
    } else if (
      (player1Choice === "Stone" && player2Choice === "Scissors") ||
      (player1Choice === "Paper" && player2Choice === "Stone") ||
      (player1Choice === "Scissors" && player2Choice === "Paper")
    ) {
      gameResult = "Player 1 wins this round!";
      setScore({ ...score, player1: score.player1 + 1 });
      setLives((prevLives) => ({
        ...prevLives,
        player2: prevLives.player2 - 1,
      }));
    } else {
      gameResult = "Player 2 wins this round!";
      setScore({ ...score, player2: score.player2 + 1 });
      setLives((prevLives) => ({
        ...prevLives,
        player1: prevLives.player1 - 1,
      }));
    }

    setResult(gameResult);
    setTurn(1);

    if (lives.player1 - 1 === 0 || lives.player2 - 1 === 0) {
      determineFinalWinner();
    }
  };

  const determineFinalWinner = () => {
    setGameOver(true);

    if (score.player1 > score.player2) {
      setResult("Player 1 wins the game!");
    } else if (score.player2 > score.player1) {
      setResult("Player 2 wins the game!");
    } else {
      setResult("The game ends in a tie!");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://as2.ftcdn.net/v2/jpg/05/18/16/79/1000_F_518167949_ZxcKBKjDmXNuDIV1gWnPZxDknVbSsJEN.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold mb-4 text-black bg-brown-600 p-4 rounded-md border-4 border-white transform rotate-2 shadow-lg">
        Stone Paper Scissor
      </h1>

      <div className="flex justify-between w-full max-w-4xl">
        {/* Player 1 Info */}
        <div
          className={`p-4 rounded-md shadow-md ${
            turn === 1 ? "bg-yellow-200" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-bold mb-2">Player 1</h2>
          <p>Score: {score.player1}</p>
          <p>Lives: {lives.player1}</p>
        </div>

        {/* Player 2 Info */}
        <div
          className={`p-4 rounded-md shadow-md ${
            turn === 2 ? "bg-yellow-200" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-bold mb-2">Player 2</h2>
          <p>Score: {score.player2}</p>
          <p>Lives: {lives.player2}</p>
        </div>
      </div>

      {!gameOver ? (
        <div>
          <h2 className="text-2xl mb-4">Player {turn}'s Turn</h2>
          <div className="flex justify-center space-x-4 mb-4">
            {choices.map((choice) => (
              <ChoiceButton key={choice} choice={choice} playGame={playGame} />
            ))}
          </div>
          <Result
            player1Choice={player1Choice}
            player2Choice={player2Choice}
            result={result}
          />
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{result}</h2>
          <Scoreboard score={score} />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => window.location.reload()}
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Rps;
