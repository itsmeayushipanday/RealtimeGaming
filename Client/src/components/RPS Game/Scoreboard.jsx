function Scoreboard({ score }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl">
        Player 1: <span className="font-bold">{score.player1}</span>
      </h2>
      <h2 className="text-xl">
        Player 2: <span className="font-bold">{score.player2}</span>
      </h2>
    </div>
  );
}

export default Scoreboard;
