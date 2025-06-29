import Logo1 from '../assets/logo_1.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='w-full flex justify-end items-center gap-6 p-6 text-primary md:text-sm font-medium '>
      <img src={Logo1} alt="logo"/>
      <nav className='w-full text-sky-800 flex justify-end items-center gap-6' >
        <Link to="/">Início</Link>
        <Link to="/consultas">Consultas</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/artigos">Artigos</Link>
        <Link to="/login" className='bg-tertiary hover:bg-primary text-background font-semibold py-2 px-6 rounded-md'>Entrar</Link>
      </nav>
    </header>
  )
}

export default Header
