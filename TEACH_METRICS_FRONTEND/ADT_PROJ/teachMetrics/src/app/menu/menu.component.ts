import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  showMenu: boolean = true;
  menuFlag: string = "";
  subMenuFlag: string = "";
  emailId: any;
  responseMessage: any;
  responseCode: any;
  assessmentFlag: string = "N";
  
  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private menuService: MenuService) {
    //this.router.navigate(['login']);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateShowMenu();
      }
    });
  }

  ngOnInit(): void {
    //this.toggleTab('D');
    this.fetchUserStatus();
    this.updateShowMenu();
  }

  private updateShowMenu() {
    const currentRoutePath = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
    if(currentRoutePath === 'recruit') {
      this.menuFlag = "R";
      this.subMenuFlag = "D";
    } else if(currentRoutePath === 'profile') {
      this.menuFlag = "C";
      this.subMenuFlag = "P";
    } else if(currentRoutePath === 'assessment') {
      this.menuFlag = "C";
      this.subMenuFlag = "T";
    } else if(currentRoutePath === 'admin') {
      this.menuFlag = "A";
      this.subMenuFlag = "S";
    }
  }

  toggleTab(key: string) {
    
    if(key == 'D') {
      this.subMenuFlag = "D";
      this.router.navigate(['recruit']);
    } else if(key == 'A') {
      this.subMenuFlag = "A";
      this.router.navigate(['analysis']);
    } else if(key == 'P') {
      this.subMenuFlag = "P";
      this.router.navigate(['profile']);
    } else if(key == 'T') {
      this.subMenuFlag = "T";
      this.router.navigate(['assessment']);
    }
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

  logout() {
    sessionStorage.removeItem("eId");
    this.router.navigate(['login']);
  }
}
