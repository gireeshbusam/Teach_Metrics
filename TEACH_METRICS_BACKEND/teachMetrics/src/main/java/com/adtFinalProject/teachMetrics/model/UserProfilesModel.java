package com.adtFinalProject.teachMetrics.model;

import java.util.List;

public class UserProfilesModel {
	private int accId;
	private String emailId;
	private String name;
	private String contact;
	private String exp;
	private List<UserFilesModel> docs;
	
	public int getAccId() {
		return accId;
	}
	public void setAccId(int accId) {
		this.accId = accId;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getExp() {
		return exp;
	}
	public void setExp(String exp) {
		this.exp = exp;
	}
	public List<UserFilesModel> getDocs() {
		return docs;
	}
	public void setDocs(List<UserFilesModel> docs) {
		this.docs = docs;
	}
}
