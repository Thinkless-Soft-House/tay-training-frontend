import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterTable } from 'src/app/core/classes/master-table.class';
import { DataMasterTable } from 'src/app/core/interfaces/data-master-table.interface';
import { MethodsService } from 'src/app/services/methods.service';
import { ServiceBackendItemService } from 'src/app/services/service-backend-item.service';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: [
    '../../core/shared/scss/master-details.shared.scss',
    './methods.component.scss',
  ],
})
export class MethodsComponent extends MasterTable<ServiceBackendItemService> {
  constructor(router: Router, public methodsService: MethodsService) {
    const data: DataMasterTable = {
      title: 'Métodos',
      targetFilters: ['Name', 'Description'],
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        // { name: 'description', title: 'Description' },
      ],
      path: '/methods',
    };
    super(router, methodsService, data);
  }

  // add()
  // changeFilter(filter: any)
  // edit(row: any)
  // delete(row: any)
  // changeTable(event: any)
}
