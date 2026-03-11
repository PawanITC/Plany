package com.plany.controller;

import com.plany.entity.LogEntry;
import com.plany.repository.LogEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/logs")
@RequiredArgsConstructor
public class LogController {

    private final LogEntryRepository logEntryRepository;

    @GetMapping
    public ResponseEntity<List<LogEntry>> getLogs() {
        // In real app, filter logs by current logged-in user/company context
        return ResponseEntity.ok(logEntryRepository.findAll());
    }
}
