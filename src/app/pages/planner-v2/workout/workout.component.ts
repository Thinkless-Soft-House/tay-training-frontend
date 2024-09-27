// workout.component.ts
import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  WorkoutsService,
  WorkoutDetail,
  ExerciseMethod,
} from 'src/app/services/workouts.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { register } from 'swiper/element/bundle';

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
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    register();
    // console.log('after view init');
    // this.isLancamento =
    //   this.activatedRoute.snapshot.queryParamMap.get('lancamento') === 'true';
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.isLancamento = params['lancamento'] === 'true';
      console.log('lancamento => ', this.isLancamento);
    });
    document.body.classList.add('theme-alternate');

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

    try {
      const res = await this.workoutsService.getWorkoutDetail(
        slug,
        this.weekParam,
        this.workoutParam
      );

      this.planner = res;
      if (!this.planner) {
        this.router.navigate([`/planner/${slug}`]);
        return;
      }

      this.workout = this.planner.workout.exerciseMethods;
      this.createSanitizeUrls();
    } catch (error) {
      console.error('Error fetching workout detail:', error);
      this.router.navigate([`/planner/${slug}`]);
    }
  }

  createSanitizeUrls() {
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
