package me.sailex.ccnaexams_backend.result;

import me.sailex.ccnaexams_backend.database.QuestionCollection;
import me.sailex.ccnaexams_backend.model.Answer;
import me.sailex.ccnaexams_backend.rest.QuestionRestController;

import java.util.*;
import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ResultManager {

    private QuestionCollection collection;

    private final Logger log =
            LoggerFactory.getLogger(QuestionRestController.class);

    public CompletableFuture<List<Integer>> getResult(List<Answer> userAnswers, String moduleId) {
        CompletableFuture<List<Integer>> future = new CompletableFuture<>();
        int rightAnswers = 0;

        try {
            Map<String, List<String>> answersMap = collection.getAnswers(moduleId).get();
            for (Answer answer : userAnswers) {
                List<String> correctAnswer = answersMap.get(answer.number());
                Collections.sort(correctAnswer);
                Collections.sort(answer.answers());
                if (correctAnswer.equals(answer.answers())) {
                    rightAnswers += 1;
                }
            }

        } catch (Exception e) {
            log.error("PUT : result processing failed : " + e.getLocalizedMessage());
            future.complete(new ArrayList<>());
            return future;
        }
        future.complete(Collections.singletonList(rightAnswers));
        log.info("PUT : result " + userAnswers);
        return future;
    }

    public void setCollection(QuestionCollection collection) {
        this.collection = collection;
    }

}