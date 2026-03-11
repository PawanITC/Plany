package com.plany.controller;

import com.plany.entity.Council;
import com.plany.repository.CouncilRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/councils")
@RequiredArgsConstructor
public class CouncilController {

    private final CouncilRepository councilRepository;

    @GetMapping
    public ResponseEntity<List<Council>> getCouncils() {
        return ResponseEntity.ok(councilRepository.findAll());
    }
}
