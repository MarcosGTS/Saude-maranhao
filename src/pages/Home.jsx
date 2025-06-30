import { Button } from "primereact/button";
import { Link } from "react-router-dom";

import HomeHero from '../assets/imgs/home_hero.png';
import HeartIcon from '../assets/icons/heartIcon.png';
import DashboardIcon from '../assets/icons/dashboardIcon.png';
import ArticleIcon from '../assets/icons/articleIcon.png';
import HomeCard from "../components/HomeCard";

export default function Home() {
  return (<>
    <div className="flex flex-col gap-[120px]">
      <section className="mx-auto w-full flex max-w-[1100px]">
        <div className="grow-3">
          <h1 className="text-[36px] font-bold">Bem-vindo (a) ao Portal de Saúde Pública do Maranhão!</h1>
          <p className="my-[40px] text-[18px]">
            Encontre aqui tudo o que você precisa saber sobre agendamento de consultas pelo SUS,  
            indicadores de súde e acesse conteúdo sobre doenças e cuidados preventivos para você e sua família.
          </p>
          <div className="flex gap-4">
            <Link to="/dashboard">
              <Button style={{backgroundColor: "var(--tertiary)"}} label="Dashboard"/>
            </Link>
            <Link to="/consultas">
            <Button style={{color: "var(--tertiary)", borderColor: "var(--tertiary)"}} outlined label="Consultas"/>
            </Link>
          </div>
        </div>
        <div className="grow-1">
          <img className="w-full" src={HomeHero}/>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1000px]">
        <h2 className="text-center text-[36px] font-bold text-tertiary">Principais Funcionalidades</h2>
        <p className="text-center mt-4 text-[18px]">Disponibilizamos as seguintes funcionalidades</p>
        <div className="flex gap-[48px] justify-center mt-[48px]">
          <HomeCard
            title="Consultas"
            description="Informações sobre locais disponiveis para marcação de consultas, exames, etc.
            Quais documentos são necessários para realizar a marcação."
            iconSrc={HeartIcon}
            buttonLink="/consultas"
          />
          <HomeCard
            title="Dashboard"
            description="Indicadores sobre saúde no Maranhão, doenças mais comuns e como se previnir."
            iconSrc={DashboardIcon}
            buttonLink="/consultas"
          />
          <HomeCard
            title="Artigos"
            description="Artigos e revistas sobre saúde disponiveis para tirar dúvidas ou sanar curiosidades."
            iconSrc={ArticleIcon}
            buttonLink="/artigos"
          />
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1000px]">
        <h2 className="text-center text-[36px] font-bold">Nosso Objetivo</h2>
        <p className="mx-auto max-w-[800px] text-center mt-4 text-[20px] text-tertiary">
          Este site tem como objetivo oferecer informações claras, acessíveis 
          e atualizadas sobre os serviços de saúde pública disponíveis no estado do Maranhão. 
        </p>
      </section>
    </div>
  </>);
}
