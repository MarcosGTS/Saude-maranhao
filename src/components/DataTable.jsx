import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function SimpleDataTable({onDataFetched}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: 'displayName', header: 'Nome' },
        { field: 'email', header: 'Email' },
        { field: 'roles', header: 'Função' },
    ];

    useEffect(() => {
        const fetchUsers= async () => {
            try {
                // Substitua esta URL pela sua URL da API real
                const response = await fetch('https://saude-maranhao.onrender.com/users'); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setUsers(data.data);
                if (onDataFetched) onDataFetched(data.data);

            } catch (error) {
                console.error("Erro ao buscar artigos:", error);
                // Você pode adicionar um estado para exibir uma mensagem de erro na UI
            } finally {
                setLoading(false);
            }
        };

        fetchUsers()
    }, [])

    return (<>
        {loading ? (
            <div className='w-full flex justify-center items-center'>
                <ProgressSpinner/>
            </div>
        ): 
        (
            <div className='card shadow-[#000] shadow-lg/32'>
                <DataTable value={users} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ width: '100%' }}>
                    {columns.map((col) => (
                        <Column key={col.field} field={col.field} header={col.header} />
                    ))}
                </DataTable>
            </div>
        )}
    </>
    );
}