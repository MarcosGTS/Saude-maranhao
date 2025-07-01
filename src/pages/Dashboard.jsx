import DashboardHero from '../assets/imgs/dashboard_hero.png';
import DashboardChart from '../components/DashboardChart';
import Footer from '../components/Footer';

export default function Home() {
  return (<>
    <div className="flex flex-col gap-[120px]">
      <section className="mx-auto w-full flex max-w-[1100px]">
        <div className="grow-2">
          <h1 className="text-[36px] font-bold">Bem vindo (a) ao Dashboard!</h1>
          <p className="max-w-[600px] my-[40px] text-[18px]">
            Tenha acesso a dados atualizados sobre doenças mais comuns em sua região e formas de prevenção.
          </p>
          {/* <div className="flex gap-4">
            <Button style={{backgroundColor: "var(--tertiary)"}} label="Dashboard"/>
            <Button style={{color: "var(--tertiary)", borderColor: "var(--tertiary)"}} outlined label="Consultas"/>
          </div> */}
        </div>
        <div className="grow-2">
          <img className="w-[360px]" src={DashboardHero}/>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1000px]">
        <h2 className="text-[36px] font-bold text-primary">Indicadores de saúde</h2>
        <div className='mt-8'>
          <DashboardChart />
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1000px]">
        <h2 className="text-[36px] font-bold text-primary">Indicadores de saúde</h2>
          
        <div className="flex flex-col gap-[32px] mt-[48px] ml-[64px]">
          <div>
            <h3 className="text-[36px] font-bold">O que é?</h3>
            <p className="max-w-[800px] mt-4 text-[20px] ">
              É uma condição crônica em que a pressão do sangue nas artérias está constantemente elevada.
              Isso significa que o coração precisa trabalhar mais para bombear o sangue para o resto do corpo.
              Uma pessoa é diagnosticada com hipertensão quando os valores da pressão arterial são iguais ou superiores a 140/90 (ou 14 por 9). 
            </p>
          </div>

          <div>
            <h3 className="text-[36px] font-bold">Como previnir?</h3>
            <p className="max-w-[800px] mt-4 text-[20px]">
              Para prevenir a hipertensão, é,essencial adotar um estilo de vida saudável,
              incluindo a manutenção de um peso adequado, a prática regular de exercícios físicos, 
              a redução do consumo de sal e álcool, a não utilização de cigarros, 
              e o controle do estresse através de momentos de lazer e atividades relaxantes.
            </p>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
  </>);
}
