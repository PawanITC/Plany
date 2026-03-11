package com.plany.service;

import com.plany.entity.PrintJob;
import com.plany.repository.PrintJobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PrintJobService {

    private final PrintJobRepository printJobRepository;

    public List<PrintJob> getJobsByCompany(Long companyId) {
        return printJobRepository.findByCompanyId(companyId);
    }

    public PrintJob queuePrintJob(PrintJob job) {
        job.setStatus("QUEUED");
        return printJobRepository.save(job);
    }
}
