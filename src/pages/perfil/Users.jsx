import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Link } from "react-router-dom";
import FooterSecond from "../../components/FooterSecond";
import { auth } from "../../lib/firebase";


export default function Admin() {
    const loggedUser = auth.currentUser;
    const [users , setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible,setVisible] = useState(false);
    const [response, setResponse] = useState({
        success: false,
        message: '',
    });

    const columns = [
        {field: 'name', header: 'Nome'},
        {field: 'role', header: 'Função'},
        {field: 'action', header: 'Ação'},
    ];

    const roles = [
        {label: "Administrador", value: "admin"},
        {label: "Publicador", value: "publi"},
        {label: "Usuário", value: "user"},
    ];

    async function deleteUser(userId) {
        try {
            const token = await loggedUser.getIdToken();
            console.log(token);
            const response = await fetch(`https://saude-maranhao.onrender.com/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }); 

            const data = await response.json();
            setVisible(true)
            setResponse({
                success: data.success,
                message: data.message
            });

        } catch (error) {
            console.error("Erro ao buscar artigos:", error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        const fetchUsers= async () => {
            try {
                // Substitua esta URL pela sua URL da API real
                const response = await fetch('https://saude-maranhao.onrender.com/users'); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const result = data.data.map(user => {
                    return {
                        name: user.displayName, 
                        role: (<Dropdown style={{width: "100%"}}  value={user.roles[0]} options={roles}/>), 
                        action: (<Button style={{backgroundColor: "var(--primary)" }} label='Excluir' icon="pi pi-trash" 
                            onClick={() => deleteUser(user.id)}
                        />)
                    };
                });

                setUsers(result);
                
            } catch (error) {
                console.error("Erro ao buscar artigos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers()
    }, [])

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
        <Dialog
            visible={visible}
            modal
            onHide={() => {if (!visible) return; setVisible(false); }}
            style={{maxWidth: "400px", width: "90%"}}
        >
            <p className="mb-8">
                {response.message}
            </p>
            <Button style={{width: "100%", backgroundColor: "var(--primary)"}} label="Confirmar" onClick={() => {
                setVisible(false);
                if (response.success) {
                    navigate('/admin/users');
                }
            }}/>
        </Dialog>
    </>)
}
