package me.sailex.ccnaexams_backend.database;

import com.mongodb.MongoSocketOpenException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import me.sailex.ccnaexams_backend.rest.QuestionRestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class Database {

    private MongoClient client;
    private MongoDatabase mongoDatabase;

    private final Logger log =
            LoggerFactory.getLogger(QuestionRestController.class);

    public Database() {
        try {
            this.client = MongoClients.create("mongodb://localhost:27017/ccnaexams");
            this.mongoDatabase = client.getDatabase("ccnaexams");
        } catch (MongoSocketOpenException e) {
            log.error("Error connecting to database");
        }
    }

    public MongoDatabase getMongoDatabase() {
        return mongoDatabase;
    }

}
