import { ServiceBackendItemService } from './../../services/service-backend-item.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { DataMasterTable } from 'src/app/core/interfaces/data-master-table.interface';
import { MasterTable } from 'src/app/core/classes/master-table.class';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['../../core/shared/scss/master-details.shared.scss'],
})
export class MasterDetailsComponent extends MasterTable<ServiceBackendItemService> {
  constructor(
    router: Router,
    public serviceBackendItemService: ServiceBackendItemService,
    loadingService: LoadingService
  ) {
    const data: DataMasterTable = {
      title: 'Master/Details',
      targetFilters: ['Name', 'Description'],
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        // { name: 'description', title: 'Description' },
      ],
      path: '/master-details',
    };
    super(router, serviceBackendItemService, data, loadingService);
  }

  // add()
  // changeFilter(filter: any)
  // edit(row: any)
  // delete(row: any)
  // changeTable(event: any)
}
