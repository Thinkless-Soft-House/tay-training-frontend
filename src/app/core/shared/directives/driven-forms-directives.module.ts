import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfValidatorDirective } from './cpf-validator.directive';
import { UrlValidatorDirective } from './url-validator.directive';

@NgModule({
  declarations: [CpfValidatorDirective, UrlValidatorDirective],
  imports: [CommonModule],
  exports: [CpfValidatorDirective, UrlValidatorDirective],
})
export class DrivenFormsDirectivesModule {}
