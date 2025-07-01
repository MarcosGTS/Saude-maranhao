import { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import LocalizationIcon from '../assets/icons/localizationIcon.png';

export default function Hospitals() {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Substitua esta URL pela sua URL da API real
                const response = await fetch('https://saude-maranhao.onrender.com/hospital'); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setHospitals(data.data);
            } catch (error) {
                console.error("Erro ao buscar artigos:", error);
                // Você pode adicionar um estado para exibir uma mensagem de erro na UI
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (<>
    {loading ? (
        <div className="w-full flex justify-center align-center">
            <ProgressSpinner className='mx-auto'/>
        </div>
    ) : (
    <div>
        {hospitals.map((r, index) => (
        <div
            key={index}
            className="bg-white p-6 border rounded-md mb-4 shadow-md"
        >
            <div className='flex gap-4 items-center'>
            <img className='w-[50px] h-[50px]' src={LocalizationIcon} />
            <div>
                <h3 className='text-[32px] text-primary font-bold'>{r.name}</h3>
                <p className='text-[22px]'>{r.address}</p>
            </div>
            </div>
            <div className='flex justify-between m-8 text-[18px]'>
            <div className='w-full'>
                <h4 className='text-primary font-medium' >Horário de funcionamento:</h4>
                <p className='font-bold'>
                    {r.opening}
                </p>
            </div>
            <div className='w-full'>
                <h4 className='text-primary font-medium' >Especialidades:</h4>
                <p className='font-bold'>
                    {r.specialties}
                </p>
            </div>
            </div>
        </div>
        ))}
    </div>
    )}

    </>)
}