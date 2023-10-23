import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlannerV2RoutingModule } from './planner-v2-routing.module';
import { PlannerV2Component } from './planner-v2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MaterialBundleModule } from 'src/app/core/material-bundle/material-bundle.module';
import { ComponentsModule } from 'src/app/core/shared/components/components.module';
import { DrivenFormsDirectivesModule } from 'src/app/core/shared/directives/driven-forms-directives.module';
import { WeekComponent } from './week/week.component';
import { WorkoutComponent as WorkoutOldComponent } from './workout-old/workout.component';
import { ExerciseComponent } from './exercise/exercise.component';
import {
  VideoDialogComponent,
  WorkoutComponent,
} from './workout/workout.component';

@NgModule({
  declarations: [
    PlannerV2Component,
    WeekComponent,
    WorkoutOldComponent,
    WorkoutComponent,
    ExerciseComponent,
    VideoDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DrivenFormsDirectivesModule,
    MaterialBundleModule,
    ComponentsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxExtendedPdfViewerModule,
    PlannerV2RoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlannerV2Module {}
