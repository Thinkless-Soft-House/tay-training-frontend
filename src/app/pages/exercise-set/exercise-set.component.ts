import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterTable } from 'src/app/core/classes/master-table.class';
import { DataMasterTable } from 'src/app/core/interfaces/data-master-table.interface';
import { ServiceBackendItemService } from 'src/app/services/service-backend-item.service';

@Component({
  selector: 'app-exercise-set',
  templateUrl: './exercise-set.component.html',
  styleUrls: [
    '../../core/shared/scss/master-details.shared.scss',
    './exercise-set.component.scss',
  ],
})
export class ExerciseSetComponent extends MasterTable<ServiceBackendItemService> {
  constructor(
    router: Router,
    public serviceBackendItemService: ServiceBackendItemService
  ) {
    const data: DataMasterTable = {
      title: 'Exercises',
      targetFilters: ['Name', 'Description'],
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        // { name: 'description', title: 'Description' },
      ],
      path: '/exercise-set',
    };
    super(router, serviceBackendItemService, data);
  }

  // add()
  // changeFilter(filter: any)
  // edit(row: any)
  // delete(row: any)
  // changeTable(event: any)
}
