package com.adtFinalProject.teachMetrics.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "c_userttl")
public class userTTLCodeModel {

	@Id
	private String id;
	private String userId;
	private String emailId;
	
	@Indexed(expireAfterSeconds = 60)
	@CreatedDate
    private LocalDateTime createdAt;
	private int randToken;
	
    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public int getRandToken() {
		return randToken;
	}

	public void setRandToken(int randToken) {
		this.randToken = randToken;
	}

//	public userTTLCodeModel(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
}
