import React, { useState } from "react";

import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import FooterSecond from "../../components/FooterSecond";

export default function Admin() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [response, setResponse] = useState({
        success: false,
        message: "",
    })
    
    async function createArticle() {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('banner', banner);

            const response = await fetch(`https://saude-maranhao.onrender.com/articles`, {
                method: 'POST',
                body: formData,
            }); 
            console.log(response);

            const data = await response.json();
            setVisible(true)
            setResponse({
                success: data.success,
                message: data.message
            });

        } catch (error) {
            console.error("Erro ao criar artigo:", error);
        } finally {
            setLoading(false);
        }
    }

    return (<>
        <div className="mx-auto w-full max-w-[1200px] min-h-160 flex items-stretch">
            <nav className="flex flex-col w-2/8 bg-[#B9D1DD] rounded-tr-lg overflow-hidden">
                <Link to="/admin" className="border-b-2 border-primary p-4 w-full text-center text-primary font-bold">
                    Visão Geral
                </Link>
                <Link to="/admin/artigos" className="p-4 w-full text-center bg-primary text-white font-bold">
                    Gerenciar Artigos
                </Link>
                <Link to="/admin/users" className="border-b-2 border-primary p-4 w-full text-center text-primary font-bold">
                    Gerenciar Usuários
                </Link>
            </nav>
            <div className="px-[80px] w-6/8">
                <div className='mt-4 flex justify-between items-center w-full'>
                    <h2 className="text-[32px] font-bold mb-6">Criar Artigo</h2>
                    <Link to="/admin/artigos" className='p-2 border-2 border-primary text-primary font-bold rounded-md'>Voltar</Link>
                </div>
                <div className='flex flex-col gap-8 mb-8'>
                    <div className="flex flex-col gap-2">
                        <label className='text-[20px] text-primary font-bold'>Título do Artigo</label>
                        <InputText id="username" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className='text-[20px] text-primary font-bold'>Imagem do Artigo</label>
                        <input type="file" accept="images/*" onChange={(e) => setBanner(e.target.files[0])}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className='text-[20px] text-primary font-bold'>Gerenciar Artigos</h3>
                        <InputTextarea style={{width: "100%"}} autoResize value={body} onChange={(e) => setBody(e.target.value)} rows={5} cols={30} />
                    </div>
                </div>
                <Button style={{width: "100%", backgroundColor: "var(--primary)"}} label="Criar" icon="pi pi-plus" onClick={createArticle}/>
            </div>
        </div>
        <FooterSecond/>
    </>)
}