package com.adtFinalProject.teachMetrics.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.adtFinalProject.teachMetrics.model.FetchUserModel;
import com.adtFinalProject.teachMetrics.service.FileStorageService;

@RestController
@RequestMapping("/rest/api")
public class FileController {
	
	@Autowired
	private final FileStorageService fileStorageService;

    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public HashMap<String, Object> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("eId") String emailId) {
        return fileStorageService.storeFile(file, emailId);
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
        return fileStorageService.downloadFile(fileId);
    }
}
