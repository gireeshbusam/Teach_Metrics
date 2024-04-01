import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getUserProfileURL = "/rest/api/getUserProfile";
  private downloadFileURL = '/rest/api/download';
  approveRejectURL = "/rest/api/approveReject";

  constructor(private http: HttpClient) { }

  getUserProfile() {
    return this.http.get<any[]>(this.getUserProfileURL);
  }

  downloadFile(fileId: number): Observable<Blob> {
    const url = `${this.downloadFileURL}/${fileId}`;
    //const url = `http://localhost:8080/api/files/download/${fileId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  approveReject(userModel: any) {
    return this.http.post<any[]>(this.approveRejectURL, userModel);
  }
}
