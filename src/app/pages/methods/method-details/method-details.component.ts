import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlInput } from 'src/app/core/classes/control.class';
import { LoadingService } from 'src/app/services/loading.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-method-details',
  templateUrl: './method-details.component.html',
  styleUrls: [
    '../../../core/shared/scss/details-item.shared.scss',
    './method-details.component.scss',
  ],
})
export class MethodDetailsComponent {
  form: { [id: string]: ControlInput } = {
    name: new ControlInput({
      label: 'Nome',
      config: {
        name: 'name',
        hint: 'Nome do método',
        required: true,
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
    description: new ControlInput({
      label: 'Descrição',
      config: {
        name: 'description',
        hint: 'Descreva o método',
        required: true,
        errors: {
          required: 'Campo obrigatório',
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
