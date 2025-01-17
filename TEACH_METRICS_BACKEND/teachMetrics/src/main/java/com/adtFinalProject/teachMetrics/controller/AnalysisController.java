package com.adtFinalProject.teachMetrics.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adtFinalProject.teachMetrics.service.AnalysisService;

@RestController
@RequestMapping("/rest/api")
public class AnalysisController {

	@Autowired
	private AnalysisService analysisService;
	
	@GetMapping("/fetchResults")
	public HashMap<String, Object> fetchResults() {
		return analysisService.fetchResults();
	}
	
	@GetMapping("/fetchRecruitStatus")
	public HashMap<String, Object> fetchRecruitStatus() {
		return analysisService.fetchRecruitStatus();
	}
}
