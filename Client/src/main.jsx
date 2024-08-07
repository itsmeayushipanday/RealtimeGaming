import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Createroom from "./components/Createroom.jsx";
import Joinroom from "./components/Joinroom.jsx";
import Board from "./components/Board";

import { SocketProvider } from "./contexts/SocketContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/board/:roomId",
    element: <Board />,
  },
  {
    path: "/createRoom",
    element: <Createroom />,
  },
  {
    path: "/joinRoom",
    element: <Joinroom />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <RouterProvider router={router} />
  </SocketProvider>
);
