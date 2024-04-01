package com.adtFinalProject.teachMetrics.model;

public class RecruitStatusModel {
	private int accId;
	private int score;
	private String percentage;
	private String recruited;
	
	public int getAccId() {
		return accId;
	}
	public void setAccId(int accId) {
		this.accId = accId;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public String getPercentage() {
		return percentage;
	}
	public void setPercentage(String percentage) {
		this.percentage = percentage;
	}
	public String getRecruited() {
		return recruited;
	}
	public void setRecruited(String recruited) {
		this.recruited = recruited;
	}
}
