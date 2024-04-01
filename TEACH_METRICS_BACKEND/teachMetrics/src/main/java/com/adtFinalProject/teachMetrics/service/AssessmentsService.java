package com.adtFinalProject.teachMetrics.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import com.adtFinalProject.teachMetrics.model.ResponsesModel;

public interface AssessmentsService {
	public HashMap<String, Object> fetchAssessment();
	public HashMap<String, Object> submitAssessment(List<ResponsesModel> rm);
}
