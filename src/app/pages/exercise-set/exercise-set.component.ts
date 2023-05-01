import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MasterTable } from 'src/app/core/classes/master-table.class';
import { DataMasterTable } from 'src/app/core/interfaces/data-master-table.interface';
import { ExerciseSetService } from 'src/app/services/exercise-set.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ServiceBackendItemService } from 'src/app/services/service-backend-item.service';

@Component({
  selector: 'app-exercise-set',
  templateUrl: './exercise-set.component.html',
  styleUrls: [
    '../../core/shared/scss/master-details.shared.scss',
    './exercise-set.component.scss',
  ],
})
export class ExerciseSetComponent extends MasterTable<ExerciseSetService> {
  @ViewChild('masterTable') masterTable: any;
  constructor(
    router: Router,
    public exerciseSetService: ExerciseSetService,
    loadingService: LoadingService
  ) {
    const data: DataMasterTable = {
      title: 'Exercise Set',
      targetFilters: ['Name', 'Category'],
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'category', title: 'Category' },
        // { name: 'description', title: 'Description' },
      ],
      path: '/exercise-set',
    };
    super(router, exerciseSetService, data, loadingService);
  }

  // add()
  // changeFilter(filter: any)
  // edit(row: any)

  // changeTable(event: any)
}
