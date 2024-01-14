package org.spielhagen.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;
    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
    // Holt alle Mitglieder ab
    @GetMapping
    public ResponseEntity<List<Member>> getAllMembers() {
        return new ResponseEntity<>(memberService.getAllMembers(), HttpStatus.OK);
    }
    // Holen eines Mitglied nach ID ab
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable String id) {
        return memberService.getMemberById(id)
                .map(member -> new ResponseEntity<>(member, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/byMitgliedsnummer/{mitgliedsnummer}")
    public Member getMemberByMitgliedsnummer(@PathVariable Integer mitgliedsnummer) {
        return memberService.getMemberByMitgliedsnummer(mitgliedsnummer)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Mitgliedsnummer existiert nicht: " + mitgliedsnummer));
    }
    @PostMapping
    public ResponseEntity<Member> createMember(@RequestBody MemberDTO memberDto) {
        Member newMember = memberService.createMember(memberDto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newMember.getId())
                .toUri();
        return ResponseEntity.created(location).body(newMember);
    }
}
