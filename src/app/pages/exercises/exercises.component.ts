import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterTable } from 'src/app/core/classes/master-table.class';
import { DataMasterTable } from 'src/app/core/interfaces/data-master-table.interface';
import { ExercisesService } from 'src/app/services/exercises.service';
import { ServiceBackendItemService } from 'src/app/services/service-backend-item.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: [
    '../../core/shared/scss/master-details.shared.scss',
    './exercises.component.scss',
  ],
})
export class ExercisesComponent extends MasterTable<ServiceBackendItemService> {
  constructor(
    router: Router,
    public exercisesService: ExercisesService
  ) {
    const data: DataMasterTable = {
      title: 'Exercises',
      targetFilters: ['Name', 'Description'],
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        // { name: 'description', title: 'Description' },
      ],
      path: '/exercises',
    };
    super(router, exercisesService, data);
  }

  // add()
  // changeFilter(filter: any)
  // edit(row: any)
  // delete(row: any)
  // changeTable(event: any)
}
