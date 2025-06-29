import { useState, useEffect } from 'react'; // Importe useState e useEffect
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import Searchbar from '../components/Searchbar';
        

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <div className="bg-white border border-slate-300 rounded-md flex flex-col gap-4 justify-between  max-w-[360px] h-[475px] m-[16px] p-[24px] shadow-[#333] shadow-lg/20">
                <div className='overflow-hidden w-full h-[240px] rounded-md'>
                    <img src="src/assets/imgs/placeholder.png"/>
                </div>
                <h4 className='text-[20px] font-medium'>{article.title}</h4>
                <p className="m-0 text-[14px]">
                    {article.body.substring(0, 100)}...
                </p>
                <Button style={{backgroundColor: 'var(--tertiary)'}} label='Leia mais'/>
            </div> 
        );
    }

    return (
        <>
            <h1 className='mx-auto mt-[100px] text-center text-5xl font-bold'>Artigos & Revistas</h1>
            <p className='mx-auto mt-[16px] text-primary text-center text-3xl font-medium max-w-[660px]'>Aqui você terá acesso a artigos sobre saúde em geral!</p>
            <Searchbar containerClassName='my-[130px] '/>
            <div className='mx-auto min-h-[475px] mb-[300px] max-w-[1200px] flex items-center justify-center'>
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
        </>
    );
}