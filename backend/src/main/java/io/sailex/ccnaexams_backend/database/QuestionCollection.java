package io.sailex.ccnaexams_backend.database;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import io.sailex.ccnaexams_backend.config.DatabaseConfig;
import io.sailex.ccnaexams_backend.model.UserAnswer;
import io.sailex.ccnaexams_backend.rest.QuestionController;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import lombok.Setter;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Setter
@Service
public class QuestionCollection {

    private static final Logger LOGGER = LoggerFactory.getLogger(QuestionController.class);

    private Database database;

    private DatabaseConfig databaseConfig;

    public CompletableFuture<List<Document>> getQuestion(String moduleId, String questionId) {
        CompletableFuture<List<Document>> future = new CompletableFuture<>();
        Document question =
                getCollection()
                        .find(Filters.and(Filters.eq("module", moduleId), Filters.eq("number", questionId)))
                        .projection(Projections.excludeId())
                        .first();
        if (question == null || question.isEmpty()) {
            future.complete(new ArrayList<>());
            LOGGER.warn("Question {} / {} could not be found", moduleId, questionId);
            return future;
        }
        future.complete(Collections.singletonList(question));
        LOGGER.info("GET : question {} of module {}", questionId, moduleId);
        return future;
    }

    public CompletableFuture<List<Document>> getDetail(String moduleId) {
        CompletableFuture<List<Document>> future = new CompletableFuture<>();
        Document detail =
                getCollection()
                        .find(Filters.and(Filters.eq("module", moduleId), Filters.eq("type", "detail")))
                        .projection(Projections.exclude("module", "type", "_id"))
                        .first();
        if (detail == null || detail.isEmpty()) {
            future.complete(new ArrayList<>());
            LOGGER.warn("Detail of {} could not be found", moduleId);
            return future;
        }
        future.complete(Collections.singletonList(detail));
        LOGGER.info("GET : detail of module {}", moduleId);
        return future;
    }

    public CompletableFuture<List<UserAnswer>> getAnswers(String moduleId) {
        CompletableFuture<List<UserAnswer>> future = new CompletableFuture<>();
        List<UserAnswer> answers = new ArrayList<>();

        getCollection()
                .find(Filters.and(Filters.eq("module", moduleId), Filters.nin("type", "detail")))
                .forEach(
                        answer -> {
                            try {
                                answers.add(
                                        new UserAnswer(answer.get("answer", Map.class), answer.getString("number")));
                            } catch (ClassCastException e) {
                                LOGGER.error(e.getLocalizedMessage());
                            }
                        });
        future.complete(answers);
        return future;
    }

    private MongoCollection<Document> getCollection() {
        return database.getMongoDatabase().getCollection(databaseConfig.getCollection());
    }
}
