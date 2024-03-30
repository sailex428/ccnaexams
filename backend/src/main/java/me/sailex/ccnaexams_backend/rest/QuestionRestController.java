package me.sailex.ccnaexams_backend.rest;

import me.sailex.ccnaexams_backend.model.Question;
import me.sailex.ccnaexams_backend.database.QuestionCollection;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class QuestionRestController {

    private QuestionCollection collection;

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

    public void setCollection(QuestionCollection collection) {
        this.collection = collection;
    }

}
