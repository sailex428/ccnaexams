package io.sailex.ccnaexams_backend.config;

import io.sailex.ccnaexams_backend.database.Database;
import io.sailex.ccnaexams_backend.database.QuestionCollection;
import io.sailex.ccnaexams_backend.rest.QuestionController;
import io.sailex.ccnaexams_backend.result.ResultManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public DatabaseConfig databaseConfiguration() {
        return new DatabaseConfig();
    }

    @Bean
    public Database database(DatabaseConfig databaseConfig) {
        return new Database(databaseConfig);
    }

    @Bean
    public QuestionCollection questionCollection(Database database, DatabaseConfig databaseConfig) {
        QuestionCollection collection = new QuestionCollection();
        collection.setDatabase(database);
        collection.setDatabaseConfig(databaseConfig);
        return collection;
    }

    @Bean
    public ResultManager resultManager() {
        return new ResultManager();
    }

    @Bean
    public QuestionController questionController(
            QuestionCollection questionCollection, ResultManager resultManager) {
        QuestionController controller = new QuestionController();
        controller.setCollection(questionCollection);
        controller.setResultManager(resultManager);
        return controller;
    }
}
