package me.sailex.ccnaexams_backend.config;

import me.sailex.ccnaexams_backend.rest.QuestionRestController;
import me.sailex.ccnaexams_backend.result.ResultManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import me.sailex.ccnaexams_backend.database.Database;
import me.sailex.ccnaexams_backend.database.QuestionCollection;

@Configuration
@ComponentScan(basePackages = "me.sailex.ccnaexams_backend.config")
public class AppConfiguration {

    @Bean
    public Database database(DatabaseConfiguration databaseConfiguration) {
        return new Database(databaseConfiguration);
    }

    @Bean
    public QuestionCollection questionCollection(Database database) {
        QuestionCollection collection =  new QuestionCollection();
        collection.setDatabase(database);
        return collection;
    }

    @Bean
    public QuestionRestController questionRestController(QuestionCollection questionCollection, ResultManager resultManager) {
        QuestionRestController controller = new QuestionRestController();
        controller.setCollection(questionCollection);
        controller.setResultManager(resultManager);
        return controller;
    }

    @Bean
    public ResultManager resultManager(QuestionCollection collection) {
        ResultManager resultManager =  new ResultManager();
        resultManager.setCollection(collection);
        return resultManager;
    }

}
