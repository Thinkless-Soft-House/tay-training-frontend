import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      control.value === null ||
      control.value === undefined ||
      control.value === ''
    ) {
      console.log('on validator return null');
      return null;
    }

    // expressão regular para validar URLs
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    // verifica se a URL corresponde à expressão regular
    if (!urlRegex.test(control.value)) {
      // se a URL for inválida, retorne uma chave 'invalidUrl' com valor verdadeiro
      return { invalidUrl: true };
    }

    // se a URL passar por todas as verificações acima, ela é válida
    return null;
  };
}
