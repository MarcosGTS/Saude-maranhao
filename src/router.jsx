import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Articles from "./pages/Articles";
import ArticleView from "./pages/ArticleView";
import Dashboard from "./pages/Dashboard";
import Consultation from "./pages/Consultation"; 
import NotFound from "./pages/NotFound";
import Login from "./pages/login/page";
import Signup from "./pages/signup/page";
import Admin from "./pages/perfil/Admin";
import AdminArtigos from "./pages/perfil/Artigos";
import AdminArtigosCreate from "./pages/perfil/ArtigosCreate";
import AdminUsers from "./pages/perfil/Users";
import AdminUsersCreate from "./pages/perfil/UsersCreate";
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
        path: "/artigos", 
        element: (
          <PrivateRoute>
            <Articles /> 
          </PrivateRoute>
        )
      },
      { 
        path: "/artigos/:articleId", 
        element: (
          <PrivateRoute>
            <ArticleView/> 
          </PrivateRoute>
        )
      },
      { 
        path: "/consultas", 
        element: ( 
          <PrivateRoute>
            <Consultation/>
          </PrivateRoute>
        )
      },
      { 
        path: "/dashboard", 
        element: (
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        )
      },
      { 
        path: "/admin", 
        element: (
          <PrivateRoute>
            <Admin/>
          </PrivateRoute>
        )
      },
      { 
        path: "/admin/artigos", 
        element: (
          <PrivateRoute>
            <AdminArtigos/>
          </PrivateRoute>
        )
      },
      { 
        path: "/admin/artigos/create", 
        element: (
          <PrivateRoute>
            <AdminArtigosCreate/>
          </PrivateRoute>
        )
      },
      { 
        path: "/admin/users", 
        element: (
          <PrivateRoute>
            <AdminUsers/>
          </PrivateRoute>
        )
      },
      { 
        path: "/admin/users/create", 
        element: (
          <PrivateRoute>
            <AdminUsersCreate/>
          </PrivateRoute>
        )
      },
      { path: "/login", element: <Login/> },
      { path: "/signup", element: <Signup/> },
      { path: "/redefinir-senha", element: <RedifinirSenha/> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
