import { ExercisesService } from 'src/app/services/exercises.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
  publicName: string;
  category_id: string;

  exerciseMethods?: ExerciseMethod[];
}

export interface ExerciseConfiguration {
  id?: number;
  series: string;
  reps: string;
  exerciseMethodId?: number;
  exerciseId: number;
  methodId: number;

  exercise?: Exercise;
  method?: Method;
}

export interface ExerciseMethod {
  id?: number;
  rest: string;
  observations: string;

  exerciseGroupId?: number;
  exerciseConfigurations?: ExerciseConfiguration[];
}

export interface Method {
  id?: number;
  name: string;
  description: string;
}
export interface Exercise {
  id?: number;
  name: string;
  description: string;
  videoUrl: string;
  hasMethod: boolean;
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
  pageCanLoad: boolean = false;

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
    publicName: new ControlInput({
      label: 'Nome Publico',
      config: {
        name: 'publicName',
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
    restTime: ControlInput;
    observations: ControlInput;
  } = {
    restTime: new ControlInput({
      label: 'Tempo de descanso',
      config: {
        name: 'restTime',
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
    observations: new ControlInput({
      label: 'Observações',
      config: {
        name: 'observations',
        errors: {
          required: 'Campo obrigatório',
        },
      },
    }),
  };

  newExerciseList: {
    exercise: ControlInput;
    series: ControlInput;
    method: ControlInput;
    repetitions: ControlInput;
  }[] = [];
  newExercise: {
    exercise: ControlInput;
    series: ControlInput;
    method: ControlInput;
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
    private categoriesService: SetCategoriesService,
    private detectorChanges: ChangeDetectorRef
  ) {
    this.newExercise = this.initSetForms();
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

    this.newExercise.exercise.selectOptions = this.allExercises;
    this.newExercise.method.selectOptions = this.allMethods;
    this.newExerciseList.push(this.newExercise);
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

        console.log('formRef', this.formRef);
        this.formRef.controls['name'].setValue(exerciseGroup.name);
        this.formRef.controls['publicName'].setValue(exerciseGroup.publicName);
        this.formRef.controls['setCategories'].setValue(
          exerciseGroup.category_id
        );

        this.exercicies = exerciseGroup.exerciseMethods!;
        this.exerciseMethodSaved = JSON.parse(JSON.stringify(this.exercicies));

        setTimeout(() => {
          this.loadingService.deactiveLoading();
        }, 50);
      }
    });

    setTimeout(() => {
      this.pageCanLoad = true;
      this.detectorChanges.detectChanges();
    }, 200);
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

  issueValuesTraining(called = 'ann') {
    let ret = '';

    if (!this.formRef) {
      return '?';
    }

    // Checar os valores no formulario do form estão todos válidos
    if (
      !this.formRef.controls['name'] ||
      this.formRef.controls['name'].invalid
    ) {
      ret += `Nome: ${this.getErrorText(this.form['name'])}\r\n`;
    }

    if (
      !this.formRef.controls['setCategories'] ||
      this.formRef.controls['setCategories'].invalid
    ) {
      ret += `Categoria: ${this.getErrorText(this.form['setCategories'])}\r\n`;
    }

    // Checar se tem todos os newExercise no array newExerciseList estão completos, alem de verificar se o seu length é maior que 0
    if (this.exercicies.length === 0) {
      ret += `É necessário adicionar pelo menos um exercicio/combinação\r\n`;
    }
    return ret;
  }

  // Init new exercise methods

  // dragdropEvent(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.exercicies, event.previousIndex, event.currentIndex);
  // }

  private initSetForms() {
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
          required: true,
          name: 'exercise',
          errors: {
            required: 'Campo obrigatório',
          },
        },
      }),
      series: new ControlInput({
        label: 'Séries',
        config: {
          required: true,
          name: 'series',
          type: 'text',
          errors: {
            required: 'Campo obrigatório',
          },
        },
      }),
      method: new ControlInput({
        label: 'Método',
        config: {
          name: 'method',
          type: 'text',
        },
      }),
      repetitions: new ControlInput({
        label: 'Repetições',
        config: {
          required: true,
          name: 'repetitions',
          errors: {
            required: 'Campo obrigatório',
          },
        },
      }),
    };

