import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlInput } from 'src/app/core/classes/control.class';
import { LoadingService } from 'src/app/services/loading.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-exercise-set-details',
  templateUrl: './exercise-set-details.component.html',
  styleUrls: [
    '../../../core/shared/scss/details-item.shared.scss',
    './exercise-set-details.component.scss',
  ],
})
export class ExerciseSetDetailsComponent {
  form: { [id: string]: ControlInput } = {
    name: new ControlInput({
      label: 'Nome',
      config: {
        name: 'name',
        required: true,
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
    setCategories: new ControlInput({
      label: 'Categoria do treino',
      selectOptions: [
        { name: 'Opção 0', value: 0 },
        { name: 'Opção 1', value: 1 },
        { name: 'Opção 2', value: 2 },
        { name: 'Opção 3', value: 3 },
      ],
      config: {
        name: 'setCategories',
        required: true,
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
  };

  newExercise: {
    exercise: ControlInput;
    method?: ControlInput;
    series: ControlInput;
    sleepTime: ControlInput;
    repetitions: ControlInput;
  } = {
    exercise: new ControlInput({
      label: 'Exercício',
      selectOptions: [
        { name: 'Opção 0', value: 0 },
        { name: 'Opção 1', value: 1 },
        { name: 'Opção 2', value: 2 },
        { name: 'Opção 3', value: 3 },
      ],
      config: {
        name: 'exercise',
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
    method: new ControlInput({
      label: 'Método',
      selectOptions: [
        { name: 'Opção 0', value: 0 },
        { name: 'Opção 1', value: 1 },
        { name: 'Opção 2', value: 2 },
        { name: 'Opção 3', value: 3 },
      ],
      config: {
        name: 'method',
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
    series: new ControlInput({
      label: 'Séries',
      config: {
        name: 'series',
        type: 'number',
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
    sleepTime: new ControlInput({
      label: 'Tempo de descanso',
      config: {
        name: 'sleepTime',
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
    repetitions: new ControlInput({
      label: 'Repetições',
      config: {
        name: 'repetitions',
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
  };

  exercicies: {
    exercise: number;
    method?: number;
    series: number;
    sleepTime: number;
    repetitions: number;
  }[] = [];

  allExercises = [
    { name: 'Treino 0', value: 0 },
    { name: 'Treino 1', value: 1 },
    { name: 'Treino 2', value: 2 },
    { name: 'Treino 3', value: 3 },
  ];

  allMethods = [
    { name: 'Método 0', value: 0 },
    { name: 'Método 1', value: 1 },
    { name: 'Método 2', value: 2 },
    { name: 'Método 3', value: 3 },
  ];

  // Exercises table Configurations

  columns = [
    { name: 'exercise', title: 'Exercício' },
    { name: 'method', title: 'Método' },
    { name: 'series', title: 'Séries' },
    { name: 'sleepTime', title: 'Tempo de descanso' },
    { name: 'repetitions', title: 'Repetições' },
  ];
  columnsDisplay = [
    'exercise',
    'method',
    'series',
    'sleepTime',
    'repetitions',
    'actions',
  ];

  @ViewChild('reactiveForm') formRef!: NgForm;
  constructor(
    private utilsService: UtilsService,
    private actRoute: ActivatedRoute,
    public loadingService: LoadingService
  ) {
    console.log(this.newExercise);
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
          this.formRef.controls['name'].setValue('Treino 1');
          this.formRef.controls['setCategories'].setValue(1);

          this.exercicies = [
            {
              exercise: 2,
              method: 1,
              series: 4,
              sleepTime: 30,
              repetitions: 2,
            },
            {
              exercise: 3,
              method: 2,
              series: 4,
              sleepTime: 30,
              repetitions: 2,
            },
          ];
          this.loadingService.deactiveLoading();
        }, 2000);
      }
    });
  }

  getExercise(exercise: number) {
    return this.allExercises.find((x) => x.value === exercise)?.name;
  }

  getMethod(method: number) {
    return this.allMethods.find((x) => x.value === method)?.name;
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
      if (this.form[key] && this.getErrorText(this.form[key]))
        ret += `${this.form[key].label}: ${this.getErrorText(
          this.form[key]
        )}\r\n`;
    }

    return ret;
  }
  issueValuesNewExercise() {
    let ret = '';

    if (!this.newExercise.exercise.value)
      ret += `Exercício: Campo obrigatório \r\n`;
    if (this.newExercise.method && !this.newExercise.method.value)
      ret += `Método: Campo obrigatório \r\n`;
    if (!this.newExercise.series.value) ret += `Séries: Campo obrigatório \r\n`;
    if (!this.newExercise.sleepTime.value)
      ret += `Tempo de descanso: Campo obrigatório\r\n`;
    if (!this.newExercise.repetitions.value)
      ret += `Repetições: Campo obrigatório`;

    return ret;
  }

  addExercise() {
    this.exercicies.push({
      exercise: this.newExercise.exercise.value as number,
      method: this.newExercise.method?.value as number,
      series: this.newExercise.series.value as number,
      sleepTime: this.newExercise.sleepTime.value as number,
      repetitions: this.newExercise.repetitions.value as number,
    });

    this.newExercise.exercise.value = 0;
    if (this.newExercise.method) this.newExercise.method.value = 0;
    this.newExercise.series.value = 0;
    this.newExercise.sleepTime.value = 0;
    this.newExercise.repetitions.value = 0;

    console.log(this.exercicies);
  }

  removeExercise(exercise: {
    exercise: number;
    method?: number | undefined;
    series: number;
    sleepTime: number;
    repetitions: number;
  }) {
    const index = this.exercicies.indexOf(exercise);
    if (index > -1) {
      this.exercicies.splice(index, 1);
    }
  }

  editExercise(exercise: {
    exercise: number;
    method?: number | undefined;
    series: number;
    sleepTime: number;
    repetitions: number;
  }) {
    this.newExercise.exercise.value = exercise.exercise;
    if (this.newExercise.method)
      this.newExercise.method.value = exercise.method!;
    this.newExercise.series.value = exercise.series;
    this.newExercise.sleepTime.value = exercise.sleepTime;
    this.newExercise.repetitions.value = exercise.repetitions;

    this.removeExercise(exercise);
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
