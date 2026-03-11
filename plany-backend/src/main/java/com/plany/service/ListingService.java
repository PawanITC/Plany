package com.plany.service;

import com.plany.entity.Listing;
import com.plany.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;

    public List<Listing> getAllListings() {
        return listingRepository.findAll();
    }

    public Optional<Listing> getListingById(Long id) {
        return listingRepository.findById(id);
    }
    
    public List<Listing> getListingsByStatus(String status) {
        return listingRepository.findByStatus(status);
    }

    public Listing saveListing(Listing listing) {
        return listingRepository.save(listing);
    }
}
