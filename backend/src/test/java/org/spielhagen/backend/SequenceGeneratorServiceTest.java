package org.spielhagen.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
class SequenceGeneratorServiceTest {

    @Mock
    private MongoOperations mongoOperations;

    @InjectMocks
    private SequenceGeneratorService sequenceGeneratorService;

    private DatabaseSequence databaseSequence;

    @BeforeEach
    void setUp() {
        databaseSequence = new DatabaseSequence();
        databaseSequence.setId("test_sequence");
        databaseSequence.setSeq("1008");
    }

    @Test
    void whenGenerateSequenceCalled_verifySequence() {
        when(mongoOperations.findAndModify(
                any(Query.class),
                any(Update.class),
                any(FindAndModifyOptions.class),
                eq(DatabaseSequence.class)
        )).thenReturn(databaseSequence);

        String sequence = sequenceGeneratorService.generateSequence("test_sequence");
        assertEquals("1008", sequence);
    }

    @Test
    void whenGenerateSequenceCalledAndCounterIsNull_returnOne() {
        when(mongoOperations.findAndModify(
                any(Query.class),
                any(Update.class),
                any(FindAndModifyOptions.class),
                eq(DatabaseSequence.class)
        )).thenReturn(null);

        String sequence = sequenceGeneratorService.generateSequence("test_sequence");
        assertEquals("1", sequence);
    }

    @Test
    void whenGenerateSequenceCalledWithDifferentSeqName_returnExpectedSequence() {
        String expectedSeq = "5001";
        DatabaseSequence anotherSequence = new DatabaseSequence();
        anotherSequence.setId("another_sequence");
        anotherSequence.setSeq(expectedSeq);

        when(mongoOperations.findAndModify(
                any(Query.class),
                any(Update.class),
                any(FindAndModifyOptions.class),
                eq(DatabaseSequence.class)
        )).thenReturn(anotherSequence);

        String sequence = sequenceGeneratorService.generateSequence("another_sequence");
        assertEquals(expectedSeq, sequence);
    }

    @Test
    void whenGenerateSequenceThrowsException_thenAssertionSucceeds() {
        when(mongoOperations.findAndModify(
                any(Query.class),
                any(Update.class),
                any(FindAndModifyOptions.class),
                eq(DatabaseSequence.class)
        )).thenThrow(new RuntimeException("Database down"));

        assertThrows(RuntimeException.class, () -> {
            sequenceGeneratorService.generateSequence("test_sequence");
        });
    }
}