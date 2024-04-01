package com.adtFinalProject.teachMetrics.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.adtFinalProject.teachMetrics.model.userModel;

public interface userRepository extends MongoRepository<userModel, String> {

}
