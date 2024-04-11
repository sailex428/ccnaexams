package me.sailex.ccnaexams_backend.model;

import java.util.List;
import java.util.Map;

public record UserAnswer(Map<String, List<String>> answer, String number) {}
