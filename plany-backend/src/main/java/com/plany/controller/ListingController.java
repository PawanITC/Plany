package com.plany.controller;

import com.plany.entity.Listing;
import com.plany.entity.PrintJob;
import com.plany.service.ListingService;
import com.plany.service.PrintJobService;
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
    private final PrintJobService printJobService;

    @GetMapping
    public ResponseEntity<List<Listing>> searchListings(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) List<String> status,
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate,
            @RequestParam(required = false) List<Long> councils) {
        
        // Detailed querying would be handled in Service/Repository via CriteriaBuilder or JPA Specifications
        // For scaffold, returning all or simple filter
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
        
        // In a real scenario, fetch the current logged-in company context
        // and link each print job to that company. 
        // We'll scaffold a loop calling PrintJobService.
        
        // Mock response
        return ResponseEntity.ok(Map.of("message", "Successfully queued for printing", "count", listingIds.size()));
    }
}
