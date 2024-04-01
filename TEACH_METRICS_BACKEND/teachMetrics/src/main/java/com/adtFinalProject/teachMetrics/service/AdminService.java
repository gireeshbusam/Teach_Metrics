package com.adtFinalProject.teachMetrics.service;

import java.util.HashMap;

import com.adtFinalProject.teachMetrics.model.ARModel;

public interface AdminService {
	public HashMap<String, Object> getUserProfile();
	public HashMap<String, Object> approveReject(ARModel arm);
}
