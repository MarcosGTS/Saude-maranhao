import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import { Link } from "react-router-dom";
import FooterSecond from "../../components/FooterSecond";
import binIcon from "../../assets/icons/bin.png";

export default function Admin() {
    const [users , setProducts] = useState([
        {name: "teste", role: (<Dropdown/>), action: (<Button label='Excluir' icon="pi pi-trash" />)},
        {name: "teste", role: (<Dropdown/>), action: (<Button label='Excluir' icon="pi pi-trash" />)},
        {name: "teste", role: (<Dropdown/>), action: (<Button label='Excluir' icon="pi pi-trash" />)},
        {name: "teste", role: (<Dropdown/>), action: (<Button label='Excluir' icon="pi pi-trash" />)},
        {name: "teste", role: (<Dropdown/>), action: (<Button label='Excluir' icon="pi pi-trash" />)},
    ]);

    const columns = [
        {field: 'name', header: 'Nome'},
        {field: 'role', header: 'Função'},
        {field: 'action', header: 'Ação'},
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
                    <h2 className="text-[32px] font-bold mb-6">Gerenciar Usuários</h2>
                    <Link to="/admin/users/create" className='p-2 border-2 border-primary text-primary font-bold rounded-md'>+ Adicionar</Link>
                </div>
                <div className="mb-8 rounded-lg shadow-lg">
                    <DataTable value={users} stripedRows tableStyle={{ width: '100%' }}>
                        {columns.map((col, i) => (
                            <Column key={col.field} field={col.field} header={col.header} />
                        ))}
                    </DataTable>
                </div>
            </div>
        </div>
        <FooterSecond/>
    </>)
}
