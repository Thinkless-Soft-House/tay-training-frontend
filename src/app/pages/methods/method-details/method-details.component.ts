import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlInput } from 'src/app/core/classes/Control.class';
import { LoadingService } from 'src/app/services/loading.service';
import { MethodsService } from 'src/app/services/methods.service';
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

  isEdit = false;
  editId?: string;
  constructor(
    private utilsService: UtilsService,
    private actRoute: ActivatedRoute,
    public loadingService: LoadingService,
    private methodsService: MethodsService,
    private router: Router
  ) {
    actRoute.params.subscribe((params) => {
      // console.log('params', params);
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.actRoute.params.subscribe(async (params) => {
      if (params['id'] !== 'new') {
        this.isEdit = true;
        this.editId = params['id'];
        // Load data...
        setTimeout(() => {
          this.loadingService.activeLoading();
        }, 50);
        // setTimeout(() => {
        //   this.formRef.setValue({
        //     name: 'Teste',
        //     description: 'Mais um teste',
        //   });
        //   this.loadingService.deactiveLoading();
        // }, 2000);

        // Get data from API
        try {
          const data = await this.methodsService.getById(+params['id']);
          // console.log('data', data);
          this.formRef.setValue({
            name: data.name,
            description: data.description,
          });
        } catch (error) {
          console.error(error);
        } finally {
          setTimeout(() => {
            this.loadingService.deactiveLoading();
          }, 200);
        }
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
    // console.log('maskFilled');
  }

  dateEvents(name: string, event: any) {
    // console.log('dateEvents', name, event);
  }

  async onSubmit() {
    // console.log('onSubmit', this.formRef);
    const data = this.formRef.value;
    // console.log('form value', data);

    if (this.isEdit) {
      // Update

      try {
        await this.methodsService.update(+this.editId!, data);
        this.router.navigate(['methods']);
      } catch (error) {
        // console.log('error on update', error);
      }
    } else {
      // Create
      try {
        await this.methodsService.create(data);
        this.router.navigate(['methods']);
      } catch (error) {
        // console.log('error on create', error);
      }
    }
  }
}
