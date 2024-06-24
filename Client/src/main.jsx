import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Createroom from "./components/Createroom.jsx";
import Joinroom from "./components/Joinroom.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  <RouterProvider router={router} />
);
