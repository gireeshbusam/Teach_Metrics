import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private uploadURL = '/rest/api/upload?eId=';
  private submitProfileURL = "/rest/api/submitProfile";
  fetchProfileURL = "/rest/api/fetchProfile?emailId=";
  updateProfileURL = "/rest/api/updateProfile";
  viewDocumentsURL = "/rest/api/viewDocuments?emailId=";

  constructor(private http: HttpClient) { }

  upload(file: File, eId: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });

    return this.http.post<any>(this.uploadURL + eId, formData);
  }

  submitProfile(profileModel: any) {
    return this.http.post<any[]>(this.submitProfileURL, profileModel);
  }

  fetchProfile(emailId: string) {
    return this.http.get<any[]>(this.fetchProfileURL + emailId);
  }

  updateProfile(profileModel: any) {
    return this.http.post<any[]>(this.updateProfileURL, profileModel);
  }

  viewDocuments(emailId: string) {
    return this.http.get<any[]>(this.viewDocumentsURL + emailId);
  }
}
