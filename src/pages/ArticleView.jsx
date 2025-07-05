import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

import Footer from "../components/Footer";

export default function () {
    const {articleId} = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`https://saude-maranhao.onrender.com/articles/${articleId}`); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setArticle(data.data);
            } catch (error) {
                console.error("Erro ao buscar artigos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (<>

        <div className="mx-auto w-full max-w-[750px]">
        {
            loading ?
            (
                <div className="w-full flex justify-center items-center min-h-[600px]">
                    <ProgressSpinner/>
                </div>
            ):
            (
            <>
                <div className="mb-6">
                    <button onClick={() => navigate(-1)} className='p-2 border-2 border-primary text-primary font-bold rounded-md'>Voltar</button>
                </div>
                <div className='overflow-hidden w-full h-[240px] rounded-md shadow-lg'>
                <img src={article?.banner || "src/assets/imgs/placeholder.png"}
                        className="w-full h-full object-cover"
                        alt="Banner"
                    />
                </div>
                <div className="my-[32px]">
                    <h1 className="text-[32px] font-bold text-primary">{article?.title}</h1>
                    <span className="text-[12px]">{
                        article?.createdAt?._seconds
                            ? new Date(article.createdAt._seconds * 1000).toLocaleString('pt-BR')
                            : 'Sem data'
                    }</span>
                    <p className="mt-[16px]">{article?.body}</p>
                </div>
            </>
            )

        }

        </div>
        <Footer/>
    </>)
}