import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Button} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/css/Header.css';
import {CButton} from "@coreui/react";

const Header: React.FC = () => {
    // Funktion zur Formatierung des Datums und der Uhrzeit
    const getFormattedDateTime = (): string => {
        return new Date().toLocaleString('de-DE', {
            weekday: 'long', // Langformat des Wochentags
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Zustände für Datum/Uhrzeit und DB-Status
    const [currentDateTime, setCurrentDateTime] = useState<string>(getFormattedDateTime());
    const [dbStatus, setDbStatus] = useState<string>("");

    // Funktion zur Überprüfung des DB-Status
    const checkDatabaseConnection = async () => {
        try {
            await axios.get('/api/healthcheck');
            setDbStatus("CONNECTED");
        } catch (error) {
            setDbStatus("DISCONNECTED");
        }
    };

    // Effekt, der beim Mounten der Komponente und alle 60 Sekunden ausgeführt wird
    useEffect(() => {
        checkDatabaseConnection();
        const timer = setInterval(() => {
            setCurrentDateTime(getFormattedDateTime());
            checkDatabaseConnection();
        }, 5000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    // Stil für den DB-Status
    const dbStatusClass = dbStatus === "DISCONNECTED" ? "blink-text" : "";

    return (
        <div className="header-container">
            <div className="logo">
                <a href="/"> <img src="/src/assets/header_logo_small.png"
                                  width="130" height="130"
                                  alt="Sportfischerverein Witten e.V. 1932"/>
                </a>
            </div>
            <div className="titel"><h1>SPORTFISCHERVEREIN WITTEN e.V. 1932</h1>
            </div>
            <div className="nav">
                <div className="row">
                    <div className="col">
                        <CButton color="primary" href="/mitgliedermenu">Mitgliederverwaltung</CButton>
                    </div>
                    <div className="col">
                        <CButton color="primary" href="/formulare">Formulare</CButton>
                    </div>
                    <div className="col">
                        <CButton color="primary" href="/kalender">Kalender</CButton>
                    </div>
                    <div className="col">
                        <CButton color="primary" href="/nachrichten">Nachrichten</CButton>
                    </div>
                    <div className="col">
                        <CButton color="primary" href="/fangberichte">Fangberichte</CButton>
                    </div>
                    <div className="col">
                        <CButton color="primary" href="/statistiken">Statistiken</CButton>
                    </div>
                </div>
            </div>
            <div className="infobar">
                <div className="appname">Happy Fishing Desk v0.1</div>
                <div className="dbstatus">Datenbankstatus:
                    <span className={dbStatusClass}> {dbStatus}</span></div>

                <div className="activeuser">Eingeloggt als: Admin</div>
                <div className="datetime">{currentDateTime}</div>
                <div className="buttons">
                    <Button variant="contained" color="error" href="/login">
                        <FontAwesomeIcon icon={faSignInAlt}/>
                    </Button>{' '}
                    <Button variant="contained" color="error" href="/settings">
                        <FontAwesomeIcon icon={faCog}/>
                    </Button>
                </div>
            </div>
        </div>


    );
};


export default Header;