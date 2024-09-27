import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/shared/guards/auth.guard';
import { unauthGuard } from './core/shared/guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [unauthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [authGuard],
  },
  {
    path: 'master-details',
    loadChildren: () =>
      import('./pages/master-details/master-details.module').then(
        (m) => m.MasterDetailsModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'exercises',
    loadChildren: () =>
      import('./pages/exercises/exercises.module').then(
        (m) => m.ExercisesModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./pages/workouts/workouts.module').then((m) => m.WorkoutsModule),
    canActivate: [authGuard],
  },
  {
    path: 'methods',
    loadChildren: () =>
      import('./pages/methods/methods.module').then((m) => m.MethodsModule),
    canActivate: [authGuard],
  },
  {
    path: 'exercise-set',
    loadChildren: () =>
      import('./pages/exercise-set/exercise-set.module').then(
        (m) => m.ExerciseSetModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'planner-v1',
    loadChildren: () =>
      import('./pages/planner/planner.module').then((m) => m.PlannerModule),
  },
  {
    path: 'planner',
    loadChildren: () =>
      import('./pages/planner-v2/planner-v2.module').then(
        (m) => m.PlannerV2Module
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
