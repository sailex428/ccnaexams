package io.sailex.ccnaexams_backend.rest;

import io.sailex.ccnaexams_backend.database.QuestionCollection;
import io.sailex.ccnaexams_backend.model.Answer;
import io.sailex.ccnaexams_backend.model.Result;
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
@RequestMapping(value = "/api")
public class QuestionController {

    private QuestionCollection collection;
    private ResultManager resultManager;

    @CrossOrigin
    @GetMapping(value = "/question/{moduleId}/{questionId}")
    public ResponseEntity<List<Document>> getQuestion(
            @PathVariable("moduleId") String moduleId, @PathVariable("questionId") String questionId) {
        try {
            return new ResponseEntity<>(
                    collection.getQuestion(moduleId, questionId).get(), HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @GetMapping(value = "/detail/{moduleId}")
    public ResponseEntity<List<Document>> getDetail(@PathVariable("moduleId") String moduleId) {
        try {
            return new ResponseEntity<>(collection.getDetail(moduleId).get(), HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @PostMapping(value = "/result/{moduleId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Result> postAnswers(
            @PathVariable("moduleId") String moduleId, @RequestBody List<Answer> answer) {
        try {
            return new ResponseEntity<>(
                    resultManager.getResult(collection.getAnswers(moduleId).get(), answer).get(),
                    HttpStatus.CREATED);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
