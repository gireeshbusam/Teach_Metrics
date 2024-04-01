import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  fetchUserStatusURL = "/rest/api/fetchUserStatus?emailId=";

  constructor(private http: HttpClient) { }

  fetchUserStatus(emailId: string) {
    return this.http.get<any[]>(this.fetchUserStatusURL + emailId);
  }
}
