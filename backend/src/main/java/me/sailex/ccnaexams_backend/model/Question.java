package me.sailex.ccnaexams_backend.model;

import java.util.List;

public record Question(String module, String question, String number, List<String> options,
                       List<String> answer, String explanation, String type, String image) {}
