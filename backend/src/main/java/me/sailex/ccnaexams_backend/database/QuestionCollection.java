package me.sailex.ccnaexams_backend.database;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import me.sailex.ccnaexams_backend.config.DatabaseConfiguration;
import me.sailex.ccnaexams_backend.model.Detail;
import me.sailex.ccnaexams_backend.model.Question;
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

    public CompletableFuture<List<Question>> getQuestions(String moduleId) {
        CompletableFuture<List<Question>> future = new CompletableFuture<>();
        List<Question> questions = new ArrayList<>();

        getCollection().find(Filters.eq("module", moduleId)).forEach(question -> {
            if (question == null || question.isEmpty()) {
                future.complete(new ArrayList<>());
                log.warn("Questions of module " + moduleId + " could not be found");
                return;
            }
            questions.add(convertDocumentToQuestion(question));
        });
        future.complete(questions);
        log.info("GET : questions of module " + moduleId);
        return future;
    }

    public CompletableFuture<List<Question>> getQuestion(String moduleId, String questionId) {
        CompletableFuture<List<Question>> future = new CompletableFuture<>();

        Document question = getCollection().find(Filters.and(Filters.eq("module", moduleId), Filters.eq("number", questionId))).first();
        if (question == null || question.isEmpty()) {
            future.complete(new ArrayList<>());
            log.warn("Question " + moduleId + " / " + questionId + " could not be found");
            return future;
        }
        future.complete(Collections.singletonList(convertDocumentToQuestion(question)));
        log.info("GET : question " + questionId +  " of module " + moduleId);
        return future;
    }

    public CompletableFuture<List<Detail>> getDetail(String moduleId) {
        CompletableFuture<List<Detail>> future = new CompletableFuture<>();

        Document detail = getCollection().find(Filters.and(Filters.eq("module", moduleId), Filters.eq("type", "detail"))).first();
        if (detail == null || detail.isEmpty()) {
            future.complete(new ArrayList<>());
            log.warn("Detail of " + moduleId + " could not be found");
            return future;
        }
        future.complete(Collections.singletonList(convertDocumentToDetail(detail)));
        log.info("GET : detail of module " + moduleId);
        return future;
    }

    public CompletableFuture<Map<String, List<String>>> getAnswers(String moduleId) {
        CompletableFuture<Map<String, List<String>>> future = new CompletableFuture<>();
        Map<String, List<String>> answers = new HashMap<>();

        getCollection().find(Filters.and(Filters.eq("module", moduleId), Filters.nin("type", "detail")))
            .forEach(question -> {
                try {
                    answers.put(
                            question.getString("number"),
                            question.getList("answer", String.class)
                    );
                } catch (ClassCastException e) {
                    log.error(e.getLocalizedMessage());
                }
        });
        future.complete(answers);
        return future;
    }

    private Question convertDocumentToQuestion(Document document) {
        Question question = null;
        try {
            question = new Question(
                    document.getString("module"),
                    document.getString("question"),
                    document.getString("number"),
                    document.getList("options", String.class),
                    document.getList("answer", String.class),
                    document.getString("explanation"),
                    document.getString("type"),
                    document.getString("img")
            );
        } catch (ClassCastException e) {
            log.error(e.getLocalizedMessage());
        }
        return question;
    }

    private Detail convertDocumentToDetail(Document document) {
        Detail detail = null;
        try {
            detail = new Detail(
                    document.getString("module"),
                    document.getString("type"),
                    document.getInteger("numberOfQuestions"),
                    document.getString("title")
            );
        } catch (ClassCastException e) {
            log.error(e.getLocalizedMessage());
        }
        return detail;
    }

    private MongoCollection<Document> getCollection() {
        return database.getMongoDatabase().getCollection(databaseConfiguration.getMongoCollection());
    }

    public void setDatabase(Database database) {
        this.database = database;
    }

}