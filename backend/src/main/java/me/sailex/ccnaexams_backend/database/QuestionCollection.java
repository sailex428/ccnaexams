package me.sailex.ccnaexams_backend.database;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import me.sailex.ccnaexams_backend.config.DatabaseConfiguration;
import me.sailex.ccnaexams_backend.model.UserAnswer;
import me.sailex.ccnaexams_backend.rest.QuestionRestController;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class QuestionCollection {

    @Autowired
    private DatabaseConfiguration databaseConfiguration;

    private Database database;
    private final Logger log =
            LoggerFactory.getLogger(QuestionRestController.class);

    public CompletableFuture<List<Document>> getQuestion(String moduleId, String questionId) {
        CompletableFuture<List<Document>> future = new CompletableFuture<>();
        Document question = getCollection()
                .find(Filters.and(Filters.eq("module", moduleId), Filters.eq("number", questionId)))
                .projection(Projections.excludeId())
                .first();
        if (question == null || question.isEmpty()) {
            future.complete(new ArrayList<>());
            log.warn("Question " + moduleId + " / " + questionId + " could not be found");
            return future;
        }
        future.complete(Collections.singletonList(question));
        log.info("GET : question " + questionId +  " of module " + moduleId);
        return future;
    }

    public CompletableFuture<List<Document>> getDetail(String moduleId) {
        CompletableFuture<List<Document>> future = new CompletableFuture<>();
        Document detail = getCollection()
                .find(Filters.and(Filters.eq("module", moduleId), Filters.eq("type", "detail")))
                .projection(Projections.exclude("module", "type", "_id"))
                .first();
        if (detail == null || detail.isEmpty()) {
            future.complete(new ArrayList<>());
            log.warn("Detail of " + moduleId + " could not be found");
            return future;
        }
        future.complete(Collections.singletonList(detail));
        log.info("GET : detail of module " + moduleId);
        return future;
    }

    public CompletableFuture<List<UserAnswer>> getAnswers(String moduleId) {
        CompletableFuture<List<UserAnswer>> future = new CompletableFuture<>();
        List<UserAnswer> answers = new ArrayList<>();

        getCollection().find(Filters.and(Filters.eq("module", moduleId), Filters.nin("type", "detail")))
                .forEach(answer -> {
                    try {
                        answers.add(
                                new UserAnswer(
                                        answer.get("answer", Map.class),
                                        answer.getString("number")
                                )
                        );
                    } catch (ClassCastException e) {
                        log.error(e.getLocalizedMessage());
                    }
                });
        future.complete(answers);
        return future;
    }

    private MongoCollection<Document> getCollection() {
        return database.getMongoDatabase().getCollection(databaseConfiguration.getMongoCollection());
    }

    public void setDatabase(Database database) {
        this.database = database;
    }

}