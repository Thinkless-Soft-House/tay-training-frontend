import { ServiceBackendItemService } from './../../services/service-backend-item.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.scss'],
})
export class MasterDetailsComponent {
  title: string = 'Master Details Example';
  targetFilters: string[] = ['Nome', 'Email', 'Telefone', 'CPF'];

  columns = [
    { name: 'id', title: 'ID' },
    { name: 'name', title: 'Name' },
  ];

  filterChange$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private router: Router,
    public serviceBackendItemService: ServiceBackendItemService
  ) {}

  add() {
    this.router.navigate(['/master-details', 'new']);
  }

  changeFilter(filter: any) {
    const value = filter.target!.value || '';
    this.filterChange$.next(value);
  }
  edit(row: any) {
    console.log('edit row', row);
    this.router.navigate(['/master-details', row.id]);
  }
  delete(row: any) {
    console.log('delete row', row);
  }
  changeTable(event: any) {
    console.log('changeTable', event);
  }
}
