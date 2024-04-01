package com.adtFinalProject.teachMetrics.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adtFinalProject.teachMetrics.model.SelectModel;
import com.adtFinalProject.teachMetrics.service.RecruitService;

@RestController
@RequestMapping("/rest/api")
public class RecruitController {
	
	@Autowired
	private RecruitService recruitService;
	
	@GetMapping("/fetchCandidates")
	public HashMap<String, Object> fetchCandidates() {
		return recruitService.fetchCandidates();
	}
	
	@PostMapping("/selectCandidate")
	public HashMap<String, Object> selectCandidate(@RequestBody SelectModel sm) {
		return recruitService.selectCandidate(sm);
	}
	
	@GetMapping("/fetchUserStatus")
	public HashMap<String, Object> fetchUserStatus(@RequestParam String emailId) {
		return recruitService.fetchUserStatus(emailId);
	}
}
