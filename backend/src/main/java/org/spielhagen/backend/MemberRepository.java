package org.spielhagen.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends MongoRepository<Member, String> {
        Optional<Member> findTopByOrderByMitgliedsnummerDesc();
        Optional<Member> findByMitgliedsnummer(Integer mitgliedsnummer);
        // In Ihrem MemberRepository
        List<Member> findByVornameContainingIgnoreCase(String vorname);
        List<Member> findByNachnameContainingIgnoreCase(String nachname);
        @Query("{ $text: { $search: ?0 } }")
        List<Member> searchByTerms(String search);
}
