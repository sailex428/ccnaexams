package me.sailex.ccnaexams_backend.config;

import me.sailex.ccnaexams_backend.rest.QuestionRestController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import me.sailex.ccnaexams_backend.database.Database;
import me.sailex.ccnaexams_backend.database.QuestionCollection;

@Configuration
public class AppConfiguration {

    @Bean
    public Database database() {
        return new Database();
    }

    @Bean
    public QuestionCollection questionCollection() {
        QuestionCollection collection =  new QuestionCollection();
        collection.setDatabase(database());
        return collection;
    }

    @Bean
    public QuestionRestController questionRestController() {
        QuestionRestController controller = new QuestionRestController();
        controller.setCollection(questionCollection());
        return controller;
    }

}
