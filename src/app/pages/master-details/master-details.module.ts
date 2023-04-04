import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDetailsRoutingModule } from './master-details-routing.module';
import { MasterDetailsComponent } from './master-details.component';


@NgModule({
  declarations: [
    MasterDetailsComponent
  ],
  imports: [
    CommonModule,
    MasterDetailsRoutingModule
  ]
})
export class MasterDetailsModule { }
