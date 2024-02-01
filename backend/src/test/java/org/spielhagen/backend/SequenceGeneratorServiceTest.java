package org.spielhagen.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.data.mongodb.core.query.Update;

@ExtendWith(MockitoExtension.class)
class SequenceGeneratorServiceTest {


    @Mock
    private MongoOperations mongoOperations;

    @InjectMocks
    private SequenceGeneratorService sequenceGeneratorService;


    @BeforeEach
    void setUp() {
        DatabaseSequence databaseSequence = new DatabaseSequence();
        databaseSequence.setId("test_sequence");
        databaseSequence.setSeq("1008");

        when(mongoOperations.findAndModify(
                any(Query.class),
                any(Update.class),
                any(FindAndModifyOptions.class),
                eq(DatabaseSequence.class) // Dies verwendet org.mockito.ArgumentMatchers.eq
        )).thenReturn(databaseSequence);
    }

    @Test
    void whenGenerateSequenceCalled_verifySequence() {
        final String sequenceName = "test_sequence";
        final String nextValue = "1008";

        String sequence = sequenceGeneratorService.generateSequence(sequenceName);

        assertEquals(nextValue, sequence);
    }
}