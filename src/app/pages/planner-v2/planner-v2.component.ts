import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from 'src/app/services/workouts.service';

@Component({
  selector: 'app-planner-v2',
  templateUrl: './planner-v2.component.html',
  styleUrls: ['./planner-v2.component.scss', './planner-v2.default.scss'],
})
export class PlannerV2Component implements OnInit, OnDestroy {
  planner: any | null = null;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workoutsService: WorkoutsService
  ) {}

  async ngOnInit() {
    document.body.classList.add('theme-alternate');
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;

    const res = await this.workoutsService.getByFilter({ slug }, [
      'trainingDays',
    ]);

    this.planner = res.data[0];
    console.log('pdf path', this.planner.pdfPath);
    if (!this.planner) return;
  }

  goToWeek(number: number) {
    console.log(number);
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.router.navigate([`/planner/${slug}/semana/${number}`]);
  }

  openPdf() {
    console.log('open pdf');
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.router.navigateByUrl(`/planner/${slug}/pdf`);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('theme-alternate');
  }
}
