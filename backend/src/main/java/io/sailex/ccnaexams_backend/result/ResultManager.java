package io.sailex.ccnaexams_backend.result;

import io.sailex.ccnaexams_backend.model.Answer;
import io.sailex.ccnaexams_backend.model.Result;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Setter
@Service
public class ResultManager {

    private int rightAnswerCount;

    public CompletableFuture<Result> getResult(List<Answer> rightAnswers, List<Answer> userAnswers) {
        CompletableFuture<Result> future = new CompletableFuture<>();

        rightAnswerCount = 0;

        for (Answer userAnswer : userAnswers) {
            Optional<Answer> currentRightAnswer =
                    rightAnswers.stream()
                            .filter(answer -> answer.number().equals(userAnswer.number()))
                            .findFirst();

            if (currentRightAnswer.isEmpty()) {
                continue;
            }
            validateAnswer(currentRightAnswer.get(), userAnswer);
        }
        future.complete(new Result(rightAnswers, String.valueOf(rightAnswerCount)));
        return future;
    }

    private void validateAnswer(Answer currentRightAnswer, Answer userAnswer) {
        Collections.sort(currentRightAnswer.answer());
        Collections.sort(userAnswer.answer());

        if (currentRightAnswer.answer().equals(userAnswer.answer())) {
            rightAnswerCount++;
        }
    }
}
