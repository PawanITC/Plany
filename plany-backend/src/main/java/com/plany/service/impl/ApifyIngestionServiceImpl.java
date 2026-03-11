package com.plany.service.impl;

import com.plany.config.ApifyProperties;
import com.plany.entity.Council;
import com.plany.entity.Listing;
import com.plany.repository.CouncilRepository;
import com.plany.repository.ListingRepository;
import com.plany.service.IngestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApifyIngestionServiceImpl implements IngestionService {

    private final RestTemplate restTemplate;
    private final ApifyProperties apifyProperties;
    private final CouncilRepository councilRepository;
    private final ListingRepository listingRepository;

    private static final String APIFY_API_BASE_URL = "https://api.apify.com/v2";

    @Override
    public String triggerScrape(Long councilId) {
        Optional<Council> councilOpt = councilRepository.findById(councilId);
        if (councilOpt.isEmpty()) {
            throw new IllegalArgumentException("Council not found with ID: " + councilId);
        }

        log.info("Triggering Apify scraper for council: {}", councilOpt.get().getName());

        String url = APIFY_API_BASE_URL + "/acts/" + apifyProperties.getActorId() + "/runs?token=" + apifyProperties.getApiToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = "{\"councilName\": \"" + councilOpt.get().getName() + "\"}";
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                if (body.containsKey("data")) {
                    Map<String, Object> data = (Map<String, Object>) body.get("data");
                    String runId = (String) data.get("id");
                    log.info("Successfully triggered Apify run ID: {}", runId);
                    return runId;
                }
            }
            log.error("Failed to trigger Apify scraper: {}", response.getStatusCode());
            return "FAILED";
        } catch (Exception e) {
            log.error("Exception calling Apify API via RestTemplate: {}", e.getMessage());
            if ("dummy-token-for-local-dev".equals(apifyProperties.getApiToken())) {
                log.warn("Using dummy token, simulating run ID.");
                return "simulated-run-12345";
            }
            throw new RuntimeException("Error starting Apify actor", e);
        }
    }

    @Override
    public int processScrapeResults(String runId, Long councilId) {
        log.info("Fetching Apify dataset results for run ID: {}", runId);

        Optional<Council> councilOpt = councilRepository.findById(councilId);
        if (councilOpt.isEmpty()) {
            throw new IllegalArgumentException("Council not found with ID: " + councilId);
        }
        Council council = councilOpt.get();

        int savedCount = 0;

        if ("simulated-run-12345".equals(runId) || "dummy-token-for-local-dev".equals(apifyProperties.getApiToken())) {
            log.info("Simulating dummy dataset results for local development...");
            Listing dummy = new Listing();
            dummy.setCouncil(council);
            dummy.setReferenceNumber("API-" + System.currentTimeMillis());
            dummy.setAddress("Apify Mock Generated Address, " + council.getName());
            dummy.setDescription("Simulated scraped planning application testing Apify service.");
            dummy.setStatus("Under Consultation");
            dummy.setDecisionDate(LocalDate.now());
            if (!listingRepository.existsByReferenceNumber(dummy.getReferenceNumber())) {
                listingRepository.save(dummy);
            }
            return 1;
        }

        String url = APIFY_API_BASE_URL + "/actor-runs/" + runId + "/dataset/items?token=" + apifyProperties.getApiToken();

        try {
            ResponseEntity<Map[]> response = restTemplate.getForEntity(url, Map[].class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map[] items = response.getBody();
                for (Map<String, Object> item : items) {
                    Listing listing = new Listing();
                    listing.setCouncil(council);
                    
                    listing.setReferenceNumber(getTextNode(item, "reference_number"));
                    listing.setAddress(getTextNode(item, "address"));
                    listing.setDescription(getTextNode(item, "description"));
                    listing.setStatus(getTextNode(item, "status"));
                    
                    String dateStr = getTextNode(item, "received_date");
                    if (dateStr != null && !dateStr.isEmpty()) {
                        try {
                            listing.setDecisionDate(LocalDate.parse(dateStr, DateTimeFormatter.ISO_DATE));
                        } catch (Exception e) {
                            log.warn("Failed to parse date for listing {}", listing.getReferenceNumber());
                        }
                    }

                    if (listing.getReferenceNumber() != null && !listingRepository.existsByReferenceNumber(listing.getReferenceNumber())) {
                        listingRepository.save(listing);
                        savedCount++;
                    }
                }
                log.info("Successfully processed and saved {} new listings from Apify run {}", savedCount, runId);
            }
        } catch (Exception e) {
            log.error("Failed to fetch Apify dataset: {}", e.getMessage());
            throw new RuntimeException("Error fetching Apify dataset format", e);
        }

        return savedCount;
    }

    private String getTextNode(Map<String, Object> map, String fieldName) {
        Object val = map.get(fieldName);
        return val != null ? val.toString() : null;
    }
}
