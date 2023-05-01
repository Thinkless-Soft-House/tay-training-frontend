import { ExercisesService } from './../../../services/exercises.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    description: new ControlInput({
      label: 'Descrição',
      config: {
        name: 'description',
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
    videoUrl: new ControlInput({
      label: 'Link do treino',
      config: {
        name: 'videoUrl',

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

  isEdit = false;
  editId: number | null = null;
  constructor(
    private utilsService: UtilsService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public loadingService: LoadingService,
    private exercisesService: ExercisesService
  ) {
    actRoute.params.subscribe((params) => {
      console.log('params', params);
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.actRoute.params.subscribe(async (params) => {
      if (params['id'] !== 'new') {
        this.isEdit = true;
        this.editId = +params['id'];
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
          const data = await this.exercisesService.getById(+params['id']);
          console.log('data', data);
          this.formRef.setValue({
            name: data.name,
            description: data.description,
            videoUrl: data.videoUrl,
            hasMethod: data.hasMethod,
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
    console.log('maskFilled');
  }

  dateEvents(name: string, event: any) {
    console.log('dateEvents', name, event);
  }

  async onSubmit() {
    console.log('onSubmit', this.formRef);
    const data = this.formRef.value;
    console.log('form value', data);

    if (this.isEdit) {
      // Update

      try {
        await this.exercisesService.update(this.editId!, data);
        this.router.navigate(['exercises']);
      } catch (error) {
        console.log('error on update', error);
      }
    } else {
      // Create
      try {
        await this.exercisesService.create(data);
        this.router.navigate(['exercises']);
      } catch (error) {
        console.log('error on create', error);
      }
    }
  }
}
