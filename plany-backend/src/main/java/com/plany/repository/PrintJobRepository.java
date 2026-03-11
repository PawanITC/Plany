package com.plany.repository;

import com.plany.entity.PrintJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrintJobRepository extends JpaRepository<PrintJob, Long> {
    List<PrintJob> findByCompanyId(Long companyId);
    List<PrintJob> findByStatus(String status);
}
