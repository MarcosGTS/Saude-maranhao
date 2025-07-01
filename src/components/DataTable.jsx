import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function SimpleDataTable() {
    const [products] = useState([
        { code: 'P001', name: 'Notebook', category: 'Eletrônicos', quantity: 10 },
        { code: 'P002', name: 'Cadeira', category: 'Móveis', quantity: 5 },
        { code: 'P003', name: 'Caneta', category: 'Papelaria', quantity: 100 },
        { code: 'P004', name: 'Mouse', category: 'Eletrônicos', quantity: 20 },
        { code: 'P004', name: 'Mouse', category: 'Eletrônicos', quantity: 20 },
        { code: 'P004', name: 'Mouse', category: 'Eletrônicos', quantity: 20 },
        { code: 'P004', name: 'Mouse', category: 'Eletrônicos', quantity: 20 },
        { code: 'P004', name: 'Mouse', category: 'Eletrônicos', quantity: 20 },
        { code: 'P004', name: 'Mouse', category: 'Eletrônicos', quantity: 20 },
        { code: 'P004', name: 'Mouse', category: 'Eletrônicos', quantity: 20 },
        { code: 'P004', name: 'Mouse', category: 'Eletrônicos', quantity: 20 },
    ]);

    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
    ];

    return (
        <div className='card shadow-[#000] shadow-lg/32'>
            <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ width: '100%' }}>
                {columns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    );
}