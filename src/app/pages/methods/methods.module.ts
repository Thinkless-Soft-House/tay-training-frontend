import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MethodsRoutingModule } from './methods-routing.module';
import { MethodsComponent } from './methods.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MaterialBundleModule } from 'src/app/core/material-bundle/material-bundle.module';
import { ComponentsModule } from 'src/app/core/shared/components/components.module';
import { DrivenFormsDirectivesModule } from 'src/app/core/shared/directives/driven-forms-directives.module';
import { MethodDetailsComponent } from './method-details/method-details.component';

@NgModule({
  declarations: [MethodsComponent, MethodDetailsComponent],
  imports: [
    CommonModule,
    MethodsRoutingModule,
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
export class MethodsModule {}
