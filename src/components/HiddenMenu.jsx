import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function PopupDoc() {
    const menuRight = useRef(null);
    const toast = useRef(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        await logout(); // ou `signOut(auth)`
        navigate("/login");
        } catch (error) {
        console.error("Erro ao sair:", error);
        }
    };

    const handleRedirection = () => {
        navigate("/admin");
    }

    const items = [
        {
            label: 'Opções',
            items: [
                {
                    label: 'Administração',
                    icon: 'pi pi-folder-open',
                    command: handleRedirection
                },
                {
                    label: 'Sair',
                    icon: 'pi pi-sign-out',
                    command: handleLogout
                },
            ]
        }
    ];

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast}></Toast>
            <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
            <Button label="Menu" style={{backgroundColor: "var(--tertiary)"}} icon="pi pi-bars" className="mr-2" onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup />
        </div>
    )
}
        