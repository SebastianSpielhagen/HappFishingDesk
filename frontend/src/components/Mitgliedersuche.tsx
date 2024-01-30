import React, {useState} from 'react';
import axios, {CancelTokenSource} from 'axios';
import '/src/css/Mitgliedersuche.css';
import {CButton} from "@coreui/react";
import 'bootstrap/dist/css/bootstrap.min.css';

type Member = {
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
const Mitgliedersuche: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Member[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const source = axios.CancelToken.source();
        searchMembers(searchTerm, source);
    };
    // Event-Handler, der aufgerufen wird, wenn ein Mitglied aus der Liste ausgewählt wird
    const handleMemberSelect = (mitglied: Member) => {
        // Hier könnten Sie beispielsweise zu einer Detailansicht navigieren, indem Sie die Mitgliedsnummer verwenden
        // oder Sie könnten eine Modal- oder Popup-Komponente öffnen, die die Details des Mitglieds anzeigt.
        // Zum Beispiel: history.push(`/mitglieder/${mitglied.mitgliedsnummer}`);
        console.log('Mitglied ausgewählt:', mitglied);
    };

    return (

        <div className="mitgliedersuche">
            <div className="div">
                <div className="left-sidebar-title">
                    <div className="left-sidebar-title-text">
                        <p>Mitgliederverwaltung</p>
                    </div>
                </div>

                <div className="right-sidebar-title">
                    <div className="right-sidebar-title-text">
                        <p>Suchergebnis</p>
                    </div>
                </div>
                <div className="right-sidebar">
                    {isSearching && <div>Suche...</div>}
                    {error && <div>{error}</div>}

                    {!isSearching && searchResults.length > 0 && (
                        <ul className="suchergebnisse-liste">
                            {searchResults.map(member => (
                                <li key={member.mitgliedsnummer} onClick={() => handleMemberSelect(member)}
                                    style={{cursor: 'pointer'}}>
                                    {member.vorname} {member.nachname}
                                    {/* Weitere Mitgliederdaten hier anzeigen */}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="main-list-title">
                    <div className="main-list-title-text">
                        - Mitglied suchen -
                    </div>
                </div>
                <div className="left-sidebar">
                    <div className="left-sidebar-button">
                        <div className="d-grid gap-2 col-11 mx-auto">
                            <CButton color="primary" href="/mitgliederverwaltung">Mitglied ' NEU '</CButton>
                            <CButton color="primary" href="/mitgliedersuche">Mitglied ' SUCHEN '</CButton>
                            <CButton color="primary" href="/members">Mitglieder ' LISTE '</CButton>
                        </div>
                    </div>
                </div>
                <div className="overlap-group">
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
                    </div>

                </div>

            </div>

        </div>


    );
};


export default Mitgliedersuche;