import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Articles from "./pages/Articles";
import Dashboard from "./pages/Dashboard";
import Consultation from "./pages/Consultation"; 
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "artigos", element: <Articles /> },
      { path: "consultas", element: <Consultation/> },
      { path: "dashboard", element: <Dashboard/> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
