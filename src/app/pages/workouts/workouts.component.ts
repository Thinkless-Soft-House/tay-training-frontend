import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterTable } from 'src/app/core/classes/master-table.class';
import { DataMasterTable } from 'src/app/core/interfaces/data-master-table.interface';
import { LoadingService } from 'src/app/services/loading.service';
import { ServiceBackendItemService } from 'src/app/services/service-backend-item.service';
import { WorkoutsService } from 'src/app/services/workouts.service';
import { TrainingSheet } from './workout-details/workout-details.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: [
    '../../core/shared/scss/master-details.shared.scss',
    './workouts.component.scss',
  ],
})
export class WorkoutsComponent extends MasterTable<WorkoutsService> {
  customActionButtons = [
    {
      name: 'view',
      icon: 'visibility',
    },
  ];

  constructor(
    router: Router,
    public workoutsService: WorkoutsService,
    loadingService: LoadingService,
    private location: Location
  ) {
    const data: DataMasterTable = {
      title: 'Treinos',
      targetFilters: ['Name'],
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        // { name: 'description', title: 'Description' },
      ],
      path: '/workouts',
    };
    super(router, workoutsService, data, loadingService);
  }

  // add()
  // changeFilter(filter: any)
  // edit(row: any)
  // delete(row: any)
  // changeTable(event: any)

  customIcon(event: any) {
    console.log(event);
    switch (event.name) {
      case 'view':
        this.callView(event.row);
        break;
    }
  }

  callView(row: TrainingSheet) {
    console.log(row);
    this.openRouteInNewTab(`/planner/${row.slug}`);
  }

  openRouteInNewTab(routePath: string) {
    // Obtém a URL base do aplicativo.
    const baseHref = window.location.origin + '/';
    console.log('location', this.location as any);
    console.log('baseHref', baseHref);

    // Abre a rota em uma nova aba.
    window.open(baseHref + routePath, '_blank');
  }
}
