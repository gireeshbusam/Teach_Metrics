package com.adtFinalProject.teachMetrics.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.adtFinalProject.teachMetrics.model.RecruitStatusModel;
import com.adtFinalProject.teachMetrics.model.ResultsModel;
import com.adtFinalProject.teachMetrics.model.profileModel;

@Service
public class AnalysisServiceImpl implements AnalysisService {

	@Autowired
    private MongoTemplate mongoTemplate;
	@Autowired
    private DataAccessBase dataAccessBase;
	
	public HashMap<String, Object> fetchResults() {
		HashMap<String, Object> response = new HashMap<String, Object>();
		
		MongoTemplate mongoTemplate = dataAccessBase.createMongoTemplate();
		
		List<ResultsModel> resultsList = mongoTemplate.findAll(ResultsModel.class);
		
		if(!resultsList.isEmpty()) {
			response.put("resultsList", resultsList);
		}
		
		return response;
	}
	
	public HashMap<String, Object> fetchRecruitStatus() {
		HashMap<String, Object> response = new HashMap<String, Object>();
		List<RecruitStatusModel> recruitStatusList = new ArrayList<RecruitStatusModel>();
		int index = 0;
		
		MongoTemplate mongoTemplate = dataAccessBase.createMongoTemplate();
		
		List<profileModel> profileList = mongoTemplate.findAll(profileModel.class);
		
		List<ResultsModel> resultsList = mongoTemplate.findAll(ResultsModel.class);
		
		if(!profileList.isEmpty() && !resultsList.isEmpty()) {
			for(int i = 0; i < profileList.size(); i++) {
				for(int j = 0; j < resultsList.size(); j++) {
					if(profileList.get(i).getAccId() == resultsList.get(j).getAccId()) {
						RecruitStatusModel rsm = new RecruitStatusModel();
						int accId = profileList.get(i).getAccId();
						int score = resultsList.get(j).getScore();
						String percentage = resultsList.get(j).getPercentage();
						String recruited = profileList.get(i).getRecruited();
						
						rsm.setAccId(accId);
						rsm.setScore(score);
						rsm.setPercentage(percentage);
						rsm.setRecruited(recruited);
						
						recruitStatusList.add(index, rsm);
						
						index++;
					}
				}
			}
		}
		
		if(!recruitStatusList.isEmpty()) {
			response.put("recruitStatusList", recruitStatusList);
			response.put("responseMessage", "Data found");
			response.put("responseCode", 1000);
		} else {
			response.put("responseMessage", "No data found");
			response.put("responseCode", 9999);
		}
		
		return response;
	}
}
