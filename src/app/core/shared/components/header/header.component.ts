import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = 'Meu aplicativo';
  @Input() showMenuBtn: boolean = false;

  @Output() toggleMenu: EventEmitter<void> = new EventEmitter();

  @Output() goToProfile: EventEmitter<void> = new EventEmitter();
  @Output() logout: EventEmitter<void> = new EventEmitter();
}
