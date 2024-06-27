const Square = ({ value, onSquareClick }) => {
  /* const [value, setValue] = useState(null); */

  /* const clickHandler = () => {
    setValue("X");
  }; */
  const buttonClasses =
    "w-16 h-16 bg-[#9E3900] text-white font-serif text-3xl rounded m-1 hover:bg-[#FFD580]";

  return (
    <>
      <button className={buttonClasses} onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
};

export default Square;
