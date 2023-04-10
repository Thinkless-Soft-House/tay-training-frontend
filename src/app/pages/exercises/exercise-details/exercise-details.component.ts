import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlInput } from 'src/app/core/classes/control.class';
import { LoadingService } from 'src/app/services/loading.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: [
    '../../../core/shared/scss/details-item.shared.scss',
    './exercise-details.component.scss',
  ],
})
export class ExerciseDetailsComponent {
  form: { [id: string]: ControlInput } = {
    name: new ControlInput({
      label: 'Nome',
      config: {
        name: 'name',
        hint: 'Nome do usuário',
        required: true,
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
    hasMethod: new ControlInput({
      label: 'Tem método?',
      value: true,
      config: {
        name: 'hasMethod',
      },
    }),
    url: new ControlInput({
      label: 'Link do treino',
      config: {
        name: 'url',

        required: true,
        maxlength: 100,
        minlength: 10,
        customValidators: {
          urlValidator: true,
        },
        errors: {
          required: 'Campo obrigatório',
          minlength: 'Mínimo de 10 caracteres',
          maxlength: 'Máximo de 100 caracteres',
          invalidUrl: 'Url inválida',
        },
      },
    }),
  };

  @ViewChild('reactiveForm') formRef!: NgForm;
  constructor(
    private utilsService: UtilsService,
    private actRoute: ActivatedRoute,
    public loadingService: LoadingService
  ) {
    actRoute.params.subscribe((params) => {
      console.log('params', params);
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.actRoute.params.subscribe((params) => {
      if (params['id'] !== 'new') {
        // Load data...
        setTimeout(() => {
          this.loadingService.activeLoading();
        }, 50);
        setTimeout(() => {
          this.formRef.setValue({
            name: 'Teste',
            hasMethod: true,
            url: 'https://www.google.com',
          });
          this.loadingService.deactiveLoading();
        }, 2000);
      }
    });
  }

  getErrorText(control: ControlInput) {
    return this.utilsService.getErrorText(this.formRef, control);
  }

  issueValues() {
    if (!this.formRef || !this.formRef.form) {
      return '';
    }

    const controls = this.formRef.form.controls;
    const keys = Object.keys(controls);

    let ret = '';
    for (const key of keys) {
      if (this.getErrorText(this.form[key]))
        ret += `${this.form[key].label}: ${this.getErrorText(
          this.form[key]
        )}\r\n`;
    }

    return ret;
  }

  maskFilled(control: ControlInput) {
    console.log('maskFilled');
  }

  dateEvents(name: string, event: any) {
    console.log('dateEvents', name, event);
  }

  onSubmit() {
    console.log('onSubmit', this.formRef);
  }
}
