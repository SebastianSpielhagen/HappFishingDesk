package org.spielhagen.backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document
public class Member {

    @Id
    private String id;
    private Integer mitgliedsnummer;
    private String anrede;
    private String vorname;
    private String nachname;
    private String strasse;
    private Integer plz;
    private String stadt;
    private String festnetz;
    private String handy;
    private String email;
    private LocalDate geburtsdatum;
    private LocalDate eintrittsdatum;
    private LocalDate austrittsdatum;
    private String status;
    private Boolean bezahlt;
    private String fischereischeinnummer;
    private LocalDate fischereischeinablaufdatum;



    // Konstruktor
    public Member(String id, String anrede, String vorname, String nachname, LocalDate geburtsdatum) {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("ID darf nicht leer sein oder eine Null enthalten");
        }
        this.id = id;
        this.mitgliedsnummer = mitgliedsnummer;
        this.anrede = anrede;
        this.vorname = vorname;
        this.nachname = nachname;
        this.strasse = strasse;
        this.plz = plz;
        this.stadt = stadt;
        this.festnetz = festnetz;
        this.handy = handy;
        this.email = email;
        this.geburtsdatum = geburtsdatum;
        this.eintrittsdatum = eintrittsdatum;
        this.austrittsdatum = austrittsdatum;
        this.status = status;
        this.bezahlt = bezahlt;
        this.fischereischeinnummer = fischereischeinnummer;
        this.fischereischeinablaufdatum = fischereischeinablaufdatum;

    }

    // Leerer Konstruktor für Frameworks und Libraries, die es benötigen könnten
    public Member() {
    }

    // Getter und Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getMitgliedsnummer() {
        return mitgliedsnummer;
    }
    public void setMitgliedsnummer(Integer mitgliedsnummer) {
        this.mitgliedsnummer = mitgliedsnummer;
    }
    public String getAnrede() {
        return anrede;
    }

    public void setAnrede(String anrede) {
        this.anrede = anrede;
    }

    public String getVorname() {
        return vorname;
    }

    public void setVorname(String vorname) {
        this.vorname = vorname;
    }

    public String getNachname() {
        return nachname;
    }

    public void setNachname(String nachname) {
        this.nachname = nachname;
    }

    public String getStrasse() {
        return strasse;
    }
    public void setStrasse(String strasse) {
        this.strasse = strasse;
    }
    public Integer getPlz() {
        return plz;
    }
    public void setPlz(Integer plz) {
        this.plz = plz;
    }
    public String getStadt() {
        return stadt;
    }
    public void setStadt(String stadt) {
        this.stadt = stadt;
    }
    public String getFestnetz() {
        return festnetz;
    }
    public void setFestnetz(String festnetz) {
        this.festnetz = festnetz;
    }
    public String getHandy() {
        return handy;
    }
    public void setHandy(String handy) {
        this.handy = handy;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getGeburtsdatum() {
        return geburtsdatum;
    }

    public void setGeburtsdatum(LocalDate geburtsdatum) {
        this.geburtsdatum = geburtsdatum;
    }
    public LocalDate getEintrittsdatum() {
        return eintrittsdatum;
    }

    public void setEintrittsdatum(LocalDate eintrittsdatum) {
        this.eintrittsdatum = eintrittsdatum;
    }
    public LocalDate getAustrittsdatum() {
        return austrittsdatum;
    }
    public void setAustrittsdatum(LocalDate austrittsdatum) {
        this.austrittsdatum = austrittsdatum;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Boolean getBezahlt() {
        return bezahlt;
    }
    public void setBezahlt(Boolean bezahlt) {
        this.bezahlt = bezahlt;
    }
    public String getFischereischeinnummer() {
        return fischereischeinnummer;
    }
    public void setFischereischeinnummer(String fischereischeinnummer) {
        this.fischereischeinnummer = fischereischeinnummer;
    }
    public LocalDate getFischereischeinablaufdatum() {
        return fischereischeinablaufdatum;
    }
    public void setFischereischeinablaufdatum(LocalDate fischereischeinablaufdatum) {
        this.fischereischeinablaufdatum = fischereischeinablaufdatum;
    }

}