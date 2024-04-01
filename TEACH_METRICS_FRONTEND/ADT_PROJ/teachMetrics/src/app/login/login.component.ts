import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { userModel } from './model/userModel';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userModel: userModel;
  responseMessage: any;
  responseCode: any;
  userTypeKey: string = "";
  tabTypeKey: string = "";
  emailId: string = "";
  password: string = "";
  userToken: string = "";
  verifiedFlag: any;
  generatedFlag: any;
  credFlag: any;
  userRole: any;
  accVerified: any;
  institutionName: string = "";

  constructor(private loginService: LoginService,
    private router: Router) {}

  ngOnInit(): void {
    $("#eUser").addClass('active');
    $("#nUser").removeClass('active');
    this.tabTypeKey = 'E';
    //this.sendEmail();
    //this.register();
  }

  sendEmail() {
    this.loginService.sendEmail().subscribe(
      {
        next: (data: any) => {
          //console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          
        }
      }
    )
  }

  register() {

    if(this.userTypeKey == "R") {
      this.userModel = {
        "emailId": this.emailId,
        "password": this.password,
        "userToken": '',
        "accVerified": 'Y',
        "userType": this.userTypeKey,
        "institutionName": this.institutionName
      };
    } else {
      this.userModel = {
        "emailId": this.emailId,
        "password": this.password,
        "userToken": '',
        "accVerified": 'N',
        "userType": this.userTypeKey,
        "institutionName": ''
      };
    }

    this.loginService.register(this.userModel).subscribe(
      {
        next: (data: any) => {
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
          
          //console.log("CODE>>>>>>>>>>" + this.responseCode);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          if(this.responseCode == 1000) {
            Swal.fire('Success', this.responseMessage, 'success');
          } else if(this.responseCode == 5555) {
            Swal.fire('Warning', this.responseMessage, 'warning');
          } else if(this.responseCode == 9999) {
            Swal.fire('Warning', this.responseMessage, 'warning');
          }
        } 
      }
    )
  }

  userType(key: string) {
    this.userTypeKey = key;
  }

  toggleTab(tabKey: string) {
    this.tabTypeKey = tabKey;
    if(tabKey == 'E') {
      $("#eUser").addClass('active');
      $("#nUser").removeClass('active');
    } else if(tabKey == 'N') {
      $("#eUser").removeClass('active');
      $("#nUser").addClass('active');
    }
  }

  login() {

    this.userModel = {
      "emailId": this.emailId,
      "password": this.password,
      "userToken": '',
      "accVerified": '',
      "userType": '',
      "institutionName": ''
    };

    this.loginService.login(this.userModel).subscribe(
      {
        next: (data: any) => {
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
          this.userRole = data["userRole"];
          this.accVerified = data["accVerified"];

          //console.log("CODE>>>>>>>>>>" + this.responseCode);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          if(this.responseCode == 1000) {
            sessionStorage.setItem("eId", this.emailId);
            if(this.userRole == "T") {
              if(this.accVerified == "N") {
                this.router.navigate(['profile']);
              } else if(this.accVerified == "A") {
                this.router.navigate(['profile']);
              }
            } else if(this.userRole == "A") {
              this.router.navigate(['admin']);
            } else if(this.userRole == "R") {
              this.router.navigate(['recruit']);
            }
          }

          if(this.responseCode == 1000) {
            Swal.fire('Success', this.responseMessage, 'success');
          } else if(this.responseCode == 5555) {
            Swal.fire('Warning', this.responseMessage, 'warning');
          } else if(this.responseCode == 9999) {
            Swal.fire('Warning', this.responseMessage, 'warning');
          }
        }
      }
    )
  }

  generateTTLCode() {
    this.userModel = {
      "emailId": this.emailId,
      "password": this.password,
      "userToken": '',
      "accVerified": '',
      "userType": '',
      "institutionName": ''
    };

    this.loginService.generateTTLCode(this.userModel).subscribe(
      {
        next: (data: any) => {
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
          this.generatedFlag = data["generatedFlag"];
          this.credFlag = data["credFlag"];

          //console.log("CODE>>>>>>>>>>" + this.responseCode);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          if(this.responseCode == 1000) {
            Swal.fire('Success', this.responseMessage, 'success');
          } else {
            Swal.fire('Warning', this.responseMessage, 'warning');
          }
        }
      }
    )
  }

  verifyTTLCode() {
    this.userModel = {
      "emailId": this.emailId,
      "password": this.password,
      "userToken": this.userToken,
      "accVerified": '',
      "userType": '',
      "institutionName": ''
    };
    this.loginService.verifyTTLCode(this.userModel).subscribe(
      {
        next: (data: any) => {
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
          this.verifiedFlag = data["verifiedFlag"];

          //console.log("CODE>>>>>>>>>>" + this.responseCode);
          //console.log("Start");
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          //console.log("Complete");
        }
      }
    )
  }
}
