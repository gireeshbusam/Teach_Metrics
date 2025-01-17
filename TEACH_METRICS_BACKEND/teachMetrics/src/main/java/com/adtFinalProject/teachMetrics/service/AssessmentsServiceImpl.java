package com.adtFinalProject.teachMetrics.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.adtFinalProject.teachMetrics.model.AssessmentsModel;
import com.adtFinalProject.teachMetrics.model.ResponsesModel;
import com.adtFinalProject.teachMetrics.model.ResultsModel;
import com.adtFinalProject.teachMetrics.model.userModel;

@Service
public class AssessmentsServiceImpl implements AssessmentsService {

	@Autowired
    private MongoTemplate mongoTemplate;
	@Autowired
    private DataAccessBase dataAccessBase;
	
	private static Random rand = new Random();
	
	public HashMap<String, Object> fetchAssessment() {
		HashMap<String, Object> response = new HashMap<String, Object>();
		//List<AssessmentsModel> am = new ArrayList<AssessmentsModel>();
		List<AssessmentsModel> assessmentList = new ArrayList<AssessmentsModel>();
		int max = 30;
		int count = 0;
		
		MongoTemplate mongoTemplate = dataAccessBase.createMongoTemplate();
		
		List<AssessmentsModel> am = mongoTemplate.findAll(AssessmentsModel.class);		
		
		if(!am.isEmpty()) {
			/**
			 * Random Question selection Logic
			 * */
			int[] questionsList = new int[am.size()];
			
			for(int i = 0; i < am.size(); i++) {
				questionsList[i] = i + 1;
			}
			
			for(int i = 0; i < max; i++) {
				//Setting upper bound for the random question number to be picked
				int randomQuestion = rand.nextInt(am.size());
				
				//Suffling the List of questions
				int temp = questionsList[i];
				questionsList[i] = questionsList[randomQuestion];
				questionsList[randomQuestion] = temp;
			}
			
			//Stores the Randomly picked Questions
			int[] randomQuestionsList = new int[max];
			
			for(int i = 0; i < max; i++) {
				randomQuestionsList[i] = questionsList[i];
			}
			
			if(randomQuestionsList.length > 0) {
				for(int i = 0; i < randomQuestionsList.length; i++) {
					assessmentList.add(i, am.get(randomQuestionsList[i] - 1));
				}
			}
			
			response.put("assessmentsList", assessmentList);
			response.put("responseMessage", "Success");
			response.put("responseCode", 1000);
		} else {
			response.put("responseMessage", "Error");
			response.put("responseCode", 9999);
		}
		
		return response;
	}
	
	public static Set<Integer> randomSample(int max, int n) {
	    HashSet<Integer> res = new HashSet<Integer>(n);
	    int count = max + 1;
	    for (int i = count - n; i < count; i++) {
	        Integer item = rand.nextInt(i + 1);
	        if (res.contains(item))
	            res.add(i);
	        else
	            res.add(item);
	    }
	    return res;
	}
	
	public HashMap<String, Object> submitAssessment(List<ResponsesModel> rm) {
		HashMap<String, Object> response = new HashMap<String, Object>();
		MongoTemplate mongoTemplate = dataAccessBase.createMongoTemplate();
		
		Query query = new Query(Criteria.where("emailId").is(rm.get(0).getEmailId()));
    	List<userModel> result = mongoTemplate.find(query, userModel.class);
		
    	if(!result.isEmpty()) {
    		for(int i = 0; i < rm.size(); i++) {
    			rm.get(i).setAccId(result.get(0).getAccId());
    		}
    	}
    	
    	mongoTemplate.insertAll(rm);
    	
    	Query aQuery = new Query(Criteria.where("accId").is(rm.get(0).getAccId()));
    	List<ResponsesModel> resResult = mongoTemplate.find(query, ResponsesModel.class);
    	
    	if(!resResult.isEmpty()) {
    		if(resResult.size() == rm.size()) {
    			HashMap<String, Object> fetchRes = checkResult(resResult);
    			Object respCode = fetchRes.get("responseCode");
    			int responseCode = (Integer) respCode;
    			if(responseCode == 1000) {
    				response.put("responseMessage", "Responses Saved Successfully");
        			response.put("responseCode", 1000);
    			} else {
        			response.put("responseMessage", "Error");
        			response.put("responseCode", 9999);
        		}    			
    		} else {
    			response.put("responseMessage", "Error");
    			response.put("responseCode", 9999);
    		}
    	}	
    	
		return response;
	}
	
	public HashMap<String, Object> checkResult(List<ResponsesModel> responseList) {
		HashMap<String, Object> response = new HashMap<String, Object>();
		MongoTemplate mongoTemplate = dataAccessBase.createMongoTemplate();
		List<AssessmentsModel> keyList = mongoTemplate.findAll(AssessmentsModel.class);
		ResultsModel result = new ResultsModel();
		int score = 0;
		
		for(int i = 0; i < keyList.size(); i++) {
			for(int j = 0; j < responseList.size(); j++) {
				if(keyList.get(i).getId() == responseList.get(j).getId()) {
					if(keyList.get(i).getAnswer().equals(responseList.get(j).getOption())) {
						score++;
					}
				}
			}
		}
		
		long count = mongoTemplate.count(new Query(), AssessmentsModel.class);
		float percentage = (float)score/30;
		percentage = percentage * 100;
		
		String roundedPercentage = String.format("%.2f", percentage);
		
		result.setAccId(responseList.get(0).getAccId());
		result.setScore(score);
		result.setPercentage(roundedPercentage);
		
		mongoTemplate.insert(result);
		
		Query query = new Query(Criteria.where("accId").is(responseList.get(0).getAccId()));
    	List<ResultsModel> fetchRes = mongoTemplate.find(query, ResultsModel.class);
    	
    	if(!fetchRes.isEmpty()) {
			response.put("responseCode", 1000);
    	} else {
    		response.put("responseCode", 9999);
    	}
		
		return response;
	}
}
