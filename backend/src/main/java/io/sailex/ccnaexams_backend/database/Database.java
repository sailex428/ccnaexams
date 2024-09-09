package io.sailex.ccnaexams_backend.database;

import com.mongodb.MongoSocketOpenException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import io.sailex.ccnaexams_backend.config.DatabaseConfig;
import io.sailex.ccnaexams_backend.rest.QuestionController;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Getter
@Component
public class Database {

    private static final Logger LOGGER = LoggerFactory.getLogger(QuestionController.class);

    private MongoDatabase mongoDatabase;

    @Autowired
    public Database(DatabaseConfig databaseConfig) {
        try {
            MongoClient client =
                    MongoClients.create(databaseConfig.getUri() + databaseConfig.getDatabase());
            this.mongoDatabase = client.getDatabase(databaseConfig.getDatabase());

        } catch (MongoSocketOpenException e) {
            LOGGER.error("Error connecting to the database", e);
        }
    }
}
