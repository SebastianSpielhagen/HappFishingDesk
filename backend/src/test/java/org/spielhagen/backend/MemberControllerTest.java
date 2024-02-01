package org.spielhagen.backend;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

class MemberControllerTest {

    @Test
    void testGetAllMembers() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        List<Member> members = Arrays.asList(new Member(), new Member());
        when(memberService.getAllMembers()).thenReturn(members);

        assertEquals(members, memberController.getAllMembers().getBody());
    }

    @Test
    void testGetMemberById() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        Member member = new Member();
        when(memberService.getMemberById("1")).thenReturn(Optional.of(member));

        assertEquals(member, memberController.getMemberById("1").getBody());
    }

    @Test
    void testGetMemberByMitgliedsnummer() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        Member member = new Member();
        when(memberService.getMemberByMitgliedsnummer("12345")).thenReturn(Optional.of(member));

        assertEquals(member, memberController.getMemberByMitgliedsnummer("12345"));
    }
    @Test
    void testSearchMembersByVorname() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        List<Member> members = Arrays.asList(new Member(), new Member());
        when(memberService.searchByVorname("Max")).thenReturn(members);

        assertEquals(members, memberController.searchMembersByVorname("Max").getBody());
    }

    @Test
    void testSearchMembersByNachname() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        List<Member> members = Arrays.asList(new Member(), new Member());
        when(memberService.searchByNachname("Mustermann")).thenReturn(members);

        assertEquals(members, memberController.searchMembersByNachname("Mustermann").getBody());
    }

    @Test
    void testSearchMembers() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        List<Member> searchResults = Arrays.asList(new Member(), new Member());
        when(memberService.searchByTerms("searchTerm")).thenReturn(searchResults);

        assertEquals(searchResults, memberController.searchMembers("searchTerm").getBody());
    }



    @Test
    void testUpdateMember() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        Member member = new Member();
        when(memberService.updateMember("12345", member)).thenReturn(member);

        assertEquals(member, memberController.updateMember("12345", member).getBody());
    }

    @Test
    void testDeleteMember() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        assertEquals(HttpStatus.NO_CONTENT, memberController.deleteMember("12345").getStatusCode());
    }

    @Test
    void testGetMemberByIdNotFound() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        when(memberService.getMemberById("1")).thenReturn(Optional.empty());

        ResponseEntity<Member> response = memberController.getMemberById("1");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testGetMemberByMitgliedsnummerNotFound() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        when(memberService.getMemberByMitgliedsnummer("12345")).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> memberController.getMemberByMitgliedsnummer("12345"));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }

    @Test
    public void testCreateMember() {
        // Mock-Service und Controller einrichten
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        // Mock-HttpServletRequest einrichten
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        // Dummy-DTO und Mitglied erstellen
        MemberDTO memberDTO = new MemberDTO();
        Member member = new Member();
        member.setId("1");

        when(memberService.createMember(any(MemberDTO.class))).thenReturn(member);

        // Test-Aufruf
        ResponseEntity<Member> response = memberController.createMember(memberDTO);

        // Assertions
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getHeaders().getLocation());

        // RequestContextHolder bereinigen
        RequestContextHolder.resetRequestAttributes();
    }

    @Test
    void testUpdateMemberNotFound() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        Member memberToUpdate = new Member();
        when(memberService.updateMember("12345", memberToUpdate))
                .thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND));

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> memberController.updateMember("12345", memberToUpdate)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }

    @Test
    void testDeleteMemberNotFound() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        doThrow(new ResponseStatusException(HttpStatus.NOT_FOUND)).when(memberService).deleteMember("12345");

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> memberController.deleteMember("12345")
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    }
}


