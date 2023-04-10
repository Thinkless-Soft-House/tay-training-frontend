import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServiceBackendItemService } from 'src/app/services/service-backend-item.service';
import { DataMasterTable } from '../interfaces/data-master-table.interface';

export class MasterTable<T> {
  title: string;
  targetFilters: string[];
  columns: { name: string; title: string }[];

  path: string;

  filterChange$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(public router: Router, public service: T, data: DataMasterTable) {
    this.title = data.title || 'Master Details Example';
    this.targetFilters = data.targetFilters || [
      'Nome',
      'Email',
      'Telefone',
      'CPF',
    ];
    this.columns = data.columns || [
      { name: 'id', title: 'ID' },
      { name: 'name', title: 'Name' },
    ];
    this.path = data.path || '/master-details';
  }

  add() {
    this.router.navigate([this.path, 'new']);
  }

  changeFilter(filter: any) {
    const value = filter.target!.value || '';
    this.filterChange$.next(value);
  }
  edit(row: any) {
    console.log('edit row', row);
    this.router.navigate([this.path, row.id]);
  }
  delete(row: any) {
    console.log('delete row', row);
  }
  changeTable(event: any) {
    console.log('changeTable', event);
  }
}
