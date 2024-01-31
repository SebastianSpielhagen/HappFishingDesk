import React, {useEffect, useState} from 'react';
import axios, {CancelTokenSource} from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/css/Mitgliederformular.css';
import {CButton} from "@coreui/react";

type MemberFormState = {
    mitgliedsnummer: string;
    anrede: string;
    vorname: string;
    nachname: string;
    strasse: string;
    plz: string;
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
type Member = {
    mitgliedsnummer: string;
    anrede: string;
    vorname: string;
    nachname: string;
    strasse: string;
    plz: string;
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
    const initialMemberState: MemberFormState = {
        mitgliedsnummer: '',
        anrede: '',
        vorname: '',
        nachname: '',
        strasse: '',
        plz: '',
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
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Member[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [member, setMember] = useState<MemberFormState>(initialMemberState);
    // Funktion zum Schließen des Bestätigungspopups
    const closeConfirmationPopup = () => {
        setShowConfirmPopup(false);
    };

    // Funktion zum Schließen des Erfolgspopups
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
        setMember(initialMemberState); // Setzt den member State zurück auf den Anfangszustand
    };


    // Funktion zum Aktualisieren des Mitglieds nach Bestätigung
    const confirmAndUpdateMember = async () => {
        closeConfirmationPopup(); // Schließen des Bestätigungspopups
        // Hier die Logik zum Speichern der Daten einfügen, z.B.:
        await handleUpdate(); // Nutzen Sie Ihre bestehende Update-Funktion
        setShowSuccessPopup(true); // Erfolgspopup anzeigen
    };
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
    // Update-Funktion
    const handleUpdate = async () => {
        if (member.mitgliedsnummer) {
            try {
                // PUT-Anfrage an die API senden
                const response = await axios.put(`/api/members/${member.mitgliedsnummer}`, member);
                console.log(response.data);
                setShowSuccessPopup(true); // Erfolgspopup anzeigen
                setShowConfirmPopup(false); // Warnpopup schließen
            } catch (error) {
                console.error('Fehler beim Aktualisieren der Daten:', error);
            }
        } else {
            console.error('Die Mitgliedsnummer fehlt oder ist ungültig.');
        }
    };
    // Funktion zum Anzeigen des Warnpopups vor dem Update
    const confirmUpdate = () => {
        setShowConfirmPopup(true);
    };

    const searchMembers = async (search: string, source: CancelTokenSource) => {
        try {
            setIsSearching(true);
            setError('');

            const response = await axios.get(`/api/members/search`, {
                params: {searchTerm: search},
                cancelToken: source.token
            });
            setSearchResults(response.data); // Angenommen, die Antwort ist ein Array von Mitgliedern
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Suchabfrage wurde abgebrochen');
            } else {
                setError("Keine Mitglieder gefunden.");
                console.error("Keine Mitglieder gefunden", error);
            }
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };
    useEffect(() => {
        // Erstellen Sie einen CancelToken, wenn die Komponente gemountet wird
        const source = axios.CancelToken.source();

        // Cleanup-Funktion, die aufgerufen wird, wenn die Komponente ungemountet wird
        return () => {
            // Abbrechen aller laufenden Anfragen
            source.cancel("Komponente wird nicht mehr angezeigt");
        };
    }, []); // [] bedeutet, dass dieser Effekt nur beim Mounten und Unmounten läuft
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const handleDelete = async () => {
        if (window.confirm("Sind Sie sicher, dass Sie diesen Datensatz löschen möchten?")) {
            try {
                if (member.mitgliedsnummer) {
                    const response = await axios.delete(`/api/members/${member.mitgliedsnummer}`);
                    console.log(response.data);
                    // Hier könnten Sie den Zustand aktualisieren oder eine Benachrichtigung anzeigen
                    // Setzen Sie beispielsweise den Member-Zustand zurück
                    setMember({
                        mitgliedsnummer: '',
                        anrede: '',
                        vorname: '',
                        nachname: '',
                        strasse: '',
                        plz: '',
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

                }
            } catch (error) {
                console.error('Fehler beim Löschen des Datensatzes:', error);
            }
        }
    };

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const source = axios.CancelToken.source();

        try {
            await searchMembers(searchTerm, source); // Verwenden Sie 'await' hier
        } catch (error) {

            console.error('Fehler beim Suchen der Mitglieder:', error);
        }
    };
    const handleMemberSelect = (member: Member) => {
        // Aktualisieren Sie den State, um die Daten des ausgewählten Mitglieds zu beinhalten
        setMember({
            mitgliedsnummer: member.mitgliedsnummer,
            anrede: member.anrede,
            vorname: member.vorname,
            nachname: member.nachname,
            strasse: member.strasse,
            plz: member.plz,
            stadt: member.stadt,
            festnetz: member.festnetz,
            handy: member.handy,
            email: member.email,
            geburtsdatum: member.geburtsdatum,
            eintrittsdatum: member.eintrittsdatum,
            austrittsdatum: member.austrittsdatum,
            status: member.status,
            bezahlt: member.bezahlt,
            fischereischeinnummer: member.fischereischeinnummer,
            fischereischeinablaufdatum: member.fischereischeinablaufdatum,
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
                mitgliedsnummer: '',
                anrede: '',
                vorname: '',
                nachname: '',
                strasse: '',
                plz: '',
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

    return (
        <div className="mitgliederformular">
            <div className="div">

                <div className="left-sidebar-title">
                    <div className="left-sidebar-title-text">
                        <p>- Menü -</p>
                    </div>
                </div>

                <div className="right-sidebar-title">
                    <div className="right-sidebar-title-text">
                        <p>- Suchergebnis -</p>
                    </div>
                </div>
                <div className="right-sidebar">
                    {isSearching && <div>Suche...</div>}
                    {error && <div>{error}</div>}

                    {!isSearching && searchResults.length > 0 && (
                        <ul className="suchergebnisse-liste">
                            {searchResults.map((member) => (
                                <li key={member.mitgliedsnummer} onClick={() => handleMemberSelect(member)}>
                                    {member.vorname} {member.nachname}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="main-list-title">
                    <div className="main-list-title-text">
                        - Mitgliederverwaltung -
                    </div>
                </div>
                <div className="left-sidebar">
                    <div className="left-sidebar-button">
                        <div className="d-grid gap-2 col-11 mx-auto">
                            <CButton color="primary" href="/mitgliederverwaltung">Mitgliederverwaltung</CButton>
                            <CButton color="primary" href="/members">Alle Mitglieder als Liste</CButton>
                        </div>
                    </div>
                </div>
                {/* Bestätigungspopup */}
                {showConfirmPopup && (
                    <div className="confirm-popup">
                        <p>Sind Sie sicher, dass Sie die Änderungen speichern möchten?</p>
                        <CButton onClick={confirmAndUpdateMember} className="btn-primary-confirm-popup">Ja</CButton>
                        <CButton onClick={closeConfirmationPopup} className="btn-primary-cancel-popup">Nein</CButton>
                    </div>
                )}

                {/* Erfolgspopup */}
                {showSuccessPopup && (
                    <div className="popup">
                        <p>Die Änderungen wurden erfolgreich gespeichert!!</p>
                        <CButton onClick={closeSuccessPopup} className="btn btn-primary-reset btn-custom-position-popup">OK</CButton>
                    </div>
                )}
                <div className="main-list">
                    <form onSubmit={handleSearch} className="mitgliedersuche-formular">
                        <label className="volltextsuche">Volltextsuche:</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Mitglieder suchen..."
                            className="form-control"
                        />

                        <CButton type="submit"
                                 className="btn btn-primary-suchen btn-custom-position-suchen">Suchen</CButton>

                    </form>
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
                                        value={member.vorname || ''}
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
                                        value={member.nachname || ''}
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
                                        value={member.strasse || ''}
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
                                        value={member.plz || ''}
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
                                        value={member.stadt || ''}
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
                                        value={member.festnetz || ''}
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
                                        value={member.handy || ''}
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
                                        value={member.email || ''}
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
                                            value={member.fischereischeinnummer || ''}
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
                                            value={member.fischereischeinablaufdatum || ''}
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
                                <CButton
                                    className="btn btn-danger btn-custom-position-delete"
                                    onClick={handleDelete}
                                    disabled={!member.mitgliedsnummer}
                                >
                                    Löschen
                                </CButton>
                                <CButton
                                    className="btn btn-primary-update btn-custom-position-update"
                                    onClick={confirmUpdate}
                                    disabled={!member.mitgliedsnummer} // Deaktiviere den Button,
                                    // wenn keine Mitgliedsnummer vorhanden ist
                                >
                                    Update
                                </CButton>

                                <CButton className="btn btn-primary-reset btn-custom-position-reset"
                                         href="/mitgliederverwaltung">Reset</CButton>

                                <CButton type="submit"
                                         className="btn btn-primary-anlegen btn-custom-position-anlegen"
                                         disabled={member.mitgliedsnummer.length > 0}
                                    >
                                    Anlegen
                                </CButton>

                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Mitgliederformular;