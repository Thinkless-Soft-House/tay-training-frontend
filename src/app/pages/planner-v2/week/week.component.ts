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
  
  // Estados de UI
  isLoading = true;
  hasError = false;
  errorMessage = '';
  retryCount = 0;
  private maxRetries = 3;

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

    await this.loadWeekData(slug);
  }

  async loadWeekData(slug: string) {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    try {
      this.planner = await this.workoutsService.getWeekData(
        slug,
        this.weekParam
      );
      
      if (!this.planner) {
        throw new Error('Dados do planner não encontrados');
      }

      // Validar se weekDays tem dados válidos (não apenas folgas)
      const hasValidData = this.validateWeekData(this.planner.weekDays);
      
      if (!hasValidData && this.retryCount < this.maxRetries) {
        // Todos os dias são folga - possível problema de rede, tentar novamente
        console.warn(`Todos os dias retornaram como folga. Tentativa ${this.retryCount + 1}/${this.maxRetries}`);
        this.retryCount++;
        await this.delay(1000 * this.retryCount); // Backoff exponencial
        await this.loadWeekData(slug);
        return;
      }

      this.weekDays = this.planner.weekDays;
      this.isLoading = false;
      
      // Log para debug em produção
      if (!hasValidData) {
        console.warn('ALERTA: Semana carregada mas todos os dias são FOLGA', {
          slug,
          week: this.weekParam,
          weekDays: this.weekDays,
          planner: this.planner
        });
      }
    } catch (error: any) {
      console.error('Erro ao carregar dados da semana:', error);
      
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`Tentando novamente... (${this.retryCount}/${this.maxRetries})`);
        await this.delay(1000 * this.retryCount);
        await this.loadWeekData(slug);
        return;
      }
      
      this.hasError = true;
      this.errorMessage = error?.message || 'Erro ao carregar os treinos. Verifique sua conexão.';
      this.isLoading = false;
    }
  }

  /**
   * Valida se os dados da semana têm pelo menos um treino (não apenas folgas)
   */
  private validateWeekData(weekDays: (TrainingDay | null)[]): boolean {
    if (!weekDays || !Array.isArray(weekDays)) return false;
    // Verifica se pelo menos um dia tem treino (não é null)
    return weekDays.some(day => day !== null);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async retryLoad() {
    this.retryCount = 0;
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    await this.loadWeekData(slug);
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
