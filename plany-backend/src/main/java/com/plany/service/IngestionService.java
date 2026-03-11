package com.plany.service;

public interface IngestionService {
    
    /**
     * Triggers a scraping run for a given council.
     * @param councilId The ID of the council to scrape
     * @return A run ID or status string indicating the scraping has started
     */
    String triggerScrape(Long councilId);

    /**
     * Fetches the results of a specific scraping run and saves them to the database.
     * @param runId The ID of the scraping run
     * @param councilId The ID of the council the run belongs to
     * @return Number of listings saved
     */
    int processScrapeResults(String runId, Long councilId);
}
