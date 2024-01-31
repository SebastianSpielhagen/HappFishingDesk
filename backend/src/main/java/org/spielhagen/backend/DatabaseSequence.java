package org.spielhagen.backend;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "database_sequences")
public class DatabaseSequence {

    // Standard-Getter und Setter
    @Id
    private String id;
    private String seq;

}