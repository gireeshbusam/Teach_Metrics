package com.adtFinalProject.teachMetrics.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adtFinalProject.teachMetrics.model.ARModel;
import com.adtFinalProject.teachMetrics.service.AdminService;

@RestController
@RequestMapping("/rest/api")
public class AdminController {

		@Autowired
		private AdminService adminService;
		
		@GetMapping("/getUserProfile")
		public HashMap<String, Object> getUserProfile() {
				return adminService.getUserProfile();
		}
		
		@PostMapping("/approveReject")
		public HashMap<String, Object> approveReject(@RequestBody ARModel arm) {
			return adminService.approveReject(arm);
		}
}
