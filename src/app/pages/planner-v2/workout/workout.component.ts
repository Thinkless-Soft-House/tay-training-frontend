// workout.component.ts
import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  WorkoutsService,
  WorkoutDetail,
  ExerciseMethod,
  WorkoutDetailResponse,
} from 'src/app/services/workouts.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { register } from 'swiper/element/bundle';
import { WakeLockService } from 'src/app/services/wake-lock.service';

type ErrorType = 'network' | 'empty' | 'unavailable' | null;

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['../planner-v2.default.scss', './workout.component.scss'],
})
export class WorkoutComponent implements OnInit, AfterViewInit, OnDestroy {
  slug = '';
  planner: WorkoutDetail | null = null;
  workout: ExerciseMethod[] = [];
  weekParam = 0;
  workoutParam = 0;

  isLancamento = false;

  // Estados de UI
  isLoading = true;
  errorType: ErrorType = null;

  // Debug mode
  debugClickCount = 0;
  debugClickTimer: any = null;
  showDebugPanel = false;
  debugData: WorkoutDetailResponse['debug'] | null = null;

  howToUrls: {
    id: number;
    miniature?: string;
    originalUrl: string;
    url: SafeResourceUrl;
    showIframe: boolean;
    iframeLoaded: number;
  }[] = [];

  constructor(
    private workoutsService: WorkoutsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private dialog: MatDialog,
    private wakeLockService: WakeLockService
  ) {}

  ngAfterViewInit() {
    register();
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.isLancamento = params['lancamento'] === 'true';
    });
    document.body.classList.add('theme-alternate');
    await this.wakeLockService.requestWakeLock();

    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.weekParam = +this.activatedRoute.snapshot.paramMap.get('week')!;
    this.workoutParam = +this.activatedRoute.snapshot.paramMap.get('workout')!;

    if (
      isNaN(this.weekParam) ||
      this.weekParam < 1 ||
      this.weekParam > 4 ||
      isNaN(this.workoutParam)
    ) {
      this.router.navigate([`/planner/${slug}`]);
      return;
    }

    this.slug = slug;
    await this.loadWorkoutData();
  }

  async loadWorkoutData() {
    this.isLoading = true;
    this.errorType = null;

    try {
      const result = await this.workoutsService.getWorkoutDetailWithDebug(
        this.slug,
        this.weekParam,
        this.workoutParam
      );

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
      this.workout = this.planner.workout.exerciseMethods;
      this.createSanitizeUrls();
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
    await this.loadWorkoutData();
  }

  goBack() {
    this.router.navigate([`/planner/${this.slug}/semana/${this.weekParam}`]);
  }

  async createSanitizeUrls() {
    this.workout.forEach((method) => {
      method.exerciseConfigurations.forEach((config) => {
        const videoUrl = config.exercise.videoUrl;
        if (videoUrl) {
          const videoId = videoUrl.split('/').pop()?.split('?')[0];
          this.howToUrls.push({
            id: config.id,
            miniature: `https://img.youtube.com/vi/${videoId}/0.jpg`,
            originalUrl: videoUrl,
            url: this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl),
            showIframe: false,
            iframeLoaded: 0,
          });
        }
      });
    });
  }

  secIframeLink(id: number) {
    return this.howToUrls.find((url) => url.id === id)!;
  }

  openVideo(name: string, url: SafeResourceUrl) {
    const ref = this.dialog.open(VideoDialogComponent, {
      data: { name, url },
      width: '90vw',
      minWidth: '300px',
      maxWidth: '800px',
    });

    ref.afterClosed().subscribe(() => {
      console.log('Fechando vídeo');
    });
  }

  goBackWeek() {
    const slug = this.slug;
    this.router.navigate([`/planner/${slug}`]);
  }

  goBackWorkout() {
    const slug = this.slug;
    const week = this.weekParam;
    this.router.navigate([`/planner/${slug}/semana/${week}`]);
  }

  openPdf() {
    const slug = this.slug;
    this.router.navigateByUrl(`/planner/${slug}/pdf`);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('theme-alternate');
    this.wakeLockService.releaseWakeLock();
  }
}

@Component({
  selector: 'video-dialog',
  templateUrl: './video.dialog.component.html',
  styleUrls: ['../planner-v2.default.scss', './workout.component.scss'],
})
export class VideoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: SafeResourceUrl; name: string }
  ) {
    console.log(data);
  }

  close() {
    this.dialogRef.close();
  }
}
