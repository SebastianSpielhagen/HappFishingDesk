import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/css/Mitgliedermenu.css';
import React from "react";
import {CButton} from '@coreui/react';

const Mitgliedermenu: React.FC = () => {
    return (
        <div className="mitglieder-main">
            <div className="sidetitle">
                <div className="sidetitle-text">
                    <h5>Mitgliederverwaltung</h5>
                </div>
                <hr/>
                <div className="sidebuttons-text">
                    <div className="d-grid gap-2 col-11 mx-auto">
                        <CButton color="primary" href="/mitgliederverwaltung">Mitglied ' NEU '</CButton>
                    </div>
                </div>
                <div className="sidebuttons-text">
                    <div className="d-grid gap-2 col-11 mx-auto">
                        <CButton color="primary" href="/members">Mitglied ' SUCHEN '</CButton>
                    </div>
                </div>
                <div className="sidebuttons-text">
                    <div className="d-grid gap-2 col-11 mx-auto">
                        <CButton color="primary" href="/members">Mitglieder ' LISTE '</CButton>
                    </div>
                </div>
                <div className="sidebuttons-text">
                    <div className="d-grid gap-2 col-11 mx-auto">
                        <CButton color="primary" href="/members">Mitgliederliste</CButton>
                    </div>
                </div>
                <div className="sidebuttons-text">
                    <div className="d-grid gap-2 col-11 mx-auto">
                        <CButton color="primary" href="/members">Mitgliederliste</CButton>
                    </div>
                </div>
                <div className="sidebuttons-text">
                    <div className="d-grid gap-2 col-11 mx-auto">
                        <CButton color="primary" href="/members">Mitgliederliste</CButton>
                    </div>
                </div>
                <div className="sidebuttons-text">
                    <div className="d-grid gap-2 col-11 mx-auto">
                        <CButton color="primary" href="/members">Mitgliederliste</CButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mitgliedermenu;