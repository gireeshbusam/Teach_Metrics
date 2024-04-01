package com.adtFinalProject.teachMetrics.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Component
public class DataAccessBase {
	
	@Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    protected MongoTemplate createMongoTemplate() {
        return new MongoTemplate(mongoClient(), getDatabaseName());
    }

    private MongoClient mongoClient() {
        return MongoClients.create(mongoUri);
    }

    private String getDatabaseName() {
        // Extract the database name from the URI or handle it based on your specific structure
        // Example: "mongodb://localhost:27017/your_database_name" => "your_database_name"
        return mongoUri.substring(mongoUri.lastIndexOf('/') + 1);
    }
}
