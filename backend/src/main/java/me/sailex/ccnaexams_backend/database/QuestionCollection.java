package me.sailex.ccnaexams_backend.database;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import me.sailex.ccnaexams_backend.Question;
import me.sailex.ccnaexams_backend.rest.QuestionRestController;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class QuestionCollection {

    private Database database;
    private final Logger log =
            LoggerFactory.getLogger(QuestionRestController.class);

    public CompletableFuture<List<Question>> getQuestions(String moduleId) {
        CompletableFuture<List<Question>> future = new CompletableFuture<>();
        List<Question> questions = new ArrayList<>();

        getCollection().find(Filters.eq("module", moduleId)).forEach(question -> {
            if (question == null || question.isEmpty()) {
                future.complete(null);
                log.warn("Question is empty");
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

        Document question = getCollection().find(Filters.eq("number", questionId)).first();
        if (question == null || question.isEmpty()) {
            future.complete(null);
            log.warn("Question " + moduleId + " / " + questionId + " is empty");
            return future;
        };
        future.complete(Collections.singletonList(convertDocumentToQuestion(question)));
        log.info("GET : question " + questionId +  " of module " + moduleId);
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

    private MongoCollection<Document> getCollection() {
        return database.getMongoDatabase().getCollection("moduletest");
    }

    public void setDatabase(Database database) {
        this.database = database;
    }

}
