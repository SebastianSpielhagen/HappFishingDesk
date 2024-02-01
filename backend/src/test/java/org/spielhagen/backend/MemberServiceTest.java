package org.spielhagen.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private MemberService memberService;

    private Member member;

    @BeforeEach
    void setUp() {
        // Initialisieren Sie Ihre Testdaten und Mocks hier
        member = new Member();
        member.setId("1");
        member.setMitgliedsnummer("10001");
        // ... Setzen Sie die weiteren Eigenschaften des Members

        // ... Setzen Sie die Eigenschaften des MemberDTO
    }

    @Test
    @DisplayName("Alle Mitglieder abrufen")
    void getAllMembers_ShouldReturnAllMembers() {
        when(memberRepository.findAll()).thenReturn(Collections.singletonList(member));

        List<Member> members = memberService.getAllMembers();

        assertFalse(members.isEmpty(), "Die Liste der Mitglieder sollte nicht leer sein");
        assertEquals(1, members.size(), "Die Liste sollte genau ein Mitglied enthalten");
        assertEquals(member, members.getFirst(), "Das abgerufene Mitglied sollte dem " +
                "erwarteten Mitglied entsprechen");
    }

    @Test
    @DisplayName("Mitglied mit ID abrufen")
    void getMemberById_ShouldReturnMemberWhenExists() {
        when(memberRepository.findById(anyString())).thenReturn(Optional.of(member));

        Optional<Member> resultMember = memberService.getMemberById("1");

        assertTrue(resultMember.isPresent(), "Das Mitglied sollte vorhanden sein");
        assertEquals(member, resultMember.get(), "Das gefundene Mitglied" +
                " sollte dem erwarteten Mitglied entsprechen");
    }

    @Test
    @DisplayName("Mitglied löschen")
    void deleteMember_ShouldDeleteWhenExists() {
        when(memberRepository.findByMitgliedsnummer(anyString())).thenReturn(Optional.of(member));
        doNothing().when(memberRepository).delete(any(Member.class));

        assertDoesNotThrow(() -> memberService.deleteMember("10001"), "Das Löschen" +
                " eines existierenden Mitglieds sollte keine Exception werfen");

        verify(memberRepository, times(1)).findByMitgliedsnummer("10001");
        verify(memberRepository, times(1)).delete(member);
    }

    @Test
    @DisplayName("Mitglied löschen, das nicht existiert")
    void deleteMember_ShouldThrowWhenDoesNotExist() {
        when(memberRepository.findByMitgliedsnummer(anyString())).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> memberService.deleteMember("10001"),
                "Das Löschen eines nicht existierenden Mitglieds sollte eine ResponseStatusException werfen");

        verify(memberRepository, times(1)).findByMitgliedsnummer("10001");
        verify(memberRepository, never()).delete(any(Member.class));
    }


    // Test für das Aktualisieren eines vorhandenen Mitglieds
    @Test
    @DisplayName("Mitglied aktualisieren")
    void updateMember_ShouldUpdateAndReturnUpdatedMember() {
        when(memberRepository.findByMitgliedsnummer(anyString())).thenReturn(Optional.of(member));
        when(memberRepository.save(any(Member.class))).thenReturn(member);

        Member updatedMember = memberService.updateMember("10001", member);

        assertNotNull(updatedMember, "Das aktualisierte Mitglied sollte nicht null sein");
        assertEquals("10001", updatedMember.getMitgliedsnummer(), "Die Mitgliedsnummer " +
                "des aktualisierten Mitglieds sollte übereinstimmen");
        verify(memberRepository, times(1)).save(member);
    }

    // Test für das Aktualisieren eines Mitglieds, das nicht existiert
    @Test
    @DisplayName("Mitglied aktualisieren, das nicht existiert")
    void updateMember_ShouldThrowWhenMemberDoesNotExist() {
        when(memberRepository.findByMitgliedsnummer(anyString())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> memberService.updateMember("10001", member),
                "Das Aktualisieren eines nicht existierenden Mitglieds sollte eine RuntimeException werfen");

        verify(memberRepository, never()).save(any(Member.class));
    }

    // Test für die Suche nach Mitgliedern anhand des Vornamens
    @Test
    @DisplayName("Suche Mitglieder nach Vorname")
    void searchByVorname_ShouldReturnMembersWithMatchingVorname() {
        when(memberRepository.findByVornameContainingIgnoreCase(anyString()))
                .thenReturn(Collections.singletonList(member));

        List<Member> members = memberService.searchByVorname("Max");

        assertFalse(members.isEmpty(), "Die Liste sollte nicht leer sein");
        assertTrue(members.contains(member), "Die Liste sollte das gesuchte Mitglied enthalten");
    }

    // Test für die Suche nach Mitgliedern anhand des Nachnamens
    @Test
    @DisplayName("Suche Mitglieder nach Nachname")
    void searchByNachname_ShouldReturnMembersWithMatchingNachname() {
        when(memberRepository.findByNachnameContainingIgnoreCase(anyString()))
                .thenReturn(Collections.singletonList(member));

        List<Member> members = memberService.searchByNachname("Mustermann");

        assertFalse(members.isEmpty(), "Die Liste sollte nicht leer sein");
        assertTrue(members.contains(member), "Die Liste sollte das gesuchte Mitglied enthalten");
    }
}
