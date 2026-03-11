package com.plany.controller;

import com.plany.entity.Listing;
import com.plany.service.IngestionService;
import com.plany.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;
    private final IngestionService ingestionService;

    @GetMapping
    public ResponseEntity<List<Listing>> searchListings(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) List<String> status,
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate,
            @RequestParam(required = false) List<Long> councils) {
        
        if (status != null && !status.isEmpty()) {
            return ResponseEntity.ok(listingService.getListingsByStatus(status.get(0)));
        }
        return ResponseEntity.ok(listingService.getAllListings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListingById(@PathVariable Long id) {
        return listingService.getListingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/print")
    public ResponseEntity<?> printListings(@RequestBody Map<String, List<Long>> request) {
        List<Long> listingIds = request.get("listing_ids");
        if (listingIds == null || listingIds.isEmpty()) {
            return ResponseEntity.badRequest().body("No listing_ids provided");
        }
        return ResponseEntity.ok(Map.of("message", "Successfully queued for printing", "count", listingIds.size()));
    }

    @PostMapping("/scrape/trigger/{councilId}")
    public ResponseEntity<?> triggerScrape(@PathVariable Long councilId) {
        try {
            String runId = ingestionService.triggerScrape(councilId);
            return ResponseEntity.ok(Map.of("message", "Scrape triggered successfully", "runId", runId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/scrape/process/{councilId}/{runId}")
    public ResponseEntity<?> processScrapeResults(@PathVariable Long councilId, @PathVariable String runId) {
        try {
            int saved = ingestionService.processScrapeResults(runId, councilId);
            return ResponseEntity.ok(Map.of("message", "Dataset processed successfully", "savedListings", saved));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
