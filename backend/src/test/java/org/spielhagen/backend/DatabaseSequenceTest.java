package org.spielhagen.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class DatabaseSequenceTest {

    private DatabaseSequence databaseSequence;

    @BeforeEach
    void setUp() {
        databaseSequence = new DatabaseSequence();
    }

    @Test
    void testSetAndGetId() {
        String idValue = "testId";
        databaseSequence.setId(idValue);
        assertEquals(idValue, databaseSequence.getId(), "Getter or setter for id is not working as expected.");
    }

    @Test
    void testSetAndGetSeq() {
        String seqValue = "123";
        databaseSequence.setSeq(seqValue);
        assertEquals(seqValue, databaseSequence.getSeq(), "Getter or setter for seq is not working as expected.");
    }
}