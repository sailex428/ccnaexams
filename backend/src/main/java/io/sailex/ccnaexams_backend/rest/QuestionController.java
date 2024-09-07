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
@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class QuestionController {

    private QuestionCollection collection;
    private ResultManager resultManager;

    @GetMapping(value = "/question/{examId}/{moduleId}/{questionId}")
    public ResponseEntity<List<Document>> getQuestion(
            @PathVariable("examId") String examId,
            @PathVariable("moduleId") String moduleId,
            @PathVariable("questionId") String questionId) {
        try {
            return new ResponseEntity<>(
                    collection.getQuestion(examId, moduleId, questionId).get(), HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/detail/{examId}/{moduleId}")
    public ResponseEntity<List<Document>> getDetail(
            @PathVariable("examId") String examId, @PathVariable("moduleId") String moduleId) {
        try {
            return new ResponseEntity<>(collection.getDetail(examId, moduleId).get(), HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/detail/{examId}")
    public ResponseEntity<List<Document>> getDetail(@PathVariable("examId") String examId) {
        try {
            return new ResponseEntity<>(collection.getDetail(examId, null).get(), HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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
