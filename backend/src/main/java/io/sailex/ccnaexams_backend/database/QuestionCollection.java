package io.sailex.ccnaexams_backend.database;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import io.sailex.ccnaexams_backend.config.DatabaseConfig;
import io.sailex.ccnaexams_backend.model.Answer;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import lombok.Setter;
import org.bson.Document;
import org.springframework.stereotype.Service;

@Setter
@Service
public class QuestionCollection {

    private Database database;

    private DatabaseConfig databaseConfig;

    public CompletableFuture<List<Document>> getQuestion(String moduleId, String questionId) {
        CompletableFuture<List<Document>> future = new CompletableFuture<>();
        List<Document> question = new ArrayList<>();
        question.add(
                this.getCollection()
                        .find(
                                Filters.and(
                                        Filters.eq(Fields.MODULE, moduleId), Filters.eq(Fields.NUMBER, questionId)))
                        .projection(Projections.exclude(Fields.ANSWER, Fields._ID))
                        .first());
        future.complete(question);
        return future;
    }

    public CompletableFuture<List<Document>> getDetail(String moduleId) {
        CompletableFuture<List<Document>> future = new CompletableFuture<>();
        List<Document> detail = new ArrayList<>();
        detail.add(
                this.getCollection()
                        .find(
                                Filters.and(
                                        Filters.eq(Fields.MODULE, moduleId), Filters.eq(Fields.TYPE, Fields.DETAIL)))
                        .projection(Projections.exclude(Fields.MODULE, Fields.TYPE, Fields._ID))
                        .first());
        future.complete(detail);
        return future;
    }

    public CompletableFuture<List<Answer>> getAnswers(String moduleId) {
        CompletableFuture<List<Answer>> future = new CompletableFuture<>();
        List<Answer> answers = new ArrayList<>();
        this.getCollection()
                .find(
                        Filters.and(
                                Filters.eq(Fields.MODULE, moduleId), Filters.nin(Fields.TYPE, Fields.DETAIL)))
                .projection(Projections.include(Fields.ANSWER, Fields.NUMBER))
                .forEach(answerObject -> answers.add(createAnswerObject(answerObject)));
        future.complete(answers);
        return future;
    }

    private Answer createAnswerObject(Document answerObject) {
        return new Answer(
                (List<String>) answerObject.get(Fields.ANSWER), answerObject.getString(Fields.NUMBER));
    }

    private MongoCollection<Document> getCollection() {
        return database.getMongoDatabase().getCollection(databaseConfig.getCollection());
    }
}
