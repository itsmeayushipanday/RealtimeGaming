const Square = ({ value, onSquareClick }) => {
  /* const [value, setValue] = useState(null); */

  /* const clickHandler = () => {
    setValue("X");
  }; */
  const buttonClasses =
    "w-16 h-16 bg-indigo-950 text-white rounded m-1 hover:bg-indigo-400";

  return (
    <>
      <button className={buttonClasses} onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
};

export default Square;
