package com.adtFinalProject.teachMetrics.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adtFinalProject.teachMetrics.model.ResponsesModel;
import com.adtFinalProject.teachMetrics.service.AssessmentsService;

@RestController
@RequestMapping("/rest/api")
public class AssessmentsController {
	
	@Autowired
	private AssessmentsService assessmentsService;
	
	@GetMapping("/fetchAssessment")
	public HashMap<String, Object> fetchAssessment() {
		return assessmentsService.fetchAssessment();
	}
	
	@PostMapping("/submitAssessment")
	public HashMap<String, Object> submitAssessment(@RequestBody List<ResponsesModel> rm) {
		return assessmentsService.submitAssessment(rm);
	}
}
