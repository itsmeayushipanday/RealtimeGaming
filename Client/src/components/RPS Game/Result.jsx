function Result({ player1Choice, player2Choice, result }) {
  return (
    <div className="text-center mt-4">
      <h2 className="text-xl">
        Player 1's Choice: <span className="font-bold">{player1Choice}</span>
      </h2>
      <h2 className="text-xl">
        Player 2's Choice: <span className="font-bold">{player2Choice}</span>
      </h2>
      <h2 className="text-xl font-bold mt-2">{result}</h2>
    </div>
  );
}

export default Result;
