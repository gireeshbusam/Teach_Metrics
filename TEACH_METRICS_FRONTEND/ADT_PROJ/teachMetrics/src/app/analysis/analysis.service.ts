import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  fetchResultsURL = "/rest/api/fetchResults";
  fetchRecruitStatusURL = "/rest/api/fetchRecruitStatus";

  constructor(private http: HttpClient) { }

  fetchResults() {
    return this.http.get<any[]>(this.fetchResultsURL);
  }

  fetchRecruitStatus() {
    return this.http.get<any[]>(this.fetchRecruitStatusURL);
  }
}
