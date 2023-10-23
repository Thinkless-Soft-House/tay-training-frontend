import { ExerciseMethodService } from 'src/app/services/exercise-method.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from 'src/app/services/workouts.service';
import {
  ExerciseSet,
  ExerciseConfiguration,
  ExerciseMethod,
} from '../../exercise-set/exercise-set-details/exercise-set-details.component';
import {
  TrainingSheet,
  TrainingDay,
} from '../../workouts/workout-details/workout-details.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['../planner-v2.default.scss', './exercise.component.scss'],
})
export class ExerciseComponent implements OnInit, OnDestroy {
  planner: TrainingSheet | null = null;
  week: (TrainingDay | null)[] = [];
  workout: ExerciseSet | null = null;
  exercise: ExerciseMethod | null = null;
  weekParam = 0;
  workoutParam = 0;
  exerciseParam = 0;

  howToUrls: {
    id: number;
    miniature?: string;
    originalUrl: string;
    url: SafeResourceUrl;
    showIframe: boolean;
    iframeLoaded: number;
  }[] = [];

  hidePrev = true;
  hideNext = true;

  constructor(
    private workoutsService: WorkoutsService,
    private ExerciseMethodService: ExerciseMethodService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
  async ngOnInit() {
    document.body.classList.add('theme-alternate');

    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.weekParam = +this.activatedRoute.snapshot.paramMap.get('week')!;
    this.workoutParam = +this.activatedRoute.snapshot.paramMap.get('workout')!;
    this.exerciseParam =
      +this.activatedRoute.snapshot.paramMap.get('exercise')!;

    if (
      this.weekParam === undefined ||
      this.weekParam === null ||
      isNaN(+this.weekParam) ||
      +this.weekParam < 1 ||
      +this.weekParam > 4
    ) {
      this.router.navigate([`/planner-v2/${slug}`]);
    }
    if (
      this.workoutParam === undefined ||
      this.workoutParam === null ||
      isNaN(+this.workoutParam)
    ) {
      this.router.navigate([`/planner-v2/${slug}`]);
    }
    if (
      this.exerciseParam === undefined ||
      this.exerciseParam === null ||
      isNaN(+this.exerciseParam)
    ) {
      this.router.navigate([`/planner-v2/${slug}`]);
    }

    const res = await this.workoutsService.getByFilter({ slug }, [
      'trainingDays',
      'trainingDays.exerciseGroup',
      'trainingDays.exerciseGroup.category',
      'trainingDays.exerciseGroup.exerciseMethods',
      'trainingDays.exerciseGroup.exerciseMethods.exerciseConfigurations',
      'trainingDays.exerciseGroup.exerciseMethods.exerciseConfigurations.exercise',
      'trainingDays.exerciseGroup.exerciseMethods.exerciseConfigurations.method',
    ]);

    this.planner = res.data[0];

    this.week = this.pickDaysOfWeek(+this.weekParam!);
    if (
      this.week[this.weekParam] === undefined ||
      !this.week[this.weekParam]?.exerciseGroup
    ) {
      this.router.navigate([`/planner-v2/${slug}`]);
    } else {
      this.workout = this.week[this.weekParam]!.exerciseGroup || null;
    }

    this.getExerciseInWork();
    return;
  }

  private getExerciseInWork(exerciseId: number = this.exerciseParam) {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;

    this.exercise =
      this.workout?.exerciseMethods!.find((x) => x.id === exerciseId) || null;

    // Verificar qual o index do exercicio no array
    const allExercises = this.workout?.exerciseMethods!.map((e) => e.id!);
    const currentExerciseIndex = allExercises!.indexOf(exerciseId);
    console.log('currentExerciseIndex', currentExerciseIndex);
    this.hidePrev = currentExerciseIndex === 0;
    this.hideNext = currentExerciseIndex === allExercises!.length - 1;
    if (this.exercise === null) {
      this.router.navigate([`/planner-v2/${slug}`]);
    }

    console.log(this.exercise);
    this.createSanitizeUrls();
  }

  createSanitizeUrls() {
    this.exercise!.exerciseConfigurations!.forEach((config) => {
      const videoId = config!.exercise!.videoUrl!.split('/').pop();

      this.howToUrls.push({
        id: config!.id!,
        miniature: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        originalUrl: config!.exercise!.videoUrl!,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(
          config!.exercise!.videoUrl!
        ),
        showIframe: false,
        iframeLoaded: 0,
      });
    });
  }

  secIframeLink(id: number) {
    const ret = this.howToUrls.find((url) => url.id === id)!;
    return ret;
  }

  pickDaysOfWeek(week: number) {
    // Pegar os dias entre 1 e 28 do mês de acordo com a semana escolhida e preencher os dias faltantes valor = null
    // 1 a 7: 1
    // 8 a 14: 2
    // 15 a 21: 3
    // 22 a 28: 4

    const days = [];
    const start = week * 7 - 6;
    const end = week * 7;
    for (let i = start; i <= end; i++) {
      const element = this.planner?.trainingDays.find((x) => x.day === i);
      if (element) {
        days.push(element);
      } else {
        days.push(null);
      }
    }
    days.splice(0, 1);
    return days;
  }

  getWeekDayName(index: number) {
    switch (index) {
      case 0:
        return 'Segunda';
      case 1:
        return 'Terça';
      case 2:
        return 'Quarta';
      case 3:
        return 'Quinta';
      case 4:
        return 'Sexta';
      case 5:
        return 'Sábado';

      default:
        return '';
    }
  }

  getWorkoutMultiName(ec: ExerciseConfiguration[]) {
    return ec.map((e) => e!.exercise!.name).join(' + ');
  }

  goPrevExercise() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    const week = this.activatedRoute.snapshot.paramMap.get('week');

    const allExercises = this.workout?.exerciseMethods!.map((e) => e.id!);
    const currentExerciseIndex = allExercises!.indexOf(this.exerciseParam);
    if (currentExerciseIndex === 0) {
      this.router.navigate([
        `/planner-v2/${slug}/semana/${week}/treino/${this.workoutParam}`,
      ]);
      return;
    }

    const prevExerciseIndex = currentExerciseIndex - 1;
    const prevExercise = allExercises![prevExerciseIndex];
    console.log('prevExercise', prevExercise);

    this.getExerciseInWork(prevExercise);
  }
  goNextExercise() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    const week = this.activatedRoute.snapshot.paramMap.get('week');

    const allExercises = this.workout?.exerciseMethods!.map((e) => e.id!);
    console.log('allExercises', allExercises);
    const currentExerciseIndex = allExercises!.indexOf(this.exerciseParam);
    const nextExerciseIndex = currentExerciseIndex + 1;
    if (nextExerciseIndex >= allExercises!.length - 1) {
      this.router.navigateByUrl(
        `/planner-v2/${slug}/semana/${week}/treino/${this.workoutParam}`
      );
      return;
    }

    const nextExercise = allExercises![nextExerciseIndex];
    console.log('nextExercise', nextExercise);
    this.getExerciseInWork(nextExercise);
  }

  goBackWeek() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.router.navigate([`/planner-v2/${slug}`]);
  }
  goBackWorkout() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    const week = this.activatedRoute.snapshot.paramMap.get('week');
    this.router.navigate([`/planner-v2/${slug}/semana/${week}`]);
  }
  goBackExercises() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    const week = this.activatedRoute.snapshot.paramMap.get('week');
    const exercise = this.activatedRoute.snapshot.paramMap.get('exercise');

    this.router.navigate([
      `/planner-v2/${slug}/semana/${week}/treino/${this.workoutParam}`,
    ]);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('theme-alternate');
  }
}
