import { Component } from '@angular/core';
import { AssessmentsService } from './assessments.service';
import { assessmentsModel } from './model/assessmentModel';
import { responsesModel } from './model/responsesModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent {
  startTime: number | null;
  elapsedTime: number;
  countdownMinutes: number = 45;
  assessmentsList: assessmentsModel[] = [];
  responsesList: responsesModel[] = [];
  emailId: any;
  responseMessage: any;
  responseCode: any;
  submitFlag: boolean = false;
  assessmentFlag: string = "N";

  constructor(private assessmentsService: AssessmentsService,
    private menuService: MenuService,
    private router: Router) {}

  ngOnInit(): void {
    this.fetchUserStatus();
    const startTimeString = localStorage.getItem('startTime');
    if (startTimeString) {
      this.startTime = parseInt(startTimeString, 10);
      this.elapsedTime = Math.floor((this.startTime - Date.now()) / 1000);
      if (this.elapsedTime <= 0) {
        this.elapsedTime = 0;
        this.resetTimer();
      } else {
        this.startTimer();
      }
    } else {
      this.resetTimer();
    }
  }

  startTimer() {
    this.submitFlag = true;
    this.fetchAssessment();
    if (this.startTime === null) {
      this.startTime = Date.now() + (this.countdownMinutes * 60 * 1000);
      localStorage.setItem('startTime', this.startTime.toString());
    }
    const intervalId = setInterval(() => {
      const now = Date.now();
      const remainingTime = Math.floor((this.startTime! - now) / 1000);
      if (remainingTime > 0) {
        this.elapsedTime = remainingTime;

        if(this.elapsedTime === 0) {
          clearInterval(intervalId);
          this.submitAssessment();
        }
      } else {
        clearInterval(intervalId);
        this.elapsedTime = 0;
        this.resetTimer();
      }
    }, 1000);
  }

  resetTimer() {
    localStorage.removeItem('startTime');
    this.startTime = null;
    this.elapsedTime = this.countdownMinutes * 60;
  }

  formatTimeLeft(): string {
    const minutes = Math.floor(this.elapsedTime / 60);
    const seconds = this.elapsedTime % 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }
  
  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  fetchAssessment() {
    this.assessmentsService.fetchAssessment().subscribe(
      {
        next: (data: any) => {
          this.assessmentsList = data["assessmentsList"];
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {

        }
      }
    )
  }

  chosenOption(option: string, id: number) {
    this.emailId = sessionStorage.getItem("eId");

    const existingOptionIndex = this.responsesList.findIndex(response => response.id === id);

    if (existingOptionIndex === -1) {
      this.responsesList.push({
        "id": id,
        "option": option,
        "accId": 0,
        "emailId": this.emailId,
        "timeLeft": this.formatTimeLeft()
      });
    } else {
      this.responsesList[existingOptionIndex].option = option;
      this.responsesList[existingOptionIndex].timeLeft = this.formatTimeLeft();
    }
  }

  submitAssessment() {
    this.assessmentsService.submitAssessment(this.responsesList).subscribe(
      {
        next: (data: any) => {
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.responsesList = [];
          if(this.responseCode == 1000) {
            this.submitFlag = false;
            localStorage.removeItem("startTime");
            this.resetTimer();
            Swal.fire('Success', this.responseMessage, 'success');
            this.fetchUserStatus();                        
            this.router.navigate(['profile']);
          } else if(this.responseCode == 9999) {
            Swal.fire('Warning', this.responseMessage, 'warning');
          }
        }
      }
    ) 
  }

  fetchUserStatus() {
    this.emailId = sessionStorage.getItem("eId");
    this.menuService.fetchUserStatus(this.emailId).subscribe({
      next: (data: any) => {
        this.responseMessage = data["responseMessage"];
        this.responseCode = data["responseCode"];
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        if(this.responseCode == 1000) {
          this.assessmentFlag = "Y";
        } else {
          this.assessmentFlag = "N";
        }
      }
    })
  }

}
