import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServiceBackendItemService } from 'src/app/services/service-backend-item.service';
import { DataMasterTable } from '../interfaces/data-master-table.interface';
import { LoadingService } from 'src/app/services/loading.service';

interface IsService {
  delete: (id: number) => Promise<void>;
}

export class MasterTable<T extends IsService> {
  title: string;
  targetFilters: string[];
  columns: { name: string; title: string }[];

  path: string;

  filterChange$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    public router: Router,
    public service: T,
    data: DataMasterTable,
    public loadingService: LoadingService
  ) {
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
  async delete(row: any) {
    this.loadingService.activeLoading();
    console.log('delete row', row);
    await this.service.delete(row.id);
    // console.log('render table',z this.table);
  }
  changeTable(event: any) {
    console.log('changeTable', event);
  }
}
