import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  menuItems = [
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
      name: 'Treinos',
      icon: 'list',
      route: '/exercise-set',
    },
    {
      name: 'Agrup. de Treinos',
      icon: 'list',
      route: '/workouts',
    },
  ];
  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
