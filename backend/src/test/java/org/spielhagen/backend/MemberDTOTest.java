package org.spielhagen.backend;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.time.LocalDate;

public class MemberDTOTest {

    @Test
    public void testMemberDTOConstructor() {
        MemberDTO memberDTO = new MemberDTO();
        assertNotNull(memberDTO);
    }

    @Test
    public void testGetterAndSetter() {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId("1");
        memberDTO.setMitgliedsnummer("12345");
        memberDTO.setAnrede("Herr");
        memberDTO.setVorname("Max");
        memberDTO.setNachname("Mustermann");
        memberDTO.setGeburtsdatum(LocalDate.of(1990, 1, 1));
        memberDTO.setAustrittsdatum(LocalDate.of(2022, 12, 31));
        memberDTO.setBezahlt(true);
        memberDTO.setEintrittsdatum(LocalDate.of(2020, 1, 1));
        memberDTO.setFestnetz("0123456789");
        memberDTO.setFischereischeinnummer("FS12345");
        memberDTO.setHandy("9876543210");
        memberDTO.setEmail("max.mustermann@example.com");
        memberDTO.setPlz("12345");
        memberDTO.setStadt("Musterstadt");
        memberDTO.setStatus("Aktiv");
        memberDTO.setStrasse("Musterstraße 123");
        memberDTO.setFischereischeinablaufdatum(LocalDate.of(2025, 12, 31));

        assertEquals("1", memberDTO.getId());
        assertEquals("12345", memberDTO.getMitgliedsnummer());
        assertEquals("Herr", memberDTO.getAnrede());
        assertEquals("Max", memberDTO.getVorname());
        assertEquals("Mustermann", memberDTO.getNachname());
        assertEquals(LocalDate.of(1990, 1, 1), memberDTO.getGeburtsdatum());
        assertEquals(LocalDate.of(2022, 12, 31), memberDTO.getAustrittsdatum());
        assertTrue(memberDTO.getBezahlt());
        assertEquals(LocalDate.of(2020, 1, 1), memberDTO.getEintrittsdatum());
        assertEquals("0123456789", memberDTO.getFestnetz());
        assertEquals("FS12345", memberDTO.getFischereischeinnummer());
        assertEquals("9876543210", memberDTO.getHandy());
        assertEquals("max.mustermann@example.com", memberDTO.getEmail());
        assertEquals("12345", memberDTO.getPlz());
        assertEquals("Musterstadt", memberDTO.getStadt());
        assertEquals("Aktiv", memberDTO.getStatus());
        assertEquals("Musterstraße 123", memberDTO.getStrasse());
        assertEquals(LocalDate.of(2025, 12, 31), memberDTO.getFischereischeinablaufdatum());
    }
}