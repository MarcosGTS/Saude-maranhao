import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Articles from "./pages/Articles";
import Dashboard from "./pages/Dashboard";
import Consultation from "./pages/Consultation"; 
import NotFound from "./pages/NotFound";
import Login from "./pages/login/page";
import Signup from "./pages/signup/page";
import RedifinirSenha from "./pages/redefinirSenha/page";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, 
        element: <Home />
      },
      { 
        path: "artigos", 
        element: (
          <PrivateRoute>
            <Articles /> 
          </PrivateRoute>
        )
      },
      { 
        path: "consultas", 
        element: ( 
          <PrivateRoute>
            <Consultation/>
          </PrivateRoute>
        )
      },
      { 
        path: "dashboard", 
        element: (
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        )
      },
      { path: "login", element: <Login/> },
      { path: "signup", element: <Signup/> },
      { path: "redefinir-senha", element: <RedifinirSenha/> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
