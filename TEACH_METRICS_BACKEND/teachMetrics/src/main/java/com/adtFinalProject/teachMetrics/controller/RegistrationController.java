package com.adtFinalProject.teachMetrics.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adtFinalProject.teachMetrics.model.profileModel;
import com.adtFinalProject.teachMetrics.model.userModel;
import com.adtFinalProject.teachMetrics.repository.userRepository;
import com.adtFinalProject.teachMetrics.service.RegistrationService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/rest/api")
public class RegistrationController {
	
	@Autowired
	private RegistrationService service;
	@Autowired
	private userRepository repo;
	
	//@EventListener(ApplicationReadyEvent.class)
	/*@GetMapping("/sendEmail")
	public void triggerMail() throws MessagingException {
		service.sendSimpleEmail("teachmetrics@gmail.com",
				"This is email body",
				"This is email subject");

	}*/
	
	@PostMapping("/register")
	public HashMap<String, Object> register(@RequestBody userModel um) {
		return service.register(um);
	}
	
	@PostMapping("/login")
	public HashMap<String, Object> login(@RequestBody userModel um) {
		return service.login(um);
	}
	
	@PostMapping("/gen")
	public HashMap<String, Object> generateTTLCode(@RequestBody userModel um) {
		return service.generateTTLCode(um);
	}
	
	@PostMapping("/verify")
	public HashMap<String, Object> verifyTTLCode(@RequestBody userModel um) {
		return service.verifyTTLCode(um);
	}
	
	@PostMapping("/submitProfile")
	public HashMap<String, Object> submitProfile(@RequestBody profileModel pm) {
		return service.submitProfile(pm);
	}
	
	@GetMapping("/fetchProfile")
	public HashMap<String, Object> fetchProfile(@RequestParam String emailId) {
		return service.fetchProfile(emailId);
	}
	
	@PostMapping("/updateProfile")
	public HashMap<String, Object> updateProfile(@RequestBody profileModel pm) {
		return service.updateProfile(pm);
	}
	
	@GetMapping("/viewDocuments")
	public HashMap<String, Object> viewDocuments(@RequestParam String emailId) {
		return service.viewDocuments(emailId);
	}
}
