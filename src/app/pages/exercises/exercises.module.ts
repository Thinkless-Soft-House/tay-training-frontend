import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesComponent } from './exercises.component';
import { ExerciseDetailsComponent } from './exercise-details/exercise-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MaterialBundleModule } from 'src/app/core/material-bundle/material-bundle.module';
import { ComponentsModule } from 'src/app/core/shared/components/components.module';
import { DrivenFormsDirectivesModule } from 'src/app/core/shared/directives/driven-forms-directives.module';

@NgModule({
  declarations: [ExercisesComponent, ExerciseDetailsComponent],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
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
export class ExercisesModule {}
