import { Component } from '@angular/core';
import { ProfileService } from './profile.service';
import { profileModel } from './model/profileModel';
import { filesModel } from '../admin/model/filesModel';
import { AdminService } from '../admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  selectedFile: File;
  profileModel: profileModel;
  fName: string;
  lName: string;
  contact: string;
  address: string;
  postalCode: string;
  exp: string;
  emailId: any;
  responseMessage: any;
  responseCode: any;
  profileList: profileModel = {} as profileModel;
  profileFlag: boolean = false;
  displayStyle = "none";
  filesList: filesModel[] = [];
  uploadDisplayStyle = "none";

  constructor(private profileService: ProfileService,
    private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.emailId = sessionStorage.getItem("eId");
    this.profileService.fetchProfile(this.emailId).subscribe(
      {
        next: (data: any) => {
          this.profileList = data["profileList"];
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
        },
        error: (error: any) => {

        },
        complete: () => {
          if(this.responseCode == 1000) {
            this.profileFlag = true;
            this.fName = this.profileList.fName;
            this.lName = this.profileList.lName;
            this.contact = this.profileList.contact;
            this.address = this.profileList.address;
            this.postalCode = this.profileList.postalCode;
            this.exp = this.profileList.exp;           
          } else {
            this.profileFlag = false;
          }
        }
      }
    )
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    this.emailId = sessionStorage.getItem("eId");
    this.profileService.upload(this.selectedFile, this.emailId).subscribe(
      {
        next: (data: any) => {
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
          //console.log('File uploaded successfully', this.responseCode);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          if(this.responseCode == 1000) {
            Swal.fire('Success', this.responseMessage, 'success');
          } else if(this.responseCode == 9999) {
            Swal.fire('Warning', this.responseMessage, 'warning');
          }
        }
      }
    );
  }

  submitProfile() {
    this.emailId = sessionStorage.getItem("eId");
    this.profileModel = {
      "emailId": this.emailId,
      "fName": this.fName,
      "lName": this.lName,
      "contact": this.contact,
      "address": this.address,
      "postalCode": this.postalCode,
      "exp": this.exp,
      "verifiedBy": 0,
      "recruited": "N"
    }

    this.profileService.submitProfile(this.profileModel).subscribe(
      {
        next: (data: any) => {
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
          //console.log("SUBMIT: ", this.responseCode);
        }, 
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          if(this.responseCode == 1000) {
            this.fetchProfile();
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

  updateProfile() {
    this.emailId = sessionStorage.getItem("eId");
    this.profileModel = {
      "emailId": this.emailId,
      "fName": this.fName,
      "lName": this.lName,
      "contact": this.contact,
      "address": this.address,
      "postalCode": this.postalCode,
      "exp": this.exp,
      "verifiedBy": 0,
      "recruited": "N"
    }
    this.profileService.updateProfile(this.profileModel).subscribe(
      {
        next: (data: any) => {
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          if(this.responseCode == 1000) {
            this.fetchProfile();
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

  viewDocuments() {
    this.emailId = sessionStorage.getItem("eId");
    this.profileService.viewDocuments(this.emailId).subscribe(
      {
        next: (data: any) => {
          this.filesList = data["filesList"];
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          if(this.responseCode == 1000) {
            //Swal.fire('Success', this.responseMessage, 'success');
          } else if(this.responseCode == 2000) {
            Swal.fire('Info', this.responseMessage, 'info');
          } else if(this.responseCode == 9999) {
            Swal.fire('Warning', this.responseMessage, 'warning');
          }
        }
      }
    )
  }

  openViewPopup() {
    this.viewDocuments();
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

  openUploadPopup() {
    this.uploadDisplayStyle = "block";
  }

  closeUploadPopup() {
    this.uploadDisplayStyle = "none";
  }
}
