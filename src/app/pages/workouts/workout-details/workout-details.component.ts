import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlInput } from 'src/app/core/classes/Control.class';
import { ExerciseSetService } from 'src/app/services/exercise-set.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TrainingDayService } from 'src/app/services/training-day.service';
import { UtilsService } from 'src/app/services/utils.service';
import { WorkoutsService } from 'src/app/services/workouts.service';
import { ExerciseSet } from '../../exercise-set/exercise-set-details/exercise-set-details.component';

enum WeekingDays {
  Sunday = 1,
  Monday = 2,
  Tuesday = 3,
  Wednesday = 4,
  Thursday = 5,
  Friday = 6,
  Saturday = 7,
}

export interface TrainingSheet {
  id?: number;
  name: string;
  publicName: string;
  slug: string;
  offlinePdf?: string;
  newTabPdf?: string;
  pdfPath?: string;
  trainingDays: TrainingDay[];
}
export interface TrainingDay {
  id?: number;
  day: number;
  trainingSheetId: number;
  exerciseGroupId: number;
  shortName: string;

  exerciseGroup?: ExerciseSet;
}

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: [
    '../../../core/shared/scss/details-item.shared.scss',
    './workout-details.component.scss',
  ],
})
export class WorkoutDetailsComponent {
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
      },
    }),
    offlinePdf: new ControlInput({
      label: 'URL do PDF - Baixar',
      config: {
        name: 'offlinePdf',
        maxlength: 100,
        customValidators: {
          urlValidator: true,
        },
        errors: {
          maxlength: 'Máximo de 100 caracteres',
          invalidUrl: 'Url inválida',
        },
      },
    }),
    newTabPdf: new ControlInput({
      label: 'URL do PDF - Nova Aba',
      config: {
        name: 'newTabPdf',
        maxlength: 100,
        customValidators: {
          urlValidator: true,
        },
        errors: {
          maxlength: 'Máximo de 100 caracteres',
          invalidUrl: 'Url inválida',
        },
      },
    }),
  };

  trainingDays: ControlInput[] = [];
  weekDays = [
    { id: WeekingDays.Sunday, name: 'Domingo' },
    { id: WeekingDays.Monday, name: 'Segunda' },
    { id: WeekingDays.Tuesday, name: 'Terça' },
    { id: WeekingDays.Wednesday, name: 'Quarta' },
    { id: WeekingDays.Thursday, name: 'Quinta' },
    { id: WeekingDays.Friday, name: 'Sexta' },
    { id: WeekingDays.Saturday, name: 'Sábado' },
  ];

  allExerciceSets: ExerciseSet[] = [];

  @ViewChild('reactiveForm') formRef!: NgForm;

  isEdit = false;
  editId: number | null = null;
  editData: TrainingSheet | null = null;

  step = 0;

  @ViewChild('pdfPathInput') pdfPathInput: any;
  selectedFile: File | undefined;

  shortNamesInputs: any[] = [];
  savedShortNames: any[] = [];
  constructor(
    private utilsService: UtilsService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public loadingService: LoadingService,
    private workoutService: WorkoutsService,
    private trainingDayService: TrainingDayService,
    private exersiceSetService: ExerciseSetService
  ) {
    this.createTrainingDaysControllers();
  }

  handleFileInputChange(input: any) {
    const files = input.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  clearSelectedFile() {
    this.selectedFile = undefined;
    this.pdfPathInput.nativeElement.value = '';
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit(): void {}
  async ngAfterViewInit() {
    // console.log('1');
    this.allExerciceSets = await this.exersiceSetService.getAll();
    this.insertSets();
    // console.log('2');
    this.actRoute.params.subscribe(async (params) => {
      if (params['id'] !== 'new') {
        this.isEdit = true;
        this.editId = +params['id'];
        // Load data...
        // console.log('3');
        setTimeout(() => {
          this.loadingService.activeLoading();
        }, 50);

        // Get data from API
        try {
          // console.log('4');
          const data = await this.workoutService.getById(+params['id'], [
            'trainingDays',
          ]);
          this.editData = data;
          // console.log('5');
          console.log('data', data);
          this.formRef.controls['name'].setValue(data.name);
          this.formRef.controls['publicName'].setValue(data.publicName);
          this.formRef.controls['offlinePdf'].setValue(data.offlinePdf);
          this.formRef.controls['newTabPdf'].setValue(data.newTabPdf);
          // console.log('6');
          this.fillTrainingDays(data);
          this.getDistinctWorkouts();
          // console.log('7');
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

  private createTrainingDaysControllers() {
    for (let index = 0; index < 4; index++) {
      for (let index2 = 0; index2 < this.weekDays.length; index2++) {
        const element = this.weekDays[index2];

        let value = index === 0 ? element.id : index * 7 + element.id;
        this.trainingDays.push(
          new ControlInput({
            label: element.name,
            selectOptions: [{ name: 'Sem treino', value: -1 }],
            value: -1,
            config: {
              name: `td_${value}`,
              required: true,
              errors: {
                required: 'Campo obrigatório',
              },
            },
          })
        );
      }
    }
    // this.trainingDays = this.weekDays.map((day) => {
    //   return new ControlInput({
    //     label: day.name,
    //     selectOptions: [{ name: 'Sem treino', value: -1 }],
    //     value: -1,
    //     config: {
    //       name: `td_${day.id.toString()}`,
    //       required: true,
    //       errors: {
    //         required: 'Campo obrigatório',
    //       },
    //     },
    //   });
    // });
  }

  private insertSets() {
    this.trainingDays.map((day) => {
      const atualList = day.selectOptions;
      atualList.push(
        ...this.allExerciceSets.map((x) => ({ name: x.name, value: x.id }))
      );

      return { ...day, selectOptions: atualList };
    });
  }

  private fillTrainingDays(data: TrainingSheet) {
    for (const day of data.trainingDays) {
      const control = this.trainingDays.find(
        (e) => e.config.name === `td_${day.day}`
      );
      if (control) {
        control.value = day.exerciseGroupId;
        this.savedShortNames.push({
          exerciseGroupId: day.exerciseGroupId,
          value: day.shortName || null,
        });
      }
    }
  }

  getErrorText(control: ControlInput) {
    return this.formRef && control
      ? this.utilsService.getErrorText(this.formRef, control)
      : '';
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

  getDistinctWorkouts() {
    const workouts = this.trainingDays
      .filter((e) => e.value !== -1)
      .map((e) => e.value);

    if (this.trainingDays.length === 0) {
      this.shortNamesInputs = [];
      return [];
    }

    // console.log('workouts', workouts);

    this.shortNamesInputs = [...new Set(workouts)]
      .map((id) => {
        return this.trainingDays.find((control) => control.value === id);
      })
      .filter((e) => e!.value !== -1)
      .map((e) => {
        return {
          day: +e!.config.name.split('_')[1],
          exerciseGroupId: e!.value,
        };
      })
      .sort((a, b) => a.day - b.day)
      .map((e, index) => {
        return {
          ...e,
          name: this.allExerciceSets.find((x) => x.id === e.exerciseGroupId)
            ?.name,
          defaultShortName:
            this.savedShortNames.find(
              (ssn) => ssn.exerciseGroupId === e.exerciseGroupId
            )?.value || `Treino ${index + 1}`,
        };
      });

    console.log('this.shortNamesInputs', this.shortNamesInputs);

    return [];
  }

  async onSubmit() {
    // console.log('onSubmit', this.formRef);
    const data = this.formRef.value;
    // console.log('form value', data);

    const sheet = {
      name: data.name,
      publicName: data.publicName,
      offlinePdf: data.offlinePdf,
      newTabPdf: data.newTabPdf,
      trainingDays: this.trainingDays
        .filter((e) => e.value !== -1)
        .map((e) => {
          return {
            day: +e.config.name.split('_')[1],
            exerciseGroupId: e.value,
            shortName: this.shortNamesInputs.find(
              (x) => x.exerciseGroupId === e.value
            )?.defaultShortName,
          };
        }),
    } as TrainingSheet;
    // console.log('data', data);
    // console.log('sheet', sheet);

    // const a = sheet.trainingDays.map((e) => {
    //   return {
    //     ...e,
    //     exerciseSetName: this.allExerciceSets.find(
    //       (x) => x.id === e.exerciseGroupId
    //     )?.name,
    //     exerciseSetPublicName: this.allExerciceSets.find(
    //       (x) => x.id === e.exerciseGroupId
    //     )?.publicName,
    //   };
    // });

    // console.log('a', a);
    // return;

    // console.log('sheet', sheet);

    if (this.isEdit) {
      // Update

      try {
        const formData = new FormData();

        formData.append('name', sheet.name);
        formData.append('publicName', sheet.publicName);
        formData.append('offlinePdf', sheet.offlinePdf || '');
        formData.append('newTabPdf', sheet.newTabPdf || '');

        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }
        console.log('sheet', sheet);
        const sheetCreated = await this.workoutService.update(
          this.editId!,
          formData
        );
        console.log('sheetCreated', sheetCreated);

        // update list Days
        const result = await this.trainingDayService.updateList(
          sheet.trainingDays.map((e) => {
            return {
              ...e,
              trainingSheetId: this.editId!,
            };
          })
        );
        this.router.navigate(['workouts']);
      } catch (error) {
        // console.log('error on update', error);
      }
    } else {
      // Create
      try {
        const formData = new FormData();

        formData.append('name', sheet.name);
        formData.append('publicName', sheet.publicName);
        formData.append('offlinePdf', sheet.offlinePdf || '');
        formData.append('newTabPdf', sheet.newTabPdf || '');
        formData.append('trainingDays', JSON.stringify(sheet.trainingDays));

        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }

        // Create Sheet
        const sheetCreated = await this.workoutService.create(formData);
        // Create Days

        this.router.navigate(['workouts']);
      } catch (error) {
        // console.log('error on create', error);
      }
    }
  }
}
