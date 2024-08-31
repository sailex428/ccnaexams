package io.sailex.ccnaexams_backend.result;

import io.sailex.ccnaexams_backend.database.QuestionCollection;
import io.sailex.ccnaexams_backend.model.UserAnswer;
import io.sailex.ccnaexams_backend.rest.QuestionController;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Setter
@Service
public class ResultManager {

    private static final Logger log = LoggerFactory.getLogger(QuestionController.class);

    private QuestionCollection collection;

    public CompletableFuture<List<Integer>> getResult(List<UserAnswer> userAnswers, String moduleId) {
        CompletableFuture<List<Integer>> future = new CompletableFuture<>();
        int rightAnswers = 0;
        boolean isLangNotNull = false;

        try {
            List<UserAnswer> answersList = collection.getAnswers(moduleId).get();
            for (UserAnswer userAnswer : userAnswers) {
                UserAnswer correctAnswer = answersList.get(Integer.parseInt(userAnswer.number()) - 1);

                if (correctAnswer.answer().get("de") != null && userAnswer.answer().get("de") != null) {
                    isLangNotNull = true;
                    Collections.sort(correctAnswer.answer().get("de"));
                    Collections.sort(userAnswer.answer().get("de"));
                }
                if (correctAnswer.answer().get("en") != null && userAnswer.answer().get("en") != null) {
                    isLangNotNull = true;
                    Collections.sort(correctAnswer.answer().get("en"));
                    Collections.sort(userAnswer.answer().get("en"));
                }

                if (isLangNotNull) {
                    if (correctAnswer.answer().get("de").equals(userAnswer.answer().get("de"))
                            || correctAnswer.answer().get("en").equals(userAnswer.answer().get("en"))) {
                        rightAnswers += 1;
                    }
                }
            }

        } catch (Exception e) {
            log.error("POST : result processing failed : {}", e.getLocalizedMessage());
            future.complete(new ArrayList<>());
            return future;
        }
        future.complete(Collections.singletonList(rightAnswers));
        log.info("POST : result {}", userAnswers);
        return future;
    }
}
