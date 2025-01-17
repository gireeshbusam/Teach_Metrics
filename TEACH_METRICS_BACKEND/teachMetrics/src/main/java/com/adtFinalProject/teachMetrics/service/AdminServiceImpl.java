package com.adtFinalProject.teachMetrics.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.adtFinalProject.teachMetrics.model.ARModel;
import com.adtFinalProject.teachMetrics.model.UserFilesModel;
import com.adtFinalProject.teachMetrics.model.UserProfilesModel;
import com.adtFinalProject.teachMetrics.model.profileModel;
import com.adtFinalProject.teachMetrics.model.userModel;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
    private MongoTemplate mongoTemplate;
	@Autowired
    private DataAccessBase dataAccessBase;
	
	public HashMap<String, Object> getUserProfile() {
		HashMap<String, Object> response = new HashMap<String, Object>();
		List<UserProfilesModel> upm = new ArrayList<UserProfilesModel>();
		int count = 0;
		
		MongoTemplate mongoTemplate = dataAccessBase.createMongoTemplate();
    	
    	Query query = new Query(Criteria.where("userType").is("T"));
    	List<userModel> result = mongoTemplate.find(query, userModel.class);
		
    	if(!result.isEmpty()) {
    		for(int i = 0; i < result.size(); i++) {
    			Query pquery = new Query(Criteria.where("accId").is(result.get(i).getAccId()));
    			List<profileModel> pRes = mongoTemplate.find(pquery, profileModel.class);
    			
    			if(!pRes.isEmpty() && (pRes.get(0).getVerifiedBy() == 0)) {
    				UserProfilesModel pm = new UserProfilesModel();
    				pm.setAccId(pRes.get(0).getAccId());
    				pm.setEmailId(pRes.get(0).getEmailId());
    				pm.setName(pRes.get(0).getlName() + ", " + pRes.get(0).getfName());
    				pm.setContact(pRes.get(0).getContact());
    				pm.setExp(pRes.get(0).getExp());
    				upm.add(count, pm);
    				count++;
        		}
    		}
			/*
			 * Query fquery = new Query(Criteria.where("accId").is(upm.getAccId()));
			 * 
			 * List<FileModel> fRes = mongoTemplate.find(fquery, FileModel.class);
			 * 
			 * if(!fRes.isEmpty()) { upm.setDocs(fRes); count++; }
			 */
    	}
    	
    	if(!upm.isEmpty()) {
    		for(int i = 0; i < upm.size(); i++) {
    			String accId = Integer.toString(upm.get(i).getAccId());
    			
    			Query fquery = new Query(Criteria.where("accId").is(accId));
    			List<UserFilesModel> fRes = mongoTemplate.find(fquery, UserFilesModel.class);
    			
    			if(!fRes.isEmpty()) {
    				upm.get(i).setDocs(fRes);
    			}
    		}
    		response.put("UserProfilesModel", upm);
    	}
    	
		return response;
	}
	
	public HashMap<String, Object> approveReject(ARModel arm) {
		HashMap<String, Object> response = new HashMap<String, Object>();
		profileModel pm = new profileModel();
		
		Query query = new Query(Criteria.where("emailId").is(arm.getEmailId()));
    	List<userModel> result = mongoTemplate.find(query, userModel.class);
		
    	if(!result.isEmpty()) {
    		Update update = new Update().set("accVerified", arm.getArFlag());
    		
    		mongoTemplate.updateFirst(query, update, userModel.class);
    		
    		List<userModel> updatedResult = mongoTemplate.find(query, userModel.class);
    		
    		if(!updatedResult.isEmpty()) {
    			Query pQuery = new Query(Criteria.where("emailId").is(arm.getEmailId()));
        		Query aQuery = new Query(Criteria.where("emailId").is(arm.getAdmin()));
        		List<userModel> aResult = mongoTemplate.find(aQuery, userModel.class);
        		
        		if(!aResult.isEmpty()) {
        			pm.setVerifiedBy(aResult.get(0).getAccId());
        		}
        		Update pUpdate = new Update().set("verifiedBy", pm.getVerifiedBy());
        		mongoTemplate.updateFirst(pQuery, pUpdate, profileModel.class);
        		
        		List<profileModel> updatedPResult = mongoTemplate.find(pQuery, profileModel.class);
    			
    			if(!updatedPResult.isEmpty()) {
    				if("A".equalsIgnoreCase(updatedResult.get(0).getAccVerified())) {
        				response.put("responseMessage", "User Approved");
        				response.put("responseCode", 1000);
        			} else if("R".equalsIgnoreCase(updatedResult.get(0).getAccVerified())) {
        				response.put("responseMessage", "User Rejected");
        				response.put("responseCode", 2000);
        			} else {
        				response.put("responseMessage", "Error");
        				response.put("responseCode", 9999);
        			}
    			}
    		}
    	}
    	
		return response;
	}
}
