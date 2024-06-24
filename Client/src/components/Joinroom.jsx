const Joinroom = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-950">
      <input
        type="text"
        placeholder="Enter your game ID"
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Submit
      </button>
    </div>
  );
};

export default Joinroom;
