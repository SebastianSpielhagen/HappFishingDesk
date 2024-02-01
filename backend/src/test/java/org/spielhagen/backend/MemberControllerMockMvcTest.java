package org.spielhagen.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(MemberController.class)
class MemberControllerMockMvcTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MemberService memberService;

    private Member member;

    @BeforeEach
    public void setUp() {
        member = new Member();
        member.setId("1002");
        // Setzen Sie hier die benötigten Eigenschaften des Mitglieds
    }

    @Test
    void getAllMembers_ShouldReturnMembers() throws Exception {
        // Hier wird eine Liste von Member-Objekten erstellt
        List<Member> membersList = Arrays.asList(new Member(), new Member());

        // Mocken des Services, um die vorbereitete Liste zurückzugeben
        when(memberService.getAllMembers()).thenReturn(membersList);

        // Durchführung der MockMvc-Anfrage und Überprüfung der Antworten
        mockMvc.perform(get("/api/members"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2))); // Überprüft, ob die Liste zwei Elemente enthält
    }
    @Test
    void getMemberById_ShouldReturnMember() throws Exception {
        when(memberService.getMemberById(eq("1002"))).thenReturn(Optional.of(member));

        mockMvc.perform(get("/api/members/{id}", "1002"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is("1002"))); // Stellen Sie sicher, dass der Wert hier "1002" ist
    }

    @Test
    void createMember_ShouldReturnCreatedMember() throws Exception {
        MemberDTO memberDTO = new MemberDTO(); // Angenommen, MemberDTO ist Ihr Datenübertragungsobjekt
        Member member = new Member(); // Erstellen Sie eine Member-Instanz, die der MemberDTO entspricht
        member.setId("1");

        when(memberService.createMember(any(MemberDTO.class))).thenReturn(member);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(memberDTO)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.id", is("1")));
    }

    // Hilfsmethode, um ein Objekt in einen JSON-String zu konvertieren
    String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("Fehler beim Konvertieren des Objekts zu einem JSON-String", e);
        }
    }
    @Test
    void deleteMember_ShouldReturnNoContent() throws Exception {
        doNothing().when(memberService).deleteMember(anyString());

        mockMvc.perform(delete("/api/members/{id}", "1"))
                .andExpect(status().isNoContent());
    }
}