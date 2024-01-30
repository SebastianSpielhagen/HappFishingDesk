import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '/src/css/Mitgliederliste.css';
import {CButton} from "@coreui/react";

interface Member {
    id: string;
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
    // weitere Member Felder
}

type VisibleColumnsKey = {
    [Property in keyof Omit<Member, 'id'>]: boolean;
};
const formatDate = (dateString: string | null): string => {
    if (!dateString) {
        // Kein Datum vorhanden, geben Sie einen Platzhalter oder leeren String zurück
        return '-';
    }
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) {
        // Das Datum hat nicht das erwartete Format, geben Sie den Originalstring zurück
        return dateString;
    }
    return `${day}.${month}.${year}`;
};
// Definieren Sie eine Hilfsfunktion zum Sortieren
const Mitgliederliste: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [sortField, setSortField] = useState<keyof Member | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [error, setError] = useState('');
    // Zustandsvariable für die Sichtbarkeit der Spalten
    const [visibleColumns, setVisibleColumns] = useState<VisibleColumnsKey>({
        anrede: false,
        vorname: true,
        nachname: true,
        strasse: false,
        plz: true,
        stadt: true,
        festnetz: false,
        handy: true,
        email: true,
        geburtsdatum: false,
        eintrittsdatum: false,
        austrittsdatum: false,
        status: true,
        bezahlt: true,
        fischereischeinnummer: false,
        fischereischeinablaufdatum: false,
        // Setzen Sie für jede Spalte, die Sie ein-/ausblenden wollen, einen Eintrag
        // Initialisieren Sie alle als true, wenn alle Spalten zu Beginn sichtbar sein sollen
    });
    // Funktion zum Umschalten der Sichtbarkeit einer Spalte
    const toggleColumnVisibility = (column: keyof VisibleColumnsKey) => {
        setVisibleColumns(prevColumns => ({
            ...prevColumns,
            [column]: !prevColumns[column],
        }));
    };

    // Funktion zum Drucken der Mitgliederliste
    const printMembers = () => {
        const printWindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

        if (printWindow) {
            // Erstellen Sie das HTML für das Druckfenster
            printWindow.document.open();
            printWindow.document.write('<title>Druckvorschau Mitgliederliste</title>');

            // Fügen Sie den Link zum Druck-CSS hinzu
            printWindow.document.write(`<link rel="stylesheet" type="text/css" href="${window.location.origin}/printStyles.css">`);

            printWindow.document.write('</head><body>');
            // Einfügen der Mitgliedertabelle in das Druckfenster
            const table = document.getElementById('members-table');
            if (table) {
                printWindow.document.write(table.outerHTML);
            }
            printWindow.document.write('</body></html>');
            printWindow.document.close(); // Wichtig, um das Laden des Inhalts abzuschließen
            printWindow.focus(); // Fokus auf das neue Fenster, um den Druckdialog zu aktivieren
            // Verzögern des Druckvorgangs, bis das Dokument vollständig geladen ist
            printWindow.onload = function () {
                printWindow.print(); // Druckdialog öffnen
                printWindow.close(); // Fenster schließen, sobald gedruckt wurde
            };
        } else {
            console.error('Druckfenster konnte nicht geöffnet werden.');
        }
    };
    // Funktion zum Anpassen der Sortierreihenfolge
    const requestSort = (field: keyof Member) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (field === sortField && sortDirection === 'asc') {
            direction = 'desc';
        }
        setSortDirection(direction);
        setSortField(field);
        // Sortierlogik hier, damit sie sofort ausgeführt wird
        setMembers(members.sort((a, b) => {
            if (a[field] < b[field]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        }));
    };
    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchMembers = async () => {
            try {
                const response = await axios.get('/api/members', {
                    cancelToken: source.token
                });
                setMembers(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Abfrage wurde vom Komponenten-Unmount abgebrochen');
                } else {
                    setError("Fehler beim Abrufen der Mitgliederdaten");
                    console.error("Fehler beim Abrufen der Mitgliederdaten", error);
                }
            }
        };

        fetchMembers();

        return () => {
            source.cancel();
        };
    }, []);


    const sortedMembers = sortField
        ? members.sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        })
        : members;

    return (
        <>
            {error && <p className="error-message">{error}</p>}
            <div className="mitgliederliste">
                <div className="div">
                    <div className="left-sidebar-title">
                        <div className="left-sidebar-title-text">
                            <p>Mitgliederverwaltung</p>
                        </div>
                    </div>

                    <div className="right-sidebar-title">
                        <div className="right-sidebar-title-text">
                            <p>Spaltenauswahl</p>
                        </div>
                    </div>
                    <div className="main-list-title">
                        <div className="main-list-title-text">
                            - Komplette Mitgliederliste -
                        </div>

                        {
                            sortField && <p>Sortiert nach: {sortField}, Richtung: {sortDirection}</p>
                        }
                    </div>

                    <div className="print-button">
                        <CButton onClick={printMembers}>Drucken</CButton>
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

                    <div className="main-list">
                        <table id="members-table">
                            <thead>
                            <tr>
                                {visibleColumns.anrede &&
                                    <th className="th-anrede" onClick={() => requestSort('anrede')}>Anrede</th>}
                                {visibleColumns.vorname &&
                                    <th className="th-vorname" onClick={() => requestSort('vorname')}>Vorname</th>}
                                {visibleColumns.nachname &&
                                    <th className="th-nachname" onClick={() => requestSort('nachname')}>Nachname</th>}
                                {(visibleColumns.strasse || (visibleColumns.plz && visibleColumns.stadt)) && (
                                    <th className="th-adresse">Adresse</th>
                                )}
                                {visibleColumns.festnetz &&
                                    <th className="th-festnetz" onClick={() => requestSort('festnetz')}>Festnetz</th>}
                                {visibleColumns.handy && <th className="th-handy">Handy</th>}
                                {visibleColumns.email &&
                                    <th className="th-email" onClick={() => requestSort('email')}>Email</th>}
                                {visibleColumns.geburtsdatum && <th className="th-geburtsdatum"
                                                                    onClick={() => requestSort('geburtsdatum')}>Geburtsdatum</th>}
                                {visibleColumns.eintrittsdatum && <th className="th-eintrittsdatum">Eintrittsdatum</th>}
                                {visibleColumns.austrittsdatum && <th className="th-austrittsdatum">Austrittsdatum</th>}
                                {visibleColumns.status &&
                                    <th className="th-status" onClick={() => requestSort('status')}>Status</th>}
                                {visibleColumns.bezahlt &&
                                    <th className="th-bezahlt" onClick={() => requestSort('bezahlt')}>Bezahlt?</th>}
                                {visibleColumns.fischereischeinnummer &&
                                    <th className="th-fischereischeinnummer">FS-Nr.</th>}
                                {visibleColumns.fischereischeinablaufdatum &&
                                    <th className="th-fischereischeinablaufdatum">Ablaufdatum</th>}

                                {/* Weitere Th */}
                            </tr>
                            </thead>
                            <tbody>
                            {sortedMembers.map((member) => (
                                <tr key={member.id}>
                                    {visibleColumns.anrede && <td>{member.anrede}</td>}
                                    {visibleColumns.vorname && <td>{member.vorname}</td>}
                                    {visibleColumns.nachname && <td>{member.nachname}</td>}
                                    {(visibleColumns.strasse || (visibleColumns.plz && visibleColumns.stadt)) && (
                                        <td className="td-adresse">
                                            {visibleColumns.strasse ? <div>{member.strasse}</div> : null}
                                            {visibleColumns.plz && visibleColumns.stadt ? (
                                                <div>{member.plz} {member.stadt}</div>
                                            ) : null}
                                        </td>
                                    )}
                                    {visibleColumns.festnetz && <td>{member.festnetz}</td>}
                                    {visibleColumns.handy && <td>{member.handy}</td>}
                                    {visibleColumns.email && <td>{member.email}</td>}
                                    {visibleColumns.geburtsdatum && <td>{formatDate(member.geburtsdatum)}</td>}
                                    {visibleColumns.eintrittsdatum && <td>{formatDate(member.eintrittsdatum)}</td>}
                                    {visibleColumns.austrittsdatum && <td>{formatDate(member.austrittsdatum)}</td>}
                                    {visibleColumns.status && <td>{member.status}</td>}
                                    {visibleColumns.bezahlt && <td>{member.bezahlt ? 'Ja' : 'Nein'}</td>}
                                    {visibleColumns.fischereischeinnummer && <td>{member.fischereischeinnummer}</td>}
                                    {visibleColumns.fischereischeinablaufdatum &&
                                        <td>{formatDate(member.fischereischeinablaufdatum)}</td>}
                                    {/* ... Weitere Td, die entsprechend von visibleColumns gesteuert werden ... */}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>


                    <div className="right-sidebar">
                        {(Object.keys(visibleColumns) as Array<keyof typeof visibleColumns>).map((column) => (
                            <label key={column} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={visibleColumns[column]}
                                    onChange={() => toggleColumnVisibility(column)}
                                />
                                {column}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Mitgliederliste;