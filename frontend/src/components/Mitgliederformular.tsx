import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/css/Mitgliederformular.css';
import {CButton} from "@coreui/react";

type MemberFormState = {
    mitgliedsnummer: number;
    anrede: string;
    vorname: string;
    nachname: string;
    strasse: string;
    plz: number;
    stadt: string;
    festnetz: string;
    handy: string;
    email: string;
    geburtsdatum: string;
    eintrittsdatum: string;
    austrittsdatum: string;
    status: string;
    bezahlt: boolean;
    fischereischeinnummer: string;
    fischereischeinablaufdatum: string;
};

const Mitgliederformular: React.FC = () => {
    const [member, setMember] = useState<MemberFormState>({
        mitgliedsnummer: 0,
        anrede: '',
        vorname: '',
        nachname: '',
        strasse: '',
        plz: 0,
        stadt: '',
        festnetz: '',
        handy: '',
        email: '',
        geburtsdatum: '',
        eintrittsdatum: '',
        austrittsdatum: '',
        status: '',
        bezahlt: false,
        fischereischeinnummer: '',
        fischereischeinablaufdatum: '',
    });
    // Zustand für die Popup-Anzeige hinzufügen
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const target = e.target as HTMLInputElement; // Casten des EventTargets zum HTMLInputElement
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setMember({
            ...member,
            [target.name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Hier würden Sie die Logik hinzufügen, um die Daten an Ihren Server zu senden
        try {
            const response = await axios.post('/api/members', member);
            console.log(response.data);
            // Popup anzeigen und das Formular zurücksetzen
            setShowSuccessPopup(true);
            setMember({
                mitgliedsnummer: 0,
                anrede: '',
                vorname: '',
                nachname: '',
                strasse: '',
                plz: 0,
                stadt: '',
                festnetz: '',
                handy: '',
                email: '',
                geburtsdatum: '',
                eintrittsdatum: '',
                austrittsdatum: '',
                status: '',
                bezahlt: false,
                fischereischeinnummer: '',
                fischereischeinablaufdatum: '',
            });

        } catch (error) {
            console.error('Es gab einen Fehler beim Senden der Daten:', error);
        }
    };
    // Methode zum Schließen des Popups
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    return (
        <div className="mitgliederformular">
            <div className="div">

                <div className="left-sidebar-title">
                    <div className="left-sidebar-title-text">
                        <p>Mitgliederverwaltung</p>
                    </div>
                </div>

                <div className="right-sidebar-title">
                    <div className="right-sidebar-title-text">
                        <p>Hilfe/FAQ</p>
                    </div>
                </div>
                <div className="right-sidebar"></div>

                <div className="main-list-title">
                    <div className="main-list-title-text">
                    - Neues Mitglied anlegen -
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
                {/* Popup-Element */}
                {showSuccessPopup && (
                    <div className="popup">
                        <p>Mitglied wurde erfolgreich hinzugefügt!!</p>
                        <CButton onClick={closeSuccessPopup} className="btn btn-primary-reset btn-custom-position-popup">OK</CButton>
                    </div>
                )}
                <div className="main-list">
                    <form onSubmit={handleSubmit}>
                        <div className="mitglieder-form">
                            {/* Erste Zeile: Anrede, Vorname, Nachname */}
                            <div className="form-row1">
                                {/* Anrede Auswahl */}
                                <div className="form-field-anrede">
                                    <label htmlFor="anrede">*Anrede:</label>
                                    <select
                                        id="anrede"
                                        name="anrede"
                                        value={member.anrede}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Wählen Sie...</option>
                                        <option value="Herr">Herr</option>
                                        <option value="Frau">Frau</option>
                                        <option value="Divers">Divers</option>
                                    </select>
                                </div>

                                {/* Vorname Eingabefeld */}
                                <div className="form-field-vorname">
                                    <label htmlFor="vorname">*Vorname</label>
                                    <input
                                        id="vorname"
                                        type="text"
                                        name="vorname"
                                        value={member.vorname}
                                        onChange={handleChange}
                                        required
                                        placeholder="Vorname"
                                    />
                                </div>

                                {/* Nachname Eingabefeld */}
                                <div className="form-field-nachname">
                                    <label htmlFor="nachname">*Nachname</label>
                                    <input
                                        id="nachname"
                                        type="text"
                                        name="nachname"
                                        value={member.nachname}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nachname"
                                    />
                                </div>
                            </div>

                            {/* Zweite Zeile: Strasse, PLZ, Stadt */}
                            <div className="form-row2">
                                {/* Straße Eingabefeld */}
                                <div className="form-field-strasse">
                                    <label htmlFor="strasse">*Strasse inkl. Hausnummer</label>
                                    <input
                                        id="strasse"
                                        type="text"
                                        name="strasse"
                                        value={member.strasse}
                                        onChange={handleChange}
                                        required
                                        placeholder="Straße"
                                    />
                                </div>

                                {/* PLZ Eingabefeld */}
                                    <div className="form-field-plz">
                                        <label htmlFor="plz">*PLZ</label>
                                        <input
                                            id="plz"
                                            type="text"
                                            name="plz"
                                            value={member.plz}
                                            onChange={handleChange}
                                            required
                                            placeholder="12345"
                                        />
                                    </div>


                                {/* Stadt Eingabefeld */}
                                    <div className="form-field-stadt">
                                        <label htmlFor="stadt">*Stadt</label>
                                        <input
                                            id="stadt"
                                            type="text"
                                            name="stadt"
                                            value={member.stadt}
                                            onChange={handleChange}
                                            required
                                            placeholder="Stadt"
                                        />
                                    </div>
                            </div>


                             {/* Dritte Zeile: Geburtsdatum, Telefon, Handy, E-Mail */}
                            <div className="form-row3">
                                    {/* Geburtsdatum Eingabefeld */}
                                    <div className="form-field-geburtsdatum">
                                        <label htmlFor="geburtsdatum">*Geburtsdatum</label>
                                        <input
                                            id="geburtsdatum"
                                            type="date"
                                            name="geburtsdatum"
                                            value={member.geburtsdatum}
                                            onChange={handleChange}
                                            required
                                            placeholder="Geburtsdatum"
                                        />
                                    </div>

                                    {/* Telefon Eingabefeld */}
                                    <div className="form-field-festnetz">
                                        <label htmlFor="festnetz">Telefon</label>
                                        <input
                                            id="festnetz"
                                            type="text"
                                            name="festnetz"
                                            value={member.festnetz}
                                            onChange={handleChange}
                                            placeholder="Festnetz"
                                        />
                                    </div>

                                    {/* Handy Eingabefeld */}
                                    <div className="form-field-handy">
                                        <label htmlFor="handy">Handy</label>
                                        <input
                                            id="handy"
                                            type="text"
                                            name="handy"
                                            value={member.handy}
                                            onChange={handleChange}
                                            placeholder="Handy"
                                        />
                                    </div>

                                    {/* E-Mail Eingabefeld */}
                                    <div className="form-field-email">
                                        <label htmlFor="email">E-Mail</label>
                                        <input
                                            id="email"
                                            type="text"
                                            name="email"
                                            value={member.email}
                                            onChange={handleChange}
                                            placeholder="E-Mail"
                                        />
                                    </div>
                            </div>


                            {/* Linie von links nach rechts */}
                            <hr/>
                            <div>

                                {/* Vierte Zeile: Fischereischeinnummer, Fischereiablaufdatum, Eintrittsdatum */}
                                <div className="form-row4">
                                    {/* Fischereischein Eingabefeld */}
                                    <div className="form-field-fischereischeinnummer">
                                        <label htmlFor="fischereischeinnummer">Fischereischein-Nr.:</label>
                                        <input
                                            id="fischereischeinnummer"
                                            type="text"
                                            name="fischereischeinnummer"
                                            value={member.fischereischeinnummer}
                                            onChange={handleChange}
                                            placeholder="Fischereischeinnummer"
                                        />
                                    </div>

                                    {/* Ablaufdatum Eingabefeld */}
                                    <div className="form-field-fischereischeinablaufdatum">
                                        <label htmlFor="fischereischeinablaufdatum">Fs. Ablaufdatum:</label>
                                        <input
                                            id="fischereischeinablaufdatum"
                                            type="date"
                                            name="fischereischeinablaufdatum"
                                            value={member.fischereischeinablaufdatum}
                                            onChange={handleChange}
                                            placeholder="fischereischeinablaufdatum"
                                        />
                                    </div>
                                </div>
                                <hr/>
                                <div className="form-row5">
                                    {/* Eintrittsdatum Eingabefeld */}
                                    <div className="form-field-eintrittsdatum">
                                        <label htmlFor="eintrittsdatum">*Eintrittsdatum:</label>
                                        <input
                                            id="eintrittsdatum"
                                            type="date"
                                            name="eintrittsdatum"
                                            value={member.eintrittsdatum}
                                            onChange={handleChange}
                                            required
                                            placeholder="Eintrittsdatum"
                                        />
                                    </div>


                                    {/* Austrittsdatum Eingabefeld */}
                                    <div className="form-field-austrittsdatum">
                                        <label htmlFor="austrittsdatum">Austrittsdatum:</label>
                                        <input
                                            id="austrittsdatum"
                                            type="date"
                                            name="austrittsdatum"
                                            value={member.austrittsdatum}
                                            onChange={handleChange}
                                            placeholder="Austrittsdatum"
                                        />
                                    </div>

                                    {/* Status Auswahl */}
                                    <div className="form-field-status">
                                        <label htmlFor="status">*Status:</label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={member.status}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Wählen Sie...</option>
                                            <option value="Mitglied -aktiv-">Mitglied -aktiv-</option>
                                            <option value="Mitglied -passiv-">Mitglied -passiv-</option>
                                            <option value="Mitglied -Förder-">Mitglied -Förder-</option>
                                            <option value="Mitglied -Jugend-">Mitglied -Jugend-</option>
                                            <option value="Vorstand">Vorstand</option>
                                            <option value="Jugendwart">Jugendwart</option>
                                            <option value="Sportwart">Sportwart</option>
                                            <option value="Gewässerwart">Gewässerwart</option>
                                            <option value="Gast">Gast</option>
                                        </select>
                                    </div>

                                    {/* Bezahlt Checkbox */}
                                    <div className="form-field-bezahlt">
                                        <label htmlFor="bezahlt">Bezahlt:</label>
                                        <input
                                            id="bezahlt"
                                            type="checkbox"
                                            name="bezahlt"
                                            checked={member.bezahlt}
                                            onChange={handleChange}
                                            className="checkbox-custom" // Hinzugefügte CSS-Klasse
                                        />
                                    </div>
                                </div>
                                <hr/>


                                <CButton className="btn btn-primary-reset btn-custom-position-reset" href="/mitgliederverwaltung">Formular Reset</CButton>

                                <CButton type="submit" className="btn btn-primary-anlegen btn-custom-position-anlegen">Anlegen</CButton>

                            </div>

                        </div>
                        </form>
                    </div>
                </div>
            </div>

                );
                };

                export default Mitgliederformular;