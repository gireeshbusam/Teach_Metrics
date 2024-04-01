import { Component } from '@angular/core';
import { RecruithomeService } from './recruithome.service';
import { candidatesModel } from './model/candidatesModel';
import { filesModel } from '../admin/model/filesModel';
import { AdminService } from '../admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recruithome',
  templateUrl: './recruithome.component.html',
  styleUrls: ['./recruithome.component.css']
})
export class RecruithomeComponent {

  displayStyle = "none";
  candidatesList: candidatesModel[] = [];
  candidateData: candidatesModel = {} as candidatesModel;
  filesList: filesModel[] = [];
  responseMessage: any;
  responseCode: any;

  constructor(private recruithomeService: RecruithomeService,
    private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.fetchCandidates();
  }

  fetchCandidates() {
    this.recruithomeService.fetchCandidates().subscribe(
      {
        next: (data: any) => {
          this.candidatesList = data["candidatesList"];
          
          this.candidatesList.sort((a, b) => {
            const pA = parseFloat(a.percentage);
            const pB = parseFloat(b.percentage);

            return pB - pA;
          });
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {

        }
      }
    )
  }

  openViewPopup(cId: number) {
    this.displayStyle = "block";
    this.filesList = [];

    for(let i = 0; i < this.candidatesList.length; i++) {
      if(cId == this.candidatesList[i].accId) {
        this.candidateData = {
          "accId": this.candidatesList[i].accId,
          "candidateName": this.candidatesList[i].candidateName,
          "about": this.candidatesList[i].about,
          "exp": this.candidatesList[i].exp,
          "contact": this.candidatesList[i].contact,
          "address": this.candidatesList[i].address,
          "postalCode": this.candidatesList[i].postalCode,
          "emailId": this.candidatesList[i].emailId,
          "score": this.candidatesList[i].score,
          "percentage": this.candidatesList[i].percentage,
          "docs": this.candidatesList[i].docs
        }
        for(let j = 0; j < this.candidatesList[i].docs.length; j++) {
          this.filesList.push({
            "id": this.candidatesList[i].docs[j].id,
            "fileName": this.candidatesList[i].docs[j].fileName,
            "fileType": this.candidatesList[i].docs[j].fileType,
            "data": this.candidatesList[i].docs[j].data,
            "accId": this.candidatesList[i].docs[j].accId
          });
        }
      }
    }
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

  closeViewPopup() {
    this.displayStyle = "none";
  }

  selectCandidate(accId: number, emailId: string) {
    const selectModel = {
      "accId": accId,
      "emailId": emailId
    }

    this.recruithomeService.selectCandidate(selectModel).subscribe(
      {
        next: (data: any) => {
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
        }, 
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.fetchCandidates();
          if(this.responseCode == 1000) {
            Swal.fire('Success', this.responseMessage, 'success');
          } else if(this.responseCode == 9999) {
            Swal.fire('Error', this.responseMessage, 'error');
          }
        }
      }
    )
  }
}
