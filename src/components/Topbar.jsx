import Logo1 from '../assets/logo_1.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='mb-[64px] w-full flex justify-end items-center gap-6 p-6 text-primary text-[18px] font-medium '>
      <img src={Logo1} alt="logo"/>
      <nav className='w-full text-sky-800 flex justify-end items-center gap-6 font-semibold'>
        <Link to="/">Início</Link>
        <Link to="/consultas">Consultas</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/artigos">Artigos</Link>
        <Link to="/login" className='bg-tertiary hover:bg-primary text-background py-2 px-6 rounded-md'>Entrar</Link>
      </nav>
    </header>
  )
}

export default Header
