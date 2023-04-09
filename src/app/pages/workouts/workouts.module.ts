import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { WorkoutsComponent } from './workouts.component';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MaterialBundleModule } from 'src/app/core/material-bundle/material-bundle.module';
import { ComponentsModule } from 'src/app/core/shared/components/components.module';
import { DrivenFormsDirectivesModule } from 'src/app/core/shared/directives/driven-forms-directives.module';

@NgModule({
  declarations: [WorkoutsComponent, WorkoutDetailsComponent],
  imports: [
    CommonModule,
    WorkoutsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DrivenFormsDirectivesModule,
    MaterialBundleModule,
    ComponentsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class WorkoutsModule {}
