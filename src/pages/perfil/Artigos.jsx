import { Link } from "react-router-dom";
import FooterSecond from "../../components/FooterSecond";
import binIcon from "../../assets/icons/bin.png";
import pencilIcon from "../../assets/icons/pencil.png";

export default function Admin() {
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
                    <h2 className="text-[32px] font-bold mb-6">Gerenciar Artigos</h2>
                    <Link to="/admin/artigos/create" className='p-2 border-2 border-primary text-primary font-bold rounded-md'>+ Adicionar</Link>
                </div>
                <div className='mb-8'>
                    <div className='w-full bg-[#B9D1DD] py-6 px-8 rounded-lg text-primary flex justify-between'>
                        <div>
                            <h4 className='mb-2 text-[24px] font-bold'>Título do Artigo</h4>
                            <p className='font-bold'>Nome do Autor</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <button className="p-4 rounded-lg hover:bg-slate-400"><img className="w-[24px]" src={pencilIcon} alt="" /></button>
                            <button className="p-4 rounded-lg hover:bg-slate-400"><img className="w-[24px]" src={binIcon} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterSecond/>
    </>)
}