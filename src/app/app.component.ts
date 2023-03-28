import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-15-with-material';

  constructor(private router: Router) {
    this.monitoreRouteChanges();
  }

  monitoreRouteChanges() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log('Rota alterada', val.url);
      }
    });
  }
}
