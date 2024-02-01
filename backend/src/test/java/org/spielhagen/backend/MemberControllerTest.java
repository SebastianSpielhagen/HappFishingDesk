package org.spielhagen.backend;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

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
}