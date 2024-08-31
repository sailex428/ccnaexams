package io.sailex.ccnaexams_backend.rest;

import io.sailex.ccnaexams_backend.database.QuestionCollection;
import io.sailex.ccnaexams_backend.model.UserAnswer;
import io.sailex.ccnaexams_backend.result.ResultManager;
import java.util.List;
import java.util.concurrent.ExecutionException;
import lombok.Setter;
import org.bson.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Setter
@RestController
@RequestMapping("/api")
public class QuestionController {

    private QuestionCollection collection;
    private ResultManager resultManager;

    @GetMapping(value = "/{moduleId}/{questionId}")
    public ResponseEntity<List<Document>> getQuestion(
            @PathVariable String moduleId, @PathVariable String questionId) {
        try {
            return new ResponseEntity<>(
                    collection.getQuestion(moduleId, questionId).get(), HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{moduleId}/detail")
    public ResponseEntity<List<Document>> getDetail(@PathVariable String moduleId) {
        try {
            return new ResponseEntity<>(collection.getDetail(moduleId).get(), HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/{moduleId}/result", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Integer>> postResult(
            @PathVariable String moduleId, @RequestBody List<UserAnswer> userAnswer) {
        try {
            return new ResponseEntity<>(
                    resultManager.getResult(userAnswer, moduleId).get(), HttpStatus.CREATED);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
