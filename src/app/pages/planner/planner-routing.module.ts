import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlannerComponent } from './planner.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

const routes: Routes = [
  { path: ':slug', component: PlannerComponent },
  { path: ':slug/pdf', component: PdfViewerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlannerRoutingModule {}
