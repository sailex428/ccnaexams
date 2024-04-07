package me.sailex.ccnaexams_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConfiguration {

    @Value("${spring.data.mongodb.host}")
    private String mongoHost;

    @Value("${spring.data.mongodb.port}")
    private int mongoPort;

    @Value("${spring.data.mongodb.database}")
    private String mongoDatabaseName;

    @Value("${spring.data.mongodb.collection}")
    private String mongoCollection;

    public String getMongoHost() {
        return mongoHost;
    }

    public int getMongoPort() {
        return mongoPort;
    }

    public String getMongoDatabaseName() {
        return mongoDatabaseName;
    }

    public String getMongoCollection() {
        return mongoCollection;
    }
}

