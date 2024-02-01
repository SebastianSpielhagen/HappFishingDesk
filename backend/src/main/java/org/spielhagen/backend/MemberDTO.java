package org.spielhagen.backend;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class MemberDTO {

    // Getter und Setter
    private String id;
    private String mitgliedsnummer;
    private String anrede;
    private String vorname;
    private String nachname;
    private LocalDate geburtsdatum;
    private LocalDate austrittsdatum;
    private Boolean bezahlt;
    private LocalDate eintrittsdatum;
    private String festnetz;
    private String fischereischeinnummer;
    private String handy;
    private String email;
    private String plz;
    private String stadt;
    private String status;
    private String strasse;
    private LocalDate fischereischeinablaufdatum;
}