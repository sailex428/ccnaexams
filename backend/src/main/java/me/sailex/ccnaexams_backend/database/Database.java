package me.sailex.ccnaexams_backend.database;

import com.mongodb.MongoSocketOpenException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import me.sailex.ccnaexams_backend.config.DatabaseConfiguration;
import me.sailex.ccnaexams_backend.rest.QuestionRestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Database {

    private MongoDatabase mongoDatabase;

    @Autowired
    public Database(DatabaseConfiguration databaseConfiguration) {
        try {
            MongoClient client = MongoClients.create("mongodb://" + databaseConfiguration.getMongoHost() + ":" +
                    databaseConfiguration.getMongoPort() + "/" + databaseConfiguration.getMongoDatabaseName());
            this.mongoDatabase = client.getDatabase(databaseConfiguration.getMongoDatabaseName());

        } catch (MongoSocketOpenException e) {
            Logger log = LoggerFactory.getLogger(QuestionRestController.class);
            log.error("Error connecting to database");
        }
    }

    public MongoDatabase getMongoDatabase() {
        return mongoDatabase;
    }
}
