import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterDetailsComponent } from './master-details.component';
import { DetailsItemComponent } from './details-item/details-item.component';

const routes: Routes = [
  { path: '', component: MasterDetailsComponent },
  { path: ':id', component: DetailsItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDetailsRoutingModule {}
