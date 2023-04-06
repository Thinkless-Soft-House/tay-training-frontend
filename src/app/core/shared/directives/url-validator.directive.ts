import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { urlValidator } from '../validators/url-validator.validator';

@Directive({
  selector: '[v-url-validator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UrlValidatorDirective, multi: true },
  ],
})
export class UrlValidatorDirective {
  @Input('v-url-validator') hasActive!: boolean;
  validate(control: AbstractControl): ValidationErrors | null {
    return urlValidator()(control);
  }
}
