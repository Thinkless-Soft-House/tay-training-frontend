import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlannerV2Component } from './planner-v2.component';
import { WeekComponent } from './week/week.component';
import { WorkoutComponent } from './workout/workout.component';
import { ExerciseComponent } from './exercise/exercise.component';

const routes: Routes = [
  { path: ':slug', component: PlannerV2Component },
  { path: ':slug/semana/:week', component: WeekComponent },
  { path: ':slug/semana/:week/treino/:workout', component: WorkoutComponent },
  {
    path: ':slug/semana/:week/treino/:workout/exercicio/:exercise',
    component: ExerciseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlannerV2RoutingModule {}
