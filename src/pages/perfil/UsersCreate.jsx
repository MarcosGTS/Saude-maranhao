import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import { Link } from "react-router-dom";
import FooterSecond from "../../components/FooterSecond";
import binIcon from "../../assets/icons/bin.png";

export default function Admin() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [selectedRole, setRole] = useState('')
    const [senha, setSenha] = useState('')

    const roles =[
        {name: "Administrador", code: "admin"},
        {name: "Publicador", code: "write"},
        {name: "Usuário", code: "user"},
    ];

    return (<>
        <div className="mx-auto w-full max-w-[1200px] min-h-160 flex items-stretch">
            <nav className="flex flex-col w-2/8 bg-[#B9D1DD] rounded-tr-lg overflow-hidden">
                <Link to="/admin" className="border-b-2 border-primary p-4 w-full text-center text-primary font-bold">
                    Visão Geral
                </Link>
                <Link to="/admin/artigos" className="border-b-2 border-primary p-4 w-full text-center text-primary font-bold">
                    Gerenciar Artigos
                </Link>
                <Link to="/admin/users"  className="p-4 w-full text-center bg-primary text-white font-bold">
                    Gerenciar Usuários
                </Link>
            </nav>
            <div className="px-[80px] w-6/8">
                <div className='mt-4 flex justify-between items-center w-full'>
                    <h2 className="text-[32px] font-bold mb-6">Adicionar Usuário</h2>
                    <Link to="/admin/users" className='p-2 border-2 border-primary text-primary font-bold rounded-md'>Voltar</Link>
                </div>
                <form className="flex flex-col gap-4 p-8 mb-8 rounded-lg shadow-lg">

                        <div className="flex gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <label>Nome</label>
                                <InputText onChange={e => setNome(e.target.value)}/>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label>Email</label>
                                <InputText onChange={e => setEmail(e.target.value)}/>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <label>Função</label>
                                <Dropdown value={selectedRole} onChange={(e) => setRole(e.target.value)} options={roles} optionLabel="name" 
                                placeholder="Selecione uma função" className="w-full md:w-14rem" />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <label>Senha proviória</label>
                                <Password value={senha} onChange={(e) => setSenha(e.target.value)} feedback={false} tabIndex={1} />
                            </div>
                        </div>

                        <Button style={{backgroundColor: "var(--primary)"}} label="Adicionar" icon="pi pi-plus"/>
                </form>
            </div>
        </div>
        <FooterSecond/>
    </>)
}
