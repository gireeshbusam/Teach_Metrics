package com.adtFinalProject.teachMetrics.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "c_profile")
public class profileModel {
	private int accId;
	private String emailId;
	private String fName;
	private String lName;
	private String contact;
	private String address;
	private String postalCode;
	private String exp;
	private int verifiedBy;
	private String recruited;
	
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
	public String getfName() {
		return fName;
	}
	public void setfName(String fName) {
		this.fName = fName;
	}
	public String getlName() {
		return lName;
	}
	public void setlName(String lName) {
		this.lName = lName;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getExp() {
		return exp;
	}
	public void setExp(String exp) {
		this.exp = exp;
	}
	public int getVerifiedBy() {
		return verifiedBy;
	}
	public void setVerifiedBy(int verifiedBy) {
		this.verifiedBy = verifiedBy;
	}
	public String getRecruited() {
		return recruited;
	}
	public void setRecruited(String recruited) {
		this.recruited = recruited;
	}
}
