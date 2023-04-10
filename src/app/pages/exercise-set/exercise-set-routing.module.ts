import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseSetComponent } from './exercise-set.component';

const routes: Routes = [{ path: '', component: ExerciseSetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseSetRoutingModule { }
