import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teachMetrics';
  showMenu: boolean = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.router.navigate(['login']);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateShowMenu();
      }
    });
  }

  private updateShowMenu() {
    const currentRoutePath = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
    // Check if the current route is 'login'
    this.showMenu = !(currentRoutePath === 'login');
  }
}
