import { useState, useEffect } from 'react'; // Importe useState e useEffect
import { Carousel } from 'primereact/carousel';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import DataTable from '../../components/DataTable';
import FooterSecond from "../../components/FooterSecond";

export default function Admin() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([
        { code: 'P001', name: 'Notebook', category: 'Eletrônicos', quantity: 10 },
        { code: 'P002', name: 'Cadeira', category: 'Móveis', quantity: 5 },
        { code: 'P003', name: 'Caneta', category: 'Papelaria', quantity: 100 },
        { code: 'P004', name: 'Mouse', category: 'Eletrônicos', quantity: 20 },
    ]);


    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Substitua esta URL pela sua URL da API real
                const response = await fetch('https://saude-maranhao.onrender.com/articles'); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setArticles(data.data);
            } catch (error) {
                console.error("Erro ao buscar artigos:", error);
                // Você pode adicionar um estado para exibir uma mensagem de erro na UI
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const cardTemplate = (article) => {
        return (
            <div className="bg-white border border-slate-300 rounded-md flex flex-col gap-4 justify-between m-[16px] p-[24px] shadow-[#333] shadow-lg/20">
                <div className='overflow-hidden w-full rounded-md'>
                    <img src="src/assets/imgs/placeholder.png"/>
                </div>
                <h4 className='text-[20px] font-medium'>{article.title}</h4>
                <Button style={{backgroundColor: 'var(--tertiary)'}} label='Leia mais'/>
            </div> 
        );
    }

    return (<>
        <div className="mx-auto w-full max-w-[1200px] min-h-160 flex items-stretch">
            <nav className="flex flex-col w-2/8 bg-[#B9D1DD] rounded-tr-lg overflow-hidden">
                <Link to="/admin" className="p-4 w-full text-center bg-primary text-white font-bold">
                    Visão Geral
                </Link>
                <Link to="/admin/artigos" className="border-b-2 border-primary p-4 w-full text-center text-primary font-bold">
                    Gerenciar Artigos
                </Link>
                <Link to="/admin/users" className="border-b-2 border-primary p-4 w-full text-center text-primary font-bold">
                    Gerenciar Usuários
                </Link>
            </nav>
            <div className="px-[80px] w-6/8">
                <h2 className="text-[32px] font-bold mb-6">Painel Administrador</h2>
                <div className=" text-primary flex justify-between">
                    <div className="p-4 w-[240px] min-h-[110px] border border-primary rounded-lg">
                        <h4 className="mb-2 font-medium">Total Artigos</h4>
                        <p className="text-[24px] font-bold">35</p>
                    </div>
                    <div className="p-4 w-[240px] min-h-[110px] border border-primary rounded-lg">
                        <h4 className="mb-2 font-medium">Total Usuários</h4>
                        <p className="text-[24px] font-bold">12</p>
                    </div>
                </div>
                <div>
                    <div className='mt-4 flex justify-between items-center w-full'>
                        <h3 className='text-[20px] text-primary font-bold'>Gerenciar Artigos</h3>
                        <Link to="/admin/artigos/create" className='p-2 border-2 border-primary text-primary font-bold rounded-md'>+ Adicionar</Link>
                    </div>
                    <div className='mx-auto min-h-[475px] max-w-[1200px] flex items-center justify-center'>
                        {loading ? (
                            <ProgressSpinner className='mx-auto'/>
                        ) : (
                            articles.length > 0 ? (
                                <Carousel value={articles} numScroll={1} numVisible={3} itemTemplate={cardTemplate} />
                            ) : (
                                <p className="text-white text-center p-4">Nenhum artigo encontrado.</p> // Mensagem se não houver artigos
                            )
                        )}
                    </div>
                </div>
                <div className='mb-8'>
                    <div className='mb-4 flex justify-between items-center w-full'>
                        <h3 className='text-[20px] text-primary font-bold'>Gerenciar Usuários</h3>
                        <Link to="/admin/users/create" className='p-2 border-2 border-primary text-primary font-bold rounded-md'>+ Adicionar</Link>
                    </div>
                    <DataTable/>
                </div>
            </div>
        </div>
        <FooterSecond/>
    </>)
}