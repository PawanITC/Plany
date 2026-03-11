package com.plany.repository;

import com.plany.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
    Optional<Listing> findByCouncilIdAndReferenceNumber(Long councilId, String referenceNumber);
    List<Listing> findByStatus(String status);
}
