package io.sailex.ccnaexams_backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "spring.data.mongodb")
public class DatabaseConfig {

    private String uri;

    private String database;

    private String collection;
}
