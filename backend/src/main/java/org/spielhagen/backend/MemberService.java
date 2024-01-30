package org.spielhagen.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
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
    public Optional<Member> getMemberByMitgliedsnummer(Integer mitgliedsnummer) {
        return memberRepository.findByMitgliedsnummer(mitgliedsnummer);
    }
    @Transactional
    public Member createMember(Member member) {
        // Validierungen für 'member' sollten hier durchgeführt werden, bevor es gespeichert wird.
        Integer neueMitgliedsnummer = memberRepository.findTopByOrderByMitgliedsnummerDesc()
                .map(m -> m.getMitgliedsnummer() + 1)
                .orElse(1); // Fall back auf 1, wenn keine Mitglieder vorhanden sind

        member.setMitgliedsnummer(neueMitgliedsnummer);
        return memberRepository.insert(member);
    }
    public Member createMember(MemberDTO memberDto) {
        // Hier würden Sie memberDto in ein Entity umwandeln und speichern
        Member member = new Member();
        member.setMitgliedsnummer(memberDto.getMitgliedsnummer());
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
        // Validierungen für 'member' sollten hier durchgeführt werden, bevor es aktualisiert wird.
        return memberRepository.findById(id)
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
                    // Weitere Felder, die aktualisiert werden sollen, können hier hinzugefügt werden.
                    return memberRepository.save(existingMember);
                })
                .orElseThrow(() -> new RuntimeException("Mitglied mit ID " + id + " nicht gefunden"));
    }

}