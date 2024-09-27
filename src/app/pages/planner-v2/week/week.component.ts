// week.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  WorkoutsService,
  WeekData,
  TrainingDay,
} from 'src/app/services/workouts.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['../planner-v2.default.scss', './week.component.scss'],
})
export class WeekComponent implements OnInit, OnDestroy {
  planner: WeekData | null = null;
  weekDays: (TrainingDay | null)[] = [];
  weekParam = 0;

  constructor(
    private workoutsService: WorkoutsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    document.body.classList.add('theme-alternate');

    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.weekParam = +this.activatedRoute.snapshot.paramMap.get('week')!;
    if (
      this.weekParam === undefined ||
      this.weekParam === null ||
      isNaN(this.weekParam) ||
      this.weekParam < 1 ||
      this.weekParam > 4
    ) {
      this.router.navigate([`/planner/${slug}`]);
      return;
    }

    try {
      this.planner = await this.workoutsService.getWeekData(
        slug,
        this.weekParam
      );
      if (!this.planner) {
        this.router.navigate([`/planner/${slug}`]);
        return;
      }

      this.weekDays = this.planner.weekDays;
    } catch (error) {
      console.error('Error fetching week data:', error);
      this.router.navigate([`/planner/${slug}`]);
    }
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

  goToWorkout(index: number) {
    if (this.weekDays[index] === null) return;
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    const week = this.weekParam;
    this.router.navigate([`/planner/${slug}/semana/${week}/treino/${index}`]);
  }

  goBack() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.router.navigate([`/planner/${slug}`]);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('theme-alternate');
  }
}
