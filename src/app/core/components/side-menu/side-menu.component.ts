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
      name: 'Master/Details',
      icon: 'list',
      route: '/master-details',
    },

  ];
}
