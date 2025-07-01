import Logo2 from '../assets/logo_2.svg';
import Instagram from '../assets/icons/instagram.svg';
import Github from '../assets/icons/github.svg';
import Email from '../assets/icons/email.svg';
import footerImage from '../assets/imgs/image.png';

const FooterSecond = () => {
  return (
    <footer className='bg-secondary relative text-white flex flex-col justify-center items-center gap-8 p-6 bg-primary text-primary-foreground font-semibold w-full h-full'>
      <img className='flex justify-center items-center' src={Logo2} alt="logo" />
      <nav className='w-full flex justify-center items-center gap-6'>
        <a href="">Início</a>
        <a href="">Consultas</a>
        <a href="">dashboard</a>
        <a href="">Artigos</a>
      </nav>
      
        <div className='flex justify-center items-center gap-6 w-full'>
          <img src={Instagram} />
          <img src={Github} />
          <img src={Email} />
        </div>
        <p className='font-normal text-sm'>Desenvolvido por © +Saúde MA 2025. Todos os direitos reservados </p>
    </footer>
  )
}

export default FooterSecond;