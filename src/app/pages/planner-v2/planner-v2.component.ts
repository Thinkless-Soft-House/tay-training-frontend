import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService, PlannerHomeResponse } from 'src/app/services/workouts.service';

type ErrorType = 'network' | 'empty' | 'unavailable' | null;

@Component({
  selector: 'app-planner-v2',
  templateUrl: './planner-v2.component.html',
  styleUrls: ['./planner-v2.component.scss', './planner-v2.default.scss'],
})
export class PlannerV2Component implements OnInit, OnDestroy {
  planner: any | null = null;
  slug = '';

  // Estados de UI
  isLoading = true;
  errorType: ErrorType = null;

  // Debug mode
  debugClickCount = 0;
  debugClickTimer: any = null;
  showDebugPanel = false;
  debugData: PlannerHomeResponse['debug'] | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workoutsService: WorkoutsService
  ) {}

  async ngOnInit() {
    document.body.classList.add('theme-alternate');
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    await this.loadPlannerData();
  }

  async loadPlannerData() {
    this.isLoading = true;
    this.errorType = null;

    try {
      const result = await this.workoutsService.getPlannerHomeWithDebug(this.slug);
      this.debugData = result.debug;

      if (result.debug.errorType === 'network') {
        this.errorType = 'network';
        this.isLoading = false;
        return;
      }

      if (!result.data || result.debug.errorType === 'empty') {
        this.errorType = 'unavailable';
        this.isLoading = false;
        return;
      }

      this.planner = result.data;
      this.isLoading = false;
    } catch (error: any) {
      this.errorType = 'network';
      this.debugData = {
        url: 'unknown',
        timestamp: Date.now(),
        status: 0,
        statusText: error?.message || 'Erro desconhecido',
        rawResponse: JSON.stringify(error),
        errorType: 'network',
        errorMessage: error?.message
      };
      this.isLoading = false;
    }
  }

  onTitleClick() {
    this.debugClickCount++;
    if (this.debugClickTimer) clearTimeout(this.debugClickTimer);
    this.debugClickTimer = setTimeout(() => { this.debugClickCount = 0; }, 2000);
    if (this.debugClickCount >= 5) {
      this.showDebugPanel = !this.showDebugPanel;
      this.debugClickCount = 0;
    }
  }

  closeDebugPanel() {
    this.showDebugPanel = false;
  }

  copyDebugInfo() {
    const debugText = JSON.stringify(this.debugData, null, 2);
    navigator.clipboard.writeText(debugText).then(() => {
      alert('Debug info copiado!');
    }).catch(() => {
      prompt('Copie o debug info:', debugText);
    });
  }

  async retryLoad() {
    await this.loadPlannerData();
  }

  goToWeek(number: number) {
    this.router.navigate([`/planner/${this.slug}/semana/${number}`]);
  }

  openPdf() {
    this.router.navigateByUrl(`/planner/${this.slug}/pdf`);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('theme-alternate');
    if (this.debugClickTimer) clearTimeout(this.debugClickTimer);
  }
}
