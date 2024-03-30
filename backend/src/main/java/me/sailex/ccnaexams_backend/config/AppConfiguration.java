package me.sailex.ccnaexams_backend.config;

import me.sailex.ccnaexams_backend.rest.QuestionRestController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import me.sailex.ccnaexams_backend.database.Database;
import me.sailex.ccnaexams_backend.database.QuestionCollection;

@Configuration
@ComponentScan(basePackages = "me.sailex.ccnaexams_backend")
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
    public QuestionRestController questionRestController(QuestionCollection questionCollection) {
        QuestionRestController controller = new QuestionRestController();
        controller.setCollection(questionCollection);
        return controller;
    }

}
