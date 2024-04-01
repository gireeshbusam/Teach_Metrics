package com.adtFinalProject.teachMetrics.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.adtFinalProject.teachMetrics.model.FetchUserModel;
import com.adtFinalProject.teachMetrics.model.FileModel;
import com.adtFinalProject.teachMetrics.model.UserFilesModel;
import com.adtFinalProject.teachMetrics.model.userModel;
import com.mongodb.client.gridfs.model.GridFSFile;

@Service
public class FileStorageServiceImpl implements FileStorageService {
	@Autowired
    private GridFsTemplate gridFsTemplate;
	@Autowired
    private DataAccessBase dataAccessBase;

    public HashMap<String, Object> storeFile(MultipartFile file, String emailId) {
    	HashMap<String, Object> response = new HashMap<String, Object>();
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        MongoTemplate mongoTemplate = dataAccessBase.createMongoTemplate();
        FetchUserModel fetchUser = new FetchUserModel();
        
        try {
        	Query query = new Query(Criteria.where("emailId").is(emailId));
			List<userModel> result = mongoTemplate.find(query, userModel.class);
			
			fetchUser.setAccId(result.get(0).getAccId());
        	
            ObjectId fileId = gridFsTemplate.store(file.getInputStream(), fileName, file.getContentType());
            
            FileModel fileModel = new FileModel(fileId.toHexString(), fileName, file.getContentType(), file.getBytes(), Integer.toString(fetchUser.getAccId()));
            mongoTemplate.save(fileModel);
            
            Query fquery = new Query(Criteria.where("_id").is(fileId.toHexString()));
            UserFilesModel fRes = mongoTemplate.findOne(fquery, UserFilesModel.class);
            
            if(fRes != null) {
            	response.put("responseMessage", "File Uploaded Successfully");
    			response.put("responseCode", 1000);
            } else {
            	response.put("responseMessage", "File Uploaded Successfully");
    			response.put("responseCode", 9999);
            }
            
            //return fileId.toHexString();
            return response;
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to store file");
        }
    }

    public ResponseEntity<Resource> downloadFile(String fileId) {
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(new ObjectId(fileId))));
        if (file == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
        }
        GridFsResource resource = gridFsTemplate.getResource(file);
        try {
            byte[] data = IOUtils.toByteArray(resource.getInputStream());
            ByteArrayResource byteArrayResource = new ByteArrayResource(data);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(resource.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(byteArrayResource);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read file data");
        }
    }
}
