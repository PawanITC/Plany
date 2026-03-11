package com.plany.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "apify")
public class ApifyProperties {
    private String apiToken;
    private String actorId;
}
