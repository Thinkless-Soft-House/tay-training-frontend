import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MethodsComponent } from './methods.component';
import { MethodDetailsComponent } from './method-details/method-details.component';

const routes: Routes = [
  { path: '', component: MethodsComponent },
  { path: ':id', component: MethodDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MethodsRoutingModule {}
