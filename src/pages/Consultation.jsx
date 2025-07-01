import { useState } from 'react';
import MedicoImage from '../assets/imgs/medico-ilustracao.png';
import Searchbar from '../components/Searchbar';
import LocalizationIcon from '../assets/icons/localizationIcon.png';
import Footer from '../components/Footer';

const Consultas = () => {
  const [cep, setCep] = useState('');
  const [resultados, setResultados] = useState([1, 1, 1]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cepValido = cep.length === 8;

  const buscarCep = async () => {
    if (!cepValido) {
      setError('Digite um CEP válido de 8 números');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado');
        setResultados([]);
      } else {
        setResultados([data]);
      }
    } catch (error) {
      setError('Erro na busca');
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  return (<>
    <section className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
      {/* Texto e Formulário */}
      <div className="md:w-1/2 ">
        <h1 className="text-[36px] font-bold text-sky-900 mb-4 leading-snug">
          Marcação de <br /> Consultas e Exames
        </h1>
        <p className="text-[18px] text-gray-700 mb-6">
          Aqui você pode encontrar informações sobre as unidades de saúde próximas de você! Marque sua consultas e exames nos locais disponíveis.
        </p>

      </div>

      {/* Ilustração */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={MedicoImage}
          alt="Ilustração médica"
          className="w-64 md:w-80"
        />
      </div>
    </section>

    <div className='mx-auto max-w-[1000px]'>
      {/* Input de CEP */}
      <Searchbar containerClassName="my-[64px]" placeholder='Digite seu CEP'/>

      {/* Resultados */}
      <div >
        {resultados.length > 0 &&
          resultados.map((r, index) => (
            <div
              key={index}
              className="bg-white p-6 border rounded-md mb-4 shadow-md"
            >
              <div className='flex gap-4 items-center'>
                <img className='w-[50px] h-[50px]' src={LocalizationIcon} />
                <div>
                  <h3 className='text-[32px] text-primary font-bold'>Unidade Básica da Familia Vila Nova </h3>
                  <p className='text-[22px]'>Av. Ipase, 3037 - Vila Nova </p>
                </div>
              </div>
              <div className='flex justify-between m-8 text-[18px]'>
                <div className='w-full'>
                  <h4 className='text-primary font-medium' >Horário de funcionamento:</h4>
                  <p className='font-bold'>
                    Segunda à Sexta 08:00 às 16:00
                  </p>
                </div>
                <div className='w-full'>
                  <h4 className='text-primary font-medium' >Documentos:</h4>
                  <p className='font-bold'>
                    RG, cartão do SUS...
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    <Footer/>
  </>);
};

export default Consultas;