import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  routesWithSideBar = ['/', '/home', '/master-details'];
  pageTitles: { [id: string]: string } = {
    '/': 'Home',
    '/home': 'Home',
    '/master-details': 'Master/Details',
  };

  showSideBar = false;
  headerTitle = 'Meu aplicativo';
  atualRoute = '/';

  constructor(private router: Router) {
    this.monitoreRouteChanges();
  }

  monitoreRouteChanges() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log('Rota alterada', val.url);
        this.atualRoute = val.url;
        this.showSideBar = this.routesWithSideBar.includes(val.url);
        this.headerTitle = this.pageTitles[val.url];
      }
    });
  }

  goToProfile() {
    console.log('Ir para o perfil');
  }

  logout() {
    console.log('Fazer logout');
  }
}
