import Logo1 from '../assets/logo_1.svg';
import { Link } from 'react-router-dom';

import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/authService"; // ou diretamente do firebase
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // ou `signOut(auth)`
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header className='mb-[64px] w-full flex justify-end items-center gap-6 p-6 text-primary text-[18px] font-medium '>
      <img src={Logo1} alt="logo"/>
      <nav className='w-full text-sky-800 flex justify-end items-center gap-6 font-semibold'>
        <Link to="/">Início</Link>
        {(!loading && user) ? (<>
          <Link to="/consultas">Consultas</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/artigos">Artigos</Link>
          <button className='bg-tertiary hover:bg-primary text-background py-2 px-6 rounded-md' onClick={handleLogout}>
            Sair
          </button>
        </>) : (
          <Link to="/login" className='bg-tertiary hover:bg-primary text-background py-2 px-6 rounded-md'>Entrar</Link>
        )}
      </nav>
    </header>
  )
}

export default Header
