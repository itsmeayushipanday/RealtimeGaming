import "./Login.css";

const LoginSign = () => {
  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true"></input>
      <div className="signup">
        <form>
          <label htmlFor="chk" aria-hidden="true">
            Sign up
          </label>
          <input
            type="text"
            name="txt"
            placeholder="User Name"
            required=""
            className="m-2 ml-16 h-8 px-4 text-center"
          ></input>
          <input
            type="email"
            name="email"
            placeholder="Email id"
            required=""
            className="m-2 ml-16 h-8 px-4 text-center"
          ></input>
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required=""
            className="m-2 ml-16 h-8 px-4 text-center"
          ></input>
          <button className="p-[3px] relative ml-16">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-slate-300 rounded-[6px]  relative group transition duration-200 text-blue-950 font-bold hover:bg-transparent">
              Sign up
            </div>
          </button>
        </form>
      </div>
      <div className="login">
        <form>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email id"
            required=""
            className="m-2 ml-16 h-8 px-4 text-center"
          ></input>
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required=""
            className="m-2 ml-16 h-8 px-4 text-center"
          ></input>
          <button className="ml-16 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full  px-3 py-1 text-white text-lg font-bold backdrop-blur-3xl">
              Login
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSign;
