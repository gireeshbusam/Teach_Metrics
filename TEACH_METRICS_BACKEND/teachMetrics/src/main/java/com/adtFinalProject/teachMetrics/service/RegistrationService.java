package com.adtFinalProject.teachMetrics.service;

import java.util.HashMap;

import com.adtFinalProject.teachMetrics.model.counterModel;
import com.adtFinalProject.teachMetrics.model.profileModel;
import com.adtFinalProject.teachMetrics.model.userModel;

public interface RegistrationService {
		
	public void sendSimpleEmail(String toEmail, String subject, String body);
	
	public HashMap<String, Object> register(userModel um);
	
	public HashMap<String, Object> login(userModel um);
	
	public HashMap<String, Object> generateTTLCode(userModel um);
	
	public HashMap<String, Object> verifyTTLCode(userModel um);
	
	public counterModel counter();
	
	public HashMap<String, Object> submitProfile(profileModel pm);
	
	public HashMap<String, Object> fetchProfile(String emailId);
	
	public HashMap<String, Object> updateProfile(profileModel pm);
	
	public HashMap<String, Object> viewDocuments(String emailId);
	
}
