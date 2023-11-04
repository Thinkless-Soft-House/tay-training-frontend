import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from 'src/app/services/workouts.service';
import {
  TrainingDay,
  TrainingSheet,
} from '../../workouts/workout-details/workout-details.component';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['../planner-v2.default.scss', './week.component.scss'],
})
export class WeekComponent implements OnInit, OnDestroy {
  planner: TrainingSheet | null = null;
  week: (TrainingDay | null)[] = [];
  weekParam = 0;

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
    if (
      this.weekParam === undefined ||
      this.weekParam === null ||
      isNaN(+this.weekParam) ||
      +this.weekParam < 1 ||
      +this.weekParam > 4
    ) {
      this.router.navigate([`/planner/${slug}`]);
    }
    const res = await this.workoutsService.getByFilter({ slug }, [
      'trainingDays',
      'trainingDays.exerciseGroup',
      'trainingDays.exerciseGroup.category',
    ]);

    this.planner = res.data[0];
    if (!this.planner) return;

    this.week = this.pickDaysOfWeek(+this.weekParam!);
    // this.week.forEach((day) => {
    //   // Lista de logs importantes da semana

    //   console.log('Dia: ', day?.day);
    //   console.log('Nome curto: ', day?.shortName);
    //   console.log('Nome publico: ', day?.exerciseGroup?.publicName);
    //   console.log('-----###-----');
    // });
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

  goToWorkout(workout: number) {
    console.log(workout);
    if (this.week[workout] === null) return;
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    const week = this.activatedRoute.snapshot.paramMap.get('week');
    console.log(workout);
    this.router.navigate([
      `/planner-v2/${slug}/semana/${week}/treino/${workout}`,
    ]);
  }
  goBack() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.router.navigate([`/planner-v2/${slug}`]);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('theme-alternate');
  }
}
