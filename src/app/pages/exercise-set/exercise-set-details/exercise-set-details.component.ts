import { ExercisesService } from 'src/app/services/exercises.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlInput } from 'src/app/core/classes/control.class';
import { LoadingService } from 'src/app/services/loading.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ExerciseSetService } from 'src/app/services/exercise-set.service';
import { MethodsService } from 'src/app/services/methods.service';
import { ExerciseMethodService } from 'src/app/services/exercise-method.service';
import { ExerciseConfigurationService } from 'src/app/services/exercise-configuration.service';
import { SetCategoriesService } from 'src/app/services/set-categories.service';

export interface ExerciseSet {
  id?: number;
  name: string;
  category: string;

  exerciseMethods?: ExerciseMethod[];
}

export interface ExerciseConfiguration {
  id?: number;
  series: string;
  reps: string;
  exerciseMethodId?: number;
  exerciseId: number;
  methodId: number;
}

export interface ExerciseMethod {
  id?: number;
  type: string;
  rest: string;
  exerciseGroupId?: number;
  exerciseConfigurations?: ExerciseConfiguration[];
}

@Component({
  selector: 'app-exercise-set-details',
  templateUrl: './exercise-set-details.component.html',
  styleUrls: [
    '../../../core/shared/scss/details-item.shared.scss',
    './exercise-set-details.component.scss',
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
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
        { name: 'Opção 0', value: '0' },
        { name: 'Opção 1', value: '1' },
        { name: 'Opção 2', value: '2' },
        { name: 'Opção 3', value: '3' },
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

  exerciseMethodController: {
    manyExercises: ControlInput;
    restTime: ControlInput;
  } = {
    manyExercises: new ControlInput({
      label: 'Exercícios por série',
      value: 'ONESET',
      config: {
        name: 'manyExercises',
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
    restTime: new ControlInput({
      label: 'Tempo de descanso',
      config: {
        name: 'restTime',
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
  };

  oneSetExercise: {
    exercise: ControlInput;
    method?: ControlInput;
    series: ControlInput;
    repetitions: ControlInput;
  };
  biSetExercise: {
    exercise: ControlInput;
    method?: ControlInput;
    series: ControlInput;
    repetitions: ControlInput;
  };
  triSetExercise: {
    exercise: ControlInput;
    method?: ControlInput;
    series: ControlInput;
    repetitions: ControlInput;
  };

  exercicies: ExerciseMethod[] = [];

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

  typeExercise = [
    { name: 'One Set', value: 'ONESET' },
    { name: 'Bi Set', value: 'BISET' },
    { name: 'Tri Set', value: 'TRISET' },
  ];
  // Exercises table Configurations

  // columns = [
  //   { name: 'exercise', title: 'Exercício' },
  //   { name: 'method', title: 'Método' },
  //   { name: 'series', title: 'Séries' },
  //   { name: 'sleepTime', title: 'Tempo de descanso' },
  //   { name: 'repetitions', title: 'Repetições' },
  // ];
  columnsDisplay = ['type', 'countExercicies', 'actions'];
  expandedExercise: ExerciseMethod | null = null;

  @ViewChild('reactiveForm') formRef!: NgForm;
  @ViewChild('tableExercisies') table!: MatTable<any> | null;

  isEdit = false;
  editId: number | null = null;
  exerciseMethodSaved: ExerciseMethod[] = [];

  constructor(
    private utilsService: UtilsService,
    private actRoute: ActivatedRoute,
    public loadingService: LoadingService,
    private router: Router,
    private exercisesService: ExercisesService,
    private methodsService: MethodsService,
    private exerciseSetService: ExerciseSetService,
    private exerciseMethodsService: ExerciseMethodService,
    private exerciseConfigurationService: ExerciseConfigurationService,
    private categoriesService: SetCategoriesService
  ) {
    this.oneSetExercise = this.initOneBiAndTriSetForms('oneSetExercise');
    this.biSetExercise = this.initOneBiAndTriSetForms('biSetExercise');
    this.triSetExercise = this.initOneBiAndTriSetForms('triSetExercise');
  }

  async ngOnInit() {
    const prom1 = this.exercisesService.getAll();
    const prom2 = this.methodsService.getAll();
    const prom3 = this.categoriesService.getAll();

    const [exercises, methods, setCategories] = await Promise.all([
      prom1,
      prom2,
      prom3,
    ]);

    this.allExercises = exercises.map((e: any) => {
      return { name: e.name, value: e.id };
    });

    this.allMethods = methods.map((e: any) => {
      return { name: e.name, value: e.id };
    });

    this.form['setCategories'].selectOptions = setCategories.map((e: any) => {
      return { name: e.name, value: e.id };
    });

    console.log('exercise', this.allExercises);
    console.log('methods', this.allMethods);

    this.oneSetExercise.exercise.selectOptions = this.allExercises;
    this.biSetExercise.exercise.selectOptions = this.allExercises;
    this.triSetExercise.exercise.selectOptions = this.allExercises;

    this.oneSetExercise.method!.selectOptions = this.allMethods;
    this.biSetExercise.method!.selectOptions = this.allMethods;
    this.triSetExercise.method!.selectOptions = this.allMethods;
  }
  ngAfterViewInit() {
    this.actRoute.params.subscribe(async (params) => {
      if (params['id'] !== 'new') {
        setTimeout(() => {
          this.loadingService.activeLoading();
        }, 50);
        // Load data...
        this.isEdit = true;
        this.editId = params['id'];

        const exerciseGroup: ExerciseSet =
          await this.exerciseSetService.getById(this.editId!, [
            'exerciseMethods',
            'exerciseMethods.exerciseConfigurations',
          ]);

        console.log('exerciseGroup', exerciseGroup);

        this.formRef.controls['name'].setValue(exerciseGroup.name);
        this.formRef.controls['setCategories'].setValue(exerciseGroup.category);

        this.exercicies = exerciseGroup.exerciseMethods!;
        this.exerciseMethodSaved = JSON.parse(JSON.stringify(this.exercicies));

        setTimeout(() => {
          this.loadingService.deactiveLoading();
        }, 50);
      }
    });
  }

  getExercise(exercise: number) {
    return !!this.allExercises.find((x) => x.value === exercise)
      ? this.allExercises.find((x) => x.value === exercise)!.name
      : '';
  }

  getMethod(method: number) {
    return !!this.allMethods.find((x) => x.value === method)
      ? this.allMethods.find((x) => x.value === method)!.name
      : '';
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

  // Init new exercise methods

  // dragdropEvent(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.exercicies, event.previousIndex, event.currentIndex);
  // }

  private initOneBiAndTriSetForms(
    prefix: 'oneSetExercise' | 'biSetExercise' | 'triSetExercise'
  ) {
    const model = {
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
          type: 'text',
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

    model.exercise.config.name = `${prefix}_exercise`;
    model.method.config.name = `${prefix}_method`;
    model.series.config.name = `${prefix}_series`;
    model.repetitions.config.name = `${prefix}_repetitions`;

    return model;
  }
  private extractOneBiAndTriSetForms(
    set: 'oneSetExercise' | 'biSetExercise' | 'triSetExercise'
  ): ExerciseConfiguration {
    return {
      exerciseId: this.formRef.form.controls[`${set}_exercise`].value,
      methodId: this.formRef.form.controls[`${set}_method`].value,
      series: this.formRef.form.controls[`${set}_series`].value,
      reps: this.formRef.form.controls[`${set}_repetitions`].value,
    };
  }
  private populateOneBiAndTriSetForms(
    set: 'oneSetExercise' | 'biSetExercise' | 'triSetExercise',
    config: ExerciseConfiguration
  ): void {
    this.formRef.form.controls[`${set}_exercise`].setValue(config.exerciseId);
    this.formRef.form.controls[`${set}_method`].setValue(config.methodId);
    this.formRef.form.controls[`${set}_series`].setValue(config.series);
    this.formRef.form.controls[`${set}_repetitions`].setValue(config.reps);
  }
  private populateSetForms(exercise: ExerciseMethod): void {
    this.resetAllSetForms();

    if (exercise.exerciseConfigurations![0]) {
      this.populateOneBiAndTriSetForms(
        'oneSetExercise',
        exercise.exerciseConfigurations![0] as ExerciseConfiguration
      );
    }
    if (exercise.exerciseConfigurations![1]) {
      this.populateOneBiAndTriSetForms(
        'biSetExercise',
        exercise.exerciseConfigurations![1] as ExerciseConfiguration
      );
    }
    if (exercise.exerciseConfigurations![2]) {
      this.populateOneBiAndTriSetForms(
        'triSetExercise',
        exercise.exerciseConfigurations![2] as ExerciseConfiguration
      );
    }
  }
  private resetOneBiAndTriSetForms(
    set: 'oneSetExercise' | 'biSetExercise' | 'triSetExercise'
  ): void {
    console.log('set', set);
    console.log('form', this.formRef);
    this.formRef.form.controls[`${set}_exercise`].reset();
    this.formRef.form.controls[`${set}_method`].reset();
    this.formRef.form.controls[`${set}_series`].reset();
    this.formRef.form.controls[`${set}_repetitions`].reset();
  }
  private resetAllSetForms(): void {
    this.resetOneBiAndTriSetForms('oneSetExercise');
    if (this.exerciseMethodController.manyExercises.value !== 'ONESET')
      this.resetOneBiAndTriSetForms('biSetExercise');
    if (this.exerciseMethodController.manyExercises.value === 'TRISET')
      this.resetOneBiAndTriSetForms('triSetExercise');
  }

  issueValuesNewExercise() {
    let ret = '';

    // if (!this.newExercise.exercise.value)
    //   ret += `Exercício: Campo obrigatório \r\n`;
    // if (this.newExercise.method && !this.newExercise.method.value)
    //   ret += `Método: Campo obrigatório \r\n`;
    // if (!this.newExercise.series.value) ret += `Séries: Campo obrigatório \r\n`;
    // if (!this.newExercise.sleepTime.value)
    //   ret += `Tempo de descanso: Campo obrigatório\r\n`;
    // if (!this.newExercise.repetitions.value)
    //   ret += `Repetições: Campo obrigatório`;

    return ret;
  }

  addExercise() {
    // Check the Exercise type betwenn one, bi or tri set
    const configExercises = [];
    if (this.exerciseMethodController.manyExercises.value === 'ONESET') {
      // Fill one Config Exercise and push to array

      const oneSet: ExerciseConfiguration =
        this.extractOneBiAndTriSetForms('oneSetExercise');
      configExercises.push(oneSet);
    } else if (this.exerciseMethodController.manyExercises.value === 'BISET') {
      const oneSet: ExerciseConfiguration =
        this.extractOneBiAndTriSetForms('oneSetExercise');
      const biSet: ExerciseConfiguration =
        this.extractOneBiAndTriSetForms('biSetExercise');
      configExercises.push(oneSet);
      configExercises.push(biSet);
    } else if (this.exerciseMethodController.manyExercises.value === 'TRISET') {
      const oneSet: ExerciseConfiguration =
        this.extractOneBiAndTriSetForms('oneSetExercise');
      const biSet: ExerciseConfiguration =
        this.extractOneBiAndTriSetForms('biSetExercise');
      const triSet: ExerciseConfiguration =
        this.extractOneBiAndTriSetForms('triSetExercise');
      configExercises.push(oneSet);
      configExercises.push(biSet);
      configExercises.push(triSet);
    }

    const exercise: ExerciseMethod = {
      type: this.exerciseMethodController.manyExercises.value as string,
      rest: this.exerciseMethodController.restTime.value as string,
      exerciseConfigurations: configExercises,
    };
    this.exercicies.push(exercise);
    this.table?.renderRows();

    console.log(this.exercicies);
    this.resetAllSetForms();
  }

  removeExercise(event: any, index: number) {
    event.stopPropagation();
    console.log('index', index);
    this.exercicies.splice(index, 1);
    this.table?.renderRows();

    console.log('exercisies', this.exercicies);
  }

  editExercise(event: any, index: number) {
    event.stopPropagation();
    const exercise = this.exercicies[index];

    this.formRef.form.controls[`manyExercises`].setValue(exercise.type);
    this.populateSetForms(exercise);

    this.removeExercise(event, index);
  }

  // End new exercise methods

  maskFilled(control: ControlInput) {
    console.log('maskFilled');
  }

  dateEvents(name: string, event: any) {
    console.log('dateEvents', name, event);
  }

  async onSubmit() {
    console.log('Iniciando o submit');
    const data = this.formRef.value;

    try {
      // Create Exercise Groups (Exercise Set)
      console.log('Criando o grupo de exercícios');
      const exerciseSet: ExerciseSet = {
        name: data.name,
        category: data.setCategories,
      };

      console.log('Salvando/Atualizando o grupo de exercícios');
      const exerciseSetCreated = !this.isEdit
        ? await this.exerciseSetService.create(exerciseSet)
        : await this.exerciseSetService.update(this.editId!, exerciseSet);

      console.log('Grupo salvo/atualizado com sucesso');
      console.log('Criando os métodos de exercícios');
      // Create Exercise Methods
      const queryToSave = this.exercicies.map(async (e, i) => {
        console.log('Map index', i);
        const toSave = {
          id: e.id ? e.id : undefined,
          type: e.type,
          rest: e.rest,
          exerciseGroupId: exerciseSetCreated.id,
        };

        console.log('Para salvar => ', toSave);
        const exerciseMethodCreated = !toSave.id
          ? await this.exerciseMethodsService.create(toSave)
          : await this.exerciseMethodsService.update(toSave.id, toSave);

        console.log('Método de exercício salvo/atualizado com sucesso');
        console.log('Criando as configurações de exercícios');
        const exerciseConfigurations: ExerciseConfiguration[] =
          e.exerciseConfigurations!.map((exerciseConfiguration) => {
            return {
              ...exerciseConfiguration,
              exerciseMethodId: exerciseMethodCreated.id,
            };
          });

        console.log(
          'Configurações de exercícios montadas para salvar/editar',
          exerciseConfigurations
        );
        const exerciseConfigurationCreated = !this.isEdit
          ? await this.exerciseConfigurationService.createMany(
              exerciseConfigurations
            )
          : await this.exerciseConfigurationService.updateListExerciseMethod(
              exerciseConfigurations
            );

        console.log('Configurações de exercicios salvas com sucesso');
        const ret = {
          exerciseSetId: exerciseSetCreated.id,
          exerciseMethodId: exerciseMethodCreated.id,
          exerciseConfigurationIds: exerciseConfigurationCreated,
        };

        console.log('Rerutn final');
        return ret;
      });

      await Promise.all(queryToSave);
      if (this.isEdit) await this.checkExerciseMethodsCreated();
      // Create Exercise Configurations

      this.router.navigate(['exercise-set']);
    } catch (error) {
      console.log('error on create', error);
    }
  }

  private async checkExerciseMethodsCreated() {
    const deletedOnes = this.exerciseMethodSaved.filter(
      (em) =>
        !this.exercicies
          .filter((e) => e.id)
          .map((e) => e.id)
          .includes(em.id)
    );

    const d$ = deletedOnes.map((em) =>
      this.exerciseMethodsService.delete(em.id!)
    );
    const d = await Promise.all(d$);
    return d;
  }
}
