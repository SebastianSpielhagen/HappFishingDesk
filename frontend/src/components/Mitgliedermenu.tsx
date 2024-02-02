import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/css/Mitgliedermenu.css';
import React from "react";
import {CButton} from '@coreui/react';
import {useNavigate} from "react-router-dom";

const Mitgliedermenu: React.FC = () => {
    const navigate = useNavigate(); // Verwenden Sie `useNavigate` hier direkt

    // Die handleClick-Funktion nimmt einen Pfad und navigiert dorthin
    const handleClick = (path: string) => {
        navigate(path);
    };
    return (
        <div className="mitgliedermenu">
            <div className="div">
                <div className="homepage-img2"></div>
                <div className="left-sidebar-title">
                    <div className="left-sidebar-title-text">
                        <p>- Menü -</p>
                    </div>
                </div>

                <div className="left-sidebar">
                    <div className="left-sidebar-button">
                        <div className="d-grid gap-2 col-11 mx-auto">
                            <CButton color="primary" onClick={() =>
                                handleClick("/mitgliederverwaltung")}>Mitgliederverwaltung</CButton>
                            <CButton color="primary" onClick={() =>
                                handleClick("/members")}>Alle Mitglieder als Liste</CButton>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Mitgliedermenu;