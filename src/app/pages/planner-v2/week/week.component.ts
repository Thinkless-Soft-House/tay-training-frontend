// week.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  WorkoutsService,
  WeekData,
  TrainingDay,
  WeekDataResponse,
} from 'src/app/services/workouts.service';
import { WakeLockService } from 'src/app/services/wake-lock.service';

type ErrorType = 'network' | 'empty' | 'unavailable' | null;

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['../planner-v2.default.scss', './week.component.scss'],
})
export class WeekComponent implements OnInit, OnDestroy {
  planner: WeekData | null = null;
  weekDays: (TrainingDay | null)[] = [];
  weekParam = 0;
  slug = '';

  // Estados de UI
  isLoading = true;
  errorType: ErrorType = null;

  // Debug mode (5 cliques no título)
  debugClickCount = 0;
  debugClickTimer: any = null;
  showDebugPanel = false;
  debugData: WeekDataResponse['debug'] | null = null;

  constructor(
    private workoutsService: WorkoutsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private wakeLockService: WakeLockService
  ) {}

  async ngOnInit() {
    document.body.classList.add('theme-alternate');
    await this.wakeLockService.requestWakeLock();

    this.slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.weekParam = +this.activatedRoute.snapshot.paramMap.get('week')!;

    if (
      this.weekParam === undefined ||
      this.weekParam === null ||
      isNaN(this.weekParam) ||
      this.weekParam < 1 ||
      this.weekParam > 4
    ) {
      this.router.navigate([`/planner/${this.slug}`]);
      return;
    }

    await this.loadWeekData();
  }

  async loadWeekData() {
    this.isLoading = true;
    this.errorType = null;

    try {
      const result = await this.workoutsService.getWeekDataWithDebug(
        this.slug,
        this.weekParam
      );

      // Guardar debug info para o painel escondido
      this.debugData = result.debug;

      // Caso 1: Erro de rede (status != 2xx ou status 0)
      if (result.debug.errorType === 'network') {
        this.errorType = 'network';
        this.isLoading = false;
        return;
      }

      // Caso 2: Resposta vazia ou inválida (status 2xx mas sem dados)
      if (!result.data || result.debug.errorType === 'empty' || result.debug.errorType === 'invalid') {
        this.errorType = 'unavailable';
        this.isLoading = false;
        return;
      }

      // Caso 3: Dados válidos - verificar se todos são folga
      const hasAnyTraining = result.data.weekDays.some(day => day !== null);

      if (!hasAnyTraining) {
        // Verificar se é um treino que deveria ter dados (baseado no nome)
        // Se o planner existe mas não tem treinos, pode ser erro
        // Vamos mostrar como "unavailable" para o usuário poder reportar
        this.errorType = 'empty';
        this.planner = result.data;
        this.weekDays = result.data.weekDays;
        this.isLoading = false;
        return;
      }

      // Caso 4: Tudo OK - mostrar os treinos (pode ter folgas reais)
      this.planner = result.data;
      this.weekDays = result.data.weekDays;
      this.isLoading = false;

    } catch (error: any) {
      // Fallback para erros não tratados
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

  /**
   * Handler para cliques no título (5 cliques = modo debug)
   */
  onTitleClick() {
    this.debugClickCount++;

    // Reset após 2 segundos sem cliques
    if (this.debugClickTimer) {
      clearTimeout(this.debugClickTimer);
    }

    this.debugClickTimer = setTimeout(() => {
      this.debugClickCount = 0;
    }, 2000);

    // 5 cliques abre o painel de debug
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
      // Fallback para navegadores sem clipboard API
      prompt('Copie o debug info:', debugText);
    });
  }

  async retryLoad() {
    await this.loadWeekData();
  }

  goToPdf() {
    // Redireciona para a versão PDF offline
    this.router.navigate([`/planner/${this.slug}/pdf`]);
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
    this.router.navigate([`/planner/${this.slug}/semana/${this.weekParam}/treino/${index}`]);
  }

  goBack() {
    this.router.navigate([`/planner/${this.slug}`]);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('theme-alternate');
    this.wakeLockService.releaseWakeLock();
    if (this.debugClickTimer) {
      clearTimeout(this.debugClickTimer);
    }
  }
}
