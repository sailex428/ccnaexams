package io.sailex.ccnaexams_backend.model;

import java.util.List;

public record Result(List<Answer> answers, String rightAnswersCount) {}
