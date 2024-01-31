package org.spielhagen.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public MemberService(MemberRepository memberRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.memberRepository = memberRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public List<Member> searchByVorname(String vorname) {
        return memberRepository.findByVornameContainingIgnoreCase(vorname);
    }

    public List<Member> searchByNachname(String nachname) {
        return memberRepository.findByNachnameContainingIgnoreCase(nachname);
    }

    public List<Member> searchByTerms(String searchTerm) {
        return memberRepository.searchByTerms(searchTerm);
    }

    public Optional<Member> getMemberById(String id) {
        return memberRepository.findById(id);
    }

    public Optional<Member> getMemberByMitgliedsnummer(String mitgliedsnummer) {
        return memberRepository.findByMitgliedsnummer(mitgliedsnummer);
    }

    @Transactional
    public Member createMember(MemberDTO memberDto) {
        Member member = new Member();
        member.setMitgliedsnummer(sequenceGeneratorService.generateSequence(Member.SEQUENCE_NAME));
        member.setAnrede(memberDto.getAnrede());
        member.setVorname(memberDto.getVorname());
        member.setNachname(memberDto.getNachname());
        member.setStrasse(memberDto.getStrasse());
        member.setPlz(memberDto.getPlz());
        member.setStadt(memberDto.getStadt());
        member.setFestnetz(memberDto.getFestnetz());
        member.setHandy(memberDto.getHandy());
        member.setEmail(memberDto.getEmail());
        member.setGeburtsdatum(memberDto.getGeburtsdatum());
        member.setEintrittsdatum(memberDto.getEintrittsdatum());
        member.setAustrittsdatum(memberDto.getAustrittsdatum());
        member.setStatus(memberDto.getStatus());
        member.setBezahlt(memberDto.getBezahlt());
        member.setFischereischeinnummer(memberDto.getFischereischeinnummer());
        member.setFischereischeinablaufdatum(memberDto.getFischereischeinablaufdatum());
        return memberRepository.save(member);
    }

    @Transactional
    public Member updateMember(String id, Member member) {

        return memberRepository.findByMitgliedsnummer(id)
                .map(existingMember -> {
                    existingMember.setAnrede(member.getAnrede());
                    existingMember.setVorname(member.getVorname());
                    existingMember.setNachname(member.getNachname());
                    existingMember.setStrasse(member.getStrasse());
                    existingMember.setPlz(member.getPlz());
                    existingMember.setStadt(member.getStadt());
                    existingMember.setFestnetz(member.getFestnetz());
                    existingMember.setHandy(member.getHandy());
                    existingMember.setEmail(member.getEmail());
                    existingMember.setGeburtsdatum(member.getGeburtsdatum());
                    existingMember.setEintrittsdatum(member.getEintrittsdatum());
                    existingMember.setAustrittsdatum(member.getAustrittsdatum());
                    existingMember.setStatus(member.getStatus());
                    existingMember.setBezahlt(member.getBezahlt());
                    existingMember.setFischereischeinnummer(member.getFischereischeinnummer());
                    existingMember.setFischereischeinablaufdatum(member.getFischereischeinablaufdatum());
                    return memberRepository.save(existingMember);
                })
                .orElseThrow(() -> new RuntimeException("Mitglied mit ID " + id + " nicht gefunden"));
    }
    public void deleteMember(String mitgliedsnummer) {
        Optional<Member> memberOptional = memberRepository.findByMitgliedsnummer(mitgliedsnummer);
        if (memberOptional.isPresent()) {
            memberRepository.delete(memberOptional.get());
        } else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Mitglied mit Mitgliedsnummer " + mitgliedsnummer + " nicht gefunden"
            );
        }
    }
}