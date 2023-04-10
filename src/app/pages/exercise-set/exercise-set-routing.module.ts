import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseSetComponent } from './exercise-set.component';
import { ExerciseSetDetailsComponent } from './exercise-set-details/exercise-set-details.component';

const routes: Routes = [
  { path: '', component: ExerciseSetComponent },
  { path: ':id', component: ExerciseSetDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseSetRoutingModule {}
