import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { cpfValidator } from '../validators/cpf-validator.validator';

// selector: '[appCpfValidator]',
@Directive({
  selector: '[v-cpf-validator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CpfValidatorDirective, multi: true },
  ],
})
export class CpfValidatorDirective {
  @Input('v-cpf-validator') hasActive!: boolean;
  validate(control: AbstractControl): ValidationErrors | null {
    return cpfValidator()(control);
  }
}
