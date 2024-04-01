import { Component } from '@angular/core';
import { AdminService } from './admin.service';
import { userProfilesModel } from './model/userProfilesModel';
import { filesModel } from './model/filesModel';
import { userModel } from '../login/model/userModel';
import { arModel } from './model/arModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  userProfilesModel: userProfilesModel[] = [];
  filesList: filesModel[] = [];
  displayStyle = "none";
  accId: number;
  arModelList: arModel;
  emailId: any;
  responseMessage: any;
  responseCode: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.adminService.getUserProfile().subscribe(
      {
        next: (data: any) => {
          this.userProfilesModel = data["UserProfilesModel"];
        }, 
        error: (error: any) => {
          console.log(error);
        }, 
        complete: () => {

        }
      }
    )
  }

  openViewPopup(accId: number) {
    this.filesList = [];
    this.accId = accId;
    for(let i = 0; i < this.userProfilesModel.length; i++) {
      if(this.userProfilesModel[i].accId == this.accId) {
        for(let j = 0; j < this.userProfilesModel[i].docs.length; j++) {
            this.filesList.push({
              "id": this.userProfilesModel[i].docs[j].id,
              "fileName": this.userProfilesModel[i].docs[j].fileName,
              "fileType": this.userProfilesModel[i].docs[j].fileType,
              "data": this.userProfilesModel[i].docs[j].data,
              "accId": this.userProfilesModel[i].docs[j].accId
            });
        }
      }
    }

    this.displayStyle = "block";
  }

  closeViewPopup() {
    this.displayStyle = "none";
  }

  downloadFile(fId: number) {
    const fileId = fId; // Replace with the actual file ID
    this.adminService.downloadFile(fileId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded_file_name'; // Provide a name for the downloaded file
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  approveReject(arFlag: string, email: string) {
    this.emailId = sessionStorage.getItem("eId");
    this.arModelList = {
      "arFlag": arFlag,
      "emailId": email,
      "admin": this.emailId
    }

    this.adminService.approveReject(this.arModelList).subscribe(
      {
        next: (data: any) => {
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
          //console.log("AR>>>>>>>>>>", this.responseCode);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          if(this.responseCode == 1000) {
            this.getUserProfile();
            Swal.fire('Success', this.responseMessage, 'success');
          } else if(this.responseCode == 2000) {
            this.getUserProfile();
            Swal.fire('Success', this.responseMessage, 'success');
          } else if(this.responseCode == 9999) {
            Swal.fire('Warning', this.responseMessage, 'warning');
          }
        }
      }
    )
  }
}
