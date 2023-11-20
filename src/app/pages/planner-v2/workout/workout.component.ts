import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
import { register } from 'swiper/element/bundle';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['../planner-v2.default.scss', './workout.component.scss'],
})
export class WorkoutComponent implements OnInit, AfterViewInit, OnDestroy {
  planner: TrainingSheet | null = null;
  week: (TrainingDay | null)[] = [];
  workout: ExerciseSet | null = null;
  weekParam = 0;
  workoutParam = 0;

  howToUrls: {
    id: number;
    miniature?: string;
    originalUrl: string;
    url: SafeResourceUrl;
    showIframe: boolean;
    iframeLoaded: number;
  }[] = [];

  isLancamento = false;
  constructor(
    private workoutsService: WorkoutsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    register();
    console.log('after view init');
    this.isLancamento =
      this.activatedRoute.snapshot.queryParamMap.get('lancamento') === 'true';
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
      this.weekParam === undefined ||
      this.weekParam === null ||
      isNaN(+this.weekParam) ||
      +this.weekParam < 1 ||
      +this.weekParam > 4
    ) {
      this.router.navigate([`/planner/${slug}`]);
    }
    if (
      this.workoutParam === undefined ||
      this.workoutParam === null ||
      isNaN(+this.workoutParam)
    ) {
      this.router.navigate([`/planner/${slug}`]);
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
    // this.week.forEach((day) => {
    //   // Lista de logs importantes da semana

    //   console.log('Dia: ', day?.day);
    //   console.log('Nome curto: ', day?.shortName);
    //   console.log('Nome publico: ', day?.exerciseGroup?.publicName);
    //   console.log('-----###-----');
    // });
    if (
      this.week[this.workoutParam] === undefined ||
      !this.week[this.workoutParam]?.exerciseGroup
    ) {
      this.router.navigate([`/planner/${slug}`]);
    } else {
      this.workout = this.week[this.workoutParam]!.exerciseGroup || null;
    }

    // Grupo de logs do escolhido:

    // console.log('-----ˆˆˆ-----');
    // console.log('O que foi escolhido: Index ' + this.workoutParam + ' da lista => ', this.week);
    // console.log('Dia: ', this.week[this.workoutParam]!.day);
    // console.log('Nome curto: ', this.week[this.workoutParam]!.shortName);
    // console.log('Nome publico: ', this.week[this.workoutParam]!.exerciseGroup?.publicName);
    // console.log('-----###-----');
    this.createSanitizeUrls();
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

  createSanitizeUrls() {
    this.workout!.exerciseMethods!.forEach((method) => {
      method.exerciseConfigurations!.forEach((config) => {
        console.log('video url => ', config!.exercise!.videoUrl);
        const videoId = config!
          .exercise!.videoUrl!.split('/')
          .pop()
          ?.split('?')[0];

        this.howToUrls.push({
          id: config!.id!,
          // miniature: `https://img.youtube.com/vi//0.jpg`,
          miniature: `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          originalUrl: config!.exercise!.videoUrl!,
          url: this.sanitizer.bypassSecurityTrustResourceUrl(
            config!.exercise!.videoUrl!
          ),
          showIframe: false,
          iframeLoaded: 0,
        });
      });
    });
  }

  secIframeLink(id: number) {
    const ret = this.howToUrls.find((url) => url.id === id)!;
    return ret;
  }

  openVideo(name: string, url: SafeResourceUrl) {
    console.log(`Abrindo vídeo ${url}`);
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

  goToExercise(exercise: number) {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    const week = this.activatedRoute.snapshot.paramMap.get('week');
    this.router.navigate([
      `/planner/${slug}/semana/${week}/treino/${this.workoutParam}/exercicio/${exercise}`,
    ]);
  }
  goBackWeek() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    this.router.navigate([`/planner/${slug}`]);
  }
  goBackWorkout() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
    const week = this.activatedRoute.snapshot.paramMap.get('week');
    this.router.navigate([`/planner/${slug}/semana/${week}`]);
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
