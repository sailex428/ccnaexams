package me.sailex.ccnaexams_backend.rest;

import me.sailex.ccnaexams_backend.model.Answer;
import me.sailex.ccnaexams_backend.model.Detail;
import me.sailex.ccnaexams_backend.model.Question;
import me.sailex.ccnaexams_backend.database.QuestionCollection;
import me.sailex.ccnaexams_backend.result.ResultManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class QuestionRestController {

    private QuestionCollection collection;
    private ResultManager resultManager;

    @GetMapping("/api/{moduleId}")
    public ResponseEntity<List<Question>> getQuestions(@PathVariable String moduleId) {
        try {
            return new ResponseEntity<>(collection.getQuestions(moduleId).get(), HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/{moduleId}/{questionId}")
    public ResponseEntity<List<Question>> getQuestion(@PathVariable String moduleId, @PathVariable String questionId) {
        try {
            return new ResponseEntity<>(collection.getQuestion(moduleId, questionId).get(), HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/{moduleId}/detail")
    public ResponseEntity<List<Detail>> getDetail(@PathVariable String moduleId) {
        try {
            return new ResponseEntity<>(collection.getDetail(moduleId).get(), HttpStatus.OK);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/api/{moduleId}/result", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Integer>> postResult(@PathVariable String moduleId, @RequestBody List<Answer> userAnswer) {
        try {
            return new ResponseEntity<>(resultManager.getResult(userAnswer, moduleId).get(), HttpStatus.CREATED);
        } catch (InterruptedException | ExecutionException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void setCollection(QuestionCollection collection) {
        this.collection = collection;
    }

    public void setResultManager(ResultManager resultManager) {
        this.resultManager = resultManager;
    }

}
