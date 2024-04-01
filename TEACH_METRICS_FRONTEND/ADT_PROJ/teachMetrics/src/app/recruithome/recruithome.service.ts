import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecruithomeService {

  fetchCandidatesURL = '/rest/api/fetchCandidates';
  selectCandidateURL = '/rest/api/selectCandidate';

  constructor(private http: HttpClient) { }

  fetchCandidates() {
    return this.http.get<any[]>(this.fetchCandidatesURL);
  }

  selectCandidate(userModel: any) {
    return this.http.post<any[]>(this.selectCandidateURL, userModel);
  }
}
