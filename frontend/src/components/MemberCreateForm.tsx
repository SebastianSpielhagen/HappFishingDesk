import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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

const MemberCreateForm: React.FC = () => {
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
        <div>
            <h2>Mitglied Anlegen</h2>
            <form onSubmit={handleSubmit}>
                {/* Hier kommen Ihre Formularfelder */}
                {/* Anrede Auswahl */}
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
                {/* Vorname Eingabefeld */}
                <label htmlFor="vorname">Vorname:</label>
                <input
                    id="vorname"
                    type="text"
                    name="vorname"
                    value={member.vorname}
                    onChange={handleChange}
                    required
                    placeholder="Vorname"
                />

                {/* Nachname Eingabefeld */}
                <label htmlFor="nachname">Nachname:</label>
                <input
                    id="nachname"
                    type="text"
                    name="nachname"
                    value={member.nachname}
                    onChange={handleChange}
                    required
                    placeholder="Nachname"
                />

                {/* Straße Eingabefeld */}
                <label htmlFor="strasse">Straße:</label>
                <input
                    id="strasse"
                    type="text"
                    name="strasse"
                    value={member.strasse}
                    onChange={handleChange}
                    required
                    placeholder="Straße"
                />

                {/* PLZ Eingabefeld */}
                <label htmlFor="plz">PLZ:</label>
                <input
                    id="plz"
                    type="text"
                    name="plz"
                    value={member.plz}
                    onChange={handleChange}
                    required
                    placeholder="PLZ"
                />

                {/* Stadt Eingabefeld */}
                <label htmlFor="stadt">Stadt:</label>
                <input
                    id="stadt"
                    type="text"
                    name="stadt"
                    value={member.stadt}
                    onChange={handleChange}
                    required
                    placeholder="Stadt"
                />

                {/* Festnetz Eingabefeld */}
                <label htmlFor="festnetz">Festnetz:</label>
                <input
                    id="festnetz"
                    type="text"
                    name="festnetz"
                    value={member.festnetz}
                    onChange={handleChange}
                    placeholder="Festnetz"
                />

                {/* Handy Eingabefeld */}
                <label htmlFor="handy">Handy:</label>
                <input
                    id="handy"
                    type="text"
                    name="handy"
                    value={member.handy}
                    onChange={handleChange}
                    placeholder="Handy"
                />

                {/* Geburtsdatum Eingabefeld */}
                <label htmlFor="geburtsdatum">Geburtsdatum:</label>
                <input
                    id="geburtsdatum"
                    type="date"
                    name="geburtsdatum"
                    value={member.geburtsdatum}
                    onChange={handleChange}
                    required
                    placeholder="Geburtsdatum"
                />

                {/* Eintrittsdatum Eingabefeld */}
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

                {/* Austrittsdatum Eingabefeld */}
                <label htmlFor="austrittsdatum">Austrittsdatum:</label>
                <input
                    id="austrittsdatum"
                    type="date"
                    name="austrittsdatum"
                    value={member.austrittsdatum}
                    onChange={handleChange}
                    placeholder="Austrittsdatum"
                />

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

                {/* Bezahlt Checkbox */}
                <label htmlFor="bezahlt">Bezahlt:</label>
                <input
                    id="bezahlt"
                    type="checkbox"
                    name="bezahlt"
                    checked={member.bezahlt}
                    onChange={handleChange}
                />

                {/* Fischereischein Eingabefeld */}
                <label htmlFor="fischereischeinnummer">Fischereischeinnummer:</label>
                <input
                    id="fischereischeinnummer"
                    type="text"
                    name="fischereischeinnummer"
                    value={member.fischereischeinnummer}
                    onChange={handleChange}

                    placeholder="Fischereischeinnummer"
                />

                {/* Ablaufdatum Eingabefeld */}
                <label htmlFor="fischereischeinablaufdatum">Fischereischeinablaufdatum:</label>
                <input
                    id="fischereischeinablaufdatum"
                    type="date"
                    name="fischereischeinablaufdatum"
                    value={member.fischereischeinablaufdatum}
                    onChange={handleChange}
                    placeholder="fischereischeinablaufdatum"
                />
                {/* Weitere Felder entsprechend hinzufügen */}
                <button type="submit" className="btn btn-primary">Anlegen</button>
            </form>
        </div>
    );
};

export default MemberCreateForm;