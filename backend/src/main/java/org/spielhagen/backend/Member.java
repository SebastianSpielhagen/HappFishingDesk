package org.spielhagen.backend;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Setter
@Getter
@Document
public class Member {

    // Getter und Setter
    @Id
    private String id;
    private String mitgliedsnummer;
    private String anrede;
    private String vorname;
    private String nachname;
    private String strasse;
    private String plz;
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

    public static final String SEQUENCE_NAME = "members_sequence";
}