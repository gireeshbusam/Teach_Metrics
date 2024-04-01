import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  sendEmailURL = "/rest/api/sendEmail";
  registerURL = "/rest/api/register";
  loginURL = "/rest/api/login";
  generateTTLCodeURL = "/rest/api/gen";
  verifyTTLCodeURL = "/rest/api/verify";

  constructor(private http: HttpClient) { }

  sendEmail() {
    return this.http.get<any[]>(this.sendEmailURL);
  }

  register(userModel: any) {   
    return this.http.post<any[]>(this.registerURL, userModel);
  }

  login(userModel: any) {
    return this.http.post<any[]>(this.loginURL, userModel);
  }

  generateTTLCode(userModel: any) {
    return this.http.post<any[]>(this.generateTTLCodeURL, userModel);
  }

  verifyTTLCode(userModel: any) {
    return this.http.post<any[]>(this.verifyTTLCodeURL, userModel);
  }
}
