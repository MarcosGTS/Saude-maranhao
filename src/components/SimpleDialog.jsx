import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function FooterDemo({
    message,
    isVisible,
}) {
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    function resolveDialog() {
        setVisible(false);
    }

    const footerContent = (
        <div>
            <Button style={{backgroundColor: "var(--tertiary)"}} label="Ok" icon="pi pi-check" onClick={resolveDialog} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Mensagem"
                visible={visible}
                style={{ width: "100%", maxWidth: '600px'}}
                onHide={() => setVisible(false)}
                footer={footerContent}
            >
                <p className="m-0">{message}</p>
            </Dialog>
        </div>
    );
}
