package com.plany.repository;

import com.plany.entity.Council;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CouncilRepository extends JpaRepository<Council, Long> {
    Optional<Council> findByName(String name);
}
