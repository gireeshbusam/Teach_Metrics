package com.adtFinalProject.teachMetrics.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "files")
public class FileModel {
	@Id
    private String id;
    private String fileName;
    private String fileType;
    private byte[] data;
    private String accId;
    
    public FileModel(String id, String fileName, String fileType, byte[] data, String accId) {
    	this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
        this.accId = accId;
    }
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public byte[] getData() {
		return data;
	}
	public void setData(byte[] data) {
		this.data = data;
	}  
}
