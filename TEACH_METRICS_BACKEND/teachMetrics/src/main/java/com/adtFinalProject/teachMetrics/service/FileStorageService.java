package com.adtFinalProject.teachMetrics.service;

import java.util.HashMap;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.adtFinalProject.teachMetrics.model.FetchUserModel;

public interface FileStorageService {
	public HashMap<String, Object> storeFile(MultipartFile file, String emailId);
	public ResponseEntity<Resource> downloadFile(String fileId);
}
