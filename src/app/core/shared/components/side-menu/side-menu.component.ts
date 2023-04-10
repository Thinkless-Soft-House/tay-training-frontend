import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  @Input() companyName: string = 'Meu aplicativo';
  @Input() atualRoute: string = '/';

  menuItems = [
    {
      name: 'Inicial',
      icon: 'home',
      route: '/home',
    },
    {
      name: 'Exercícios',
      icon: 'list',
      route: '/exercises',
    },
    {
      name: 'Métodos',
      icon: 'list',
      route: '/methods',
    },
    {
      name: 'Conj. de Exercícios',
      icon: 'list',
      route: '/exercise-set',
    },
    {
      name: 'Exercícios',
      icon: 'list',
      route: '/workouts',
    },
  ];

  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
