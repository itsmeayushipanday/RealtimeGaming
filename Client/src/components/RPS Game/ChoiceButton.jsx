function ChoiceButton({ choice, playGame }) {
  return (
    <button
      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      onClick={() => playGame(choice)}
    >
      {choice}
    </button>
  );
}

export default ChoiceButton;
