package org.spielhagen.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
public class HealthCheckController {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public HealthCheckController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/healthcheck")
    public ResponseEntity<String> checkDbConnection() {
        try {
            mongoTemplate.getDb().getName(); // Versuch, den DB-Namen zu erhalten, um die Verbindung zu testen
            return ResponseEntity.ok("Connected to MongoDB.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to connect to MongoDB.");
        }
    }
}