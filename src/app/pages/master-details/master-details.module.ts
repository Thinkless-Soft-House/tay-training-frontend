import { DrivenFormsDirectivesModule } from '../../core/shared/directives/driven-forms-directives.module';
import { ComponentsModule } from '../../core/shared/components/components.module';
import { MaterialBundleModule } from './../../core/material-bundle/material-bundle.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDetailsRoutingModule } from './master-details-routing.module';
import { MasterDetailsComponent } from './master-details.component';
import { DetailsItemComponent } from './details-item/details-item.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [MasterDetailsComponent, DetailsItemComponent],
  imports: [
    CommonModule,
    MasterDetailsRoutingModule,
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
export class MasterDetailsModule {}