    const prefix = this.newExerciseList.length + 1;

    model.exercise.config.name = `${prefix}_exercise`;
    model.series.config.name = `${prefix}_series`;
    model.method.config.name = `${prefix}_method`;
    model.repetitions.config.name = `${prefix}_repetitions`;

    return model;
  }
  private extractSetForms(): ExerciseConfiguration[] {
    return this.newExerciseList.map((e) => {
      const ret = {
        exerciseId: e.exercise.value as number,
        series: e.series.value as string,
        methodId: e.method.value as number,
        reps: e.repetitions.value as string,
      };

      return ret;
    });
  }
  private resetSetForms() {
    this.exerciseMethodController.observations.value = '';
    this.exerciseMethodController.restTime.value = '';

    this.newExercise = this.initSetForms();
    this.newExercise.exercise.selectOptions = this.allExercises;
    this.newExercise.method.selectOptions = this.allMethods;

    this.newExerciseList = [];
    this.newExerciseList.push(this.newExercise);
  }
  private populateSetForms(exerciseMethods: ExerciseMethod) {
    this.newExerciseList = [];

    this.exerciseMethodController.observations.value =
      exerciseMethods.observations;
    this.exerciseMethodController.restTime.value = exerciseMethods.rest;

    exerciseMethods.exerciseConfigurations!.forEach((e) => {
      const exercise = this.initSetForms();

      exercise.exercise.value = e.exerciseId;
      exercise.series.value = e.series;
      exercise.method.value = e.methodId;
      exercise.repetitions.value = e.reps;

      exercise.exercise.selectOptions = this.allExercises;

      this.newExerciseList.push(exercise);
    });
  }

  issueValuesNewExercise(called = 'ann') {
    let ret = '';

    if (!this.formRef) {
      return '?';
    }

    // Checar os valores no formulario do exerciseMethodController estão todos válidos
    if (
      !this.formRef.controls['restTime'] ||
      this.formRef.controls['restTime'].invalid
    ) {
      ret += `Tempo de descanso: ${this.getErrorText(
        this.exerciseMethodController.restTime
      )}\r\n`;
    }
    if (
      !this.formRef.controls['observations'] ||
      this.formRef.controls['observations'].invalid
    ) {
      ret += `Observações: ${this.getErrorText(
        this.exerciseMethodController.observations
      )}\r\n`;
    }

    // Checar se tem todos os newExercise no array newExerciseList estão completos, alem de verificar se o seu length é maior que 0

    this.newExerciseList.forEach((e, index) => {
      if (!e.exercise.value) {
        ret += `Exercício ${index + 1}: ${this.getErrorText(e.exercise)}\r\n`;
      }

      if (!e.series.value) {
        ret += `Séries ${index + 1}: ${this.getErrorText(e.series)}\r\n`;
      }

      if (!e.repetitions.value) {
        ret += `Repetições ${index + 1}: ${this.getErrorText(
          e.repetitions
        )}\r\n`;
      }
    });
    if (this.newExerciseList.length === 0) {
      ret += `É necessário adicionar pelo menos um exercício\r\n`;
    }
    return ret;
  }

  addNewExercise() {
    console.log('addNewExercise');
    const exercise = this.initSetForms();
    exercise.exercise.selectOptions = this.allExercises;
    exercise.method.selectOptions = this.allMethods;
    console.log('exercise', exercise);
    console.log('newExerciseList pre', this.newExerciseList);
    this.newExerciseList.push(exercise);
    console.log('newExerciseList pos', this.newExerciseList);
  }

  addExercise() {
    const configExercise: ExerciseConfiguration[] = this.extractSetForms();

    const exercise: ExerciseMethod = {
      rest: this.exerciseMethodController.restTime.value as string,
      observations: this.exerciseMethodController.observations.value as string,
      exerciseConfigurations: configExercise,
    };

    this.exercicies.push(exercise);
    this.table?.renderRows();

    this.resetSetForms();
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
        category_id: data.setCategories,
        publicName: data.publicName,
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
        const toSave: ExerciseMethod = {
          id: e.id ? e.id : undefined,
          rest: e.rest,
          observations: e.observations,
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
