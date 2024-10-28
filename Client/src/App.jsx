import Home from "./components/Home";
import LoginSign from "./components/LoginSign";
import Board from "./components/Board";
import Rps from "./components/RPS Game/Rps";
import "./styles.css";

function App() {
  return (
    <div>
      {/* <LoginSign /> */}
      <Home />
      <Rps />
    </div>
  );
}

export default App;
