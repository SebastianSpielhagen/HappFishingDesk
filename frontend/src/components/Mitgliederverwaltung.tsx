import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/css/Mitgliederverwaltung.css';
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
    geburtsdatum: string;
    eintrittsdatum: string;
    austrittsdatum: string;
    status: string;
    bezahlt: boolean;
    fischereischeinnummer: string;
    fischereischeinablaufdatum: string;
};

const Mitgliederverwaltung: React.FC = () => {
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
        geburtsdatum: '',
        eintrittsdatum: '',
        austrittsdatum: '',
        status: '',
        bezahlt: false,
        fischereischeinnummer: '',
        fischereischeinablaufdatum: '',
    });

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
            // Hier können Sie z.B. eine Weiterleitung oder eine Benachrichtigung einfügen
        } catch (error) {
            console.error('Es gab einen Fehler beim Senden der Daten:', error);
            // Hier können Sie Fehlerbehandlung durchführen, z.B. Fehlermeldungen anzeigen
        }
    };

    return (
        <div className="mitgliederverwaltung-main">
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


    <form onSubmit={handleSubmit}>
        {/* Hier kommen Ihre Formularfelder */}
        {/* Anrede Auswahl */}
        <div className="mitglieder-form-anrede">
        <label htmlFor="anrede">Anrede:</label>
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
        <div className="mitglieder-form-vorname">
        <label htmlFor="vorname"></label>
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
        <div className="mitglieder-form-nachname">
        <label htmlFor="nachname"></label>
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
        {/* Straße Eingabefeld */}
        <div className="mitglieder-form-strasse">
        <label htmlFor="strasse"></label>
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
        <div className="mitglieder-form-plz">
        <label htmlFor="plz"></label>
        <input
            id="plz"
            type="text"
            name="plz"
                    value={member.plz}
                    onChange={handleChange}
                    required
                    placeholder="PLZ"
                />
                </div>


                {/* Stadt Eingabefeld */}
                        <div className="mitglieder-form-stadt">
                <label htmlFor="stadt"></label>
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

                {/* Festnetz Eingabefeld */}
                <div className="mitglieder-form-festnetz">
                <label htmlFor="festnetz"></label>
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
                <div className="mitglieder-form-handy">
                <label htmlFor="handy"></label>
                <input
                    id="handy"
                    type="text"
                    name="handy"
                    value={member.handy}
                    onChange={handleChange}
                    placeholder="Handy"
                />
                </div>

                {/* Geburtsdatum Eingabefeld */}
                <div className="mitglieder-form-geburtsdatum">
                <label htmlFor="geburtsdatum"></label>
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

                {/* Eintrittsdatum Eingabefeld */}
                <div className="mitglieder-form-eintrittsdatum">
                <label htmlFor="eintrittsdatum">Eintrittsdatum:</label>
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
                <div className="mitglieder-form-austrittsdatum">
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
                <div className="mitglieder-form-status">
                <label htmlFor="status">Status:</label>
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
                <div className="mitglieder-form-bezahlt">
                <label htmlFor="bezahlt">Bezahlt:</label>
                <input
                    id="bezahlt"
                    type="checkbox"
                    name="bezahlt"
                    checked={member.bezahlt}
                    onChange={handleChange}
                />
                </div>

                {/* Fischereischein Eingabefeld */}
                <div className="mitglieder-form-fischereischeinnummer">
                <label htmlFor="fischereischeinnummer">Fischereischeinnummer:</label>
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
                <div className="mitglieder-form-fischereischeinablaufdatum">
                <label htmlFor="fischereischeinablaufdatum">Fischereischeinablaufdatum:</label>
                <input
                    id="fischereischeinablaufdatum"
                    type="date"
                    name="fischereischeinablaufdatum"
                    value={member.fischereischeinablaufdatum}
                    onChange={handleChange}
                    placeholder="fischereischeinablaufdatum"
                />
                </div>
                {/* Weitere Felder entsprechend hinzufügen */}
                <CButton type="submit" className="btn btn-primary">Anlegen</CButton>
            </form>
        </div>
    );
};

export default Mitgliederverwaltung;