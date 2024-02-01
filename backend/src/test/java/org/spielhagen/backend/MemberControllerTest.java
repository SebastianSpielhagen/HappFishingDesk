package org.spielhagen.backend;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class MemberControllerTest {

    @Test
    public void testGetAllMembers() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        List<Member> members = Arrays.asList(new Member(), new Member());
        when(memberService.getAllMembers()).thenReturn(members);

        assertEquals(members, memberController.getAllMembers().getBody());
    }

    @Test
    public void testGetMemberById() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        Member member = new Member();
        when(memberService.getMemberById("1")).thenReturn(Optional.of(member));

        assertEquals(member, memberController.getMemberById("1").getBody());
    }

    @Test
    public void testGetMemberByMitgliedsnummer() {
        MemberService memberService = mock(MemberService.class);
        MemberController memberController = new MemberController(memberService);

        Member member = new Member();
        when(memberService.getMemberByMitgliedsnummer("12345")).thenReturn(Optional.of(member));

        assertEquals(member, memberController.getMemberByMitgliedsnummer("12345"));
    }

    // Weitere Tests für die restlichen Methoden des Controllers
}