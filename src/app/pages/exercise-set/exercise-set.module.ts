import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';

import { ExerciseSetRoutingModule } from './exercise-set-routing.module';
import { ExerciseSetComponent } from './exercise-set.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MaterialBundleModule } from 'src/app/core/material-bundle/material-bundle.module';
import { ComponentsModule } from 'src/app/core/shared/components/components.module';
import { DrivenFormsDirectivesModule } from 'src/app/core/shared/directives/driven-forms-directives.module';
import { ExerciseSetDetailsComponent } from './exercise-set-details/exercise-set-details.component';

@NgModule({
  declarations: [ExerciseSetComponent, ExerciseSetDetailsComponent],
  imports: [
    CommonModule,
    ExerciseSetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DrivenFormsDirectivesModule,
    MaterialBundleModule,
    ComponentsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTableModule,
    DragDropModule,
  ],
  providers: [provideNgxMask()],
})
export class ExerciseSetModule {}
