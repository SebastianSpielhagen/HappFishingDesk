package org.spielhagen.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MemberRepository extends MongoRepository<Member, String> {
        Optional<Member> findTopByOrderByMitgliedsnummerDesc();
        Optional<Member> findByMitgliedsnummer(Integer mitgliedsnummer);
}
