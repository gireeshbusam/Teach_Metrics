package com.adtFinalProject.teachMetrics.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.adtFinalProject.teachMetrics.model.userTTLCodeModel;

public interface userTTLCodeRepository extends MongoRepository<userTTLCodeModel, String> {

	@Query("{'userId': ?0, 'emailId': ?1}")
	userTTLCodeModel genTTLCode(String userId, String emailId);
}
