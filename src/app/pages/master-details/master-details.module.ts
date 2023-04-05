import { ComponentsModule } from './../../core/components/components.module';
import { MaterialBundleModule } from './../../core/material-bundle/material-bundle.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDetailsRoutingModule } from './master-details-routing.module';
import { MasterDetailsComponent } from './master-details.component';

@NgModule({
  declarations: [MasterDetailsComponent],
  imports: [
    CommonModule,
    MasterDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialBundleModule,
    ComponentsModule,
  ],
})
export class MasterDetailsModule {}
