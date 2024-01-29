import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/css/Mitgliedermenu.css';
import React from "react";
import {CButton} from '@coreui/react';

const Mitgliedermenu: React.FC = () => {
    return (
        <div className="mitgliedermenu">
            <div className="div">
                <div className="homepage-img2"></div>
                <div className="left-sidebar-title">
                    <div className="left-sidebar-title-text">
                        <p>Mitgliederverwaltung</p>
                    </div>
                </div>

                <div className="left-sidebar">
                    <div className="left-sidebar-button">
                        <div className="d-grid gap-2 col-11 mx-auto">
                            <CButton color="primary" href="/mitgliederverwaltung">Mitglied ' NEU '</CButton>
                            <CButton color="primary" href="/">Mitglied ' SUCHEN '</CButton>
                            <CButton color="primary" href="/members">Mitglieder ' LISTE '</CButton>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Mitgliedermenu;