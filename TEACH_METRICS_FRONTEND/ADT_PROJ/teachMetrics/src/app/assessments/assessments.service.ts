import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {

  fetchAssessmentURL = "/rest/api/fetchAssessment";
  submitAssessmentURL = "/rest/api/submitAssessment";

  constructor(private http: HttpClient) { }

  fetchAssessment() {
    return this.http.get<any[]>(this.fetchAssessmentURL);
  }

  submitAssessment(responsesModel: any[]) {
    return this.http.post<any[]>(this.submitAssessmentURL, responsesModel);
  }
}
