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
    public QuestionCollection questionCollection(Database database) {
        QuestionCollection collection = new QuestionCollection();
        collection.setDatabase(database);
        return collection;
    }

    @Bean
    public QuestionController questionController(
            QuestionCollection questionCollection, ResultManager resultManager) {
        QuestionController controller = new QuestionController();
        controller.setCollection(questionCollection);
        controller.setResultManager(resultManager);
        return controller;
    }

    @Bean
    public ResultManager resultManager(QuestionCollection collection) {
        ResultManager resultManager = new ResultManager();
        resultManager.setCollection(collection);
        return resultManager;
    }
}
