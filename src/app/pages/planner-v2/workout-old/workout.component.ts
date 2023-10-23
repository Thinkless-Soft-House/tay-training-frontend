import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from 'src/app/services/workouts.service';
import {
  TrainingSheet,
  TrainingDay,
} from '../../workouts/workout-details/workout-details.component';
import {
  Exercise,
  ExerciseConfiguration,
  ExerciseSet,
} from '../../exercise-set/exercise-set-details/exercise-set-details.component';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['../planner-v2.default.scss', './workout.component.scss'],
})
export class WorkoutComponent implements OnInit, OnDestroy {
  planner: TrainingSheet | null = null;
  week: (TrainingDay | null)[] = [];
  workout: ExerciseSet | null = null;
  weekParam = 0;
  workoutParam = 0;

  constructor(
    private workoutsService: WorkoutsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
  async ngOnInit() {
    document.body.classList.add('theme-alternate');

    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.weekParam = +this.activatedRoute.snapshot.paramMap.get('week')!;
    this.workoutParam = +this.activatedRoute.snapshot.paramMap.get('workout')!;

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
    if (!this.planner) return;

    this.week = this.pickDaysOfWeek(+this.weekParam!);
    if (
      this.week[this.weekParam] === undefined ||
      !this.week[this.weekParam]?.exerciseGroup
    ) {
      this.router.navigate([`/planner-v2/${slug}`]);
    } else {
      this.workout = this.week[this.weekParam]!.exerciseGroup || null;
    }
    console.log(this.week);
    return;
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

  goToExercise(exercise: number) {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    const week = this.activatedRoute.snapshot.paramMap.get('week');
    this.router.navigate([
      `/planner-v2/${slug}/semana/${week}/treino/${this.workoutParam}/exercicio/${exercise}`,
    ]);
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

  ngOnDestroy(): void {
    document.body.classList.remove('theme-alternate');
  }
}
