import { ActivatedRoute, Router } from '@angular/router';
import { Component, SecurityContext } from '@angular/core';
import { WorkoutsService } from 'src/app/services/workouts.service';
import {
  TrainingDay,
  TrainingSheet,
} from '../workouts/workout-details/workout-details.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  ExerciseMethod,
  ExerciseSet,
} from '../exercise-set/exercise-set-details/exercise-set-details.component';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent {
  planner: TrainingSheet | null = null;

  howToUrls: {
    id: number;
    miniature?: string;
    originalUrl: string;
    url: SafeResourceUrl;
    showIframe: boolean;
    iframeLoaded: number;
  }[] = [];

  distinctWorkouts: {
    trainingDay: TrainingDay;
    workout: ExerciseSet | undefined;
    index: number;
  }[] = [];
  distinctWorkoutsSorted: {
    t: TrainingDay;
    shortNamePlanner: string;
    index: number;
  }[] = [];

  constructor(
    private workoutsService: WorkoutsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  async ngOnInit() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug')!;
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

    this.planner.trainingDays = this.planner.trainingDays.sort(
      (a, b) => a.day - b.day
    );
    console.log('this.planner.trainingDays', this.planner.trainingDays);

    this.distinctWorkouts = this.getDistinctWorkouts().map((e, i) => {
      return { trainingDay: e!, workout: e!.exerciseGroup, index: i + 1 };
    });

    this.distinctWorkoutsSorted = this.distinctWorkouts
      .map((e, i) => {
        return {
          t: e!.trainingDay,
          shortNamePlanner: this.getExerciseSetName(e.workout!.id!)!,
          index: i + 1,
        };
      })
      .sort((a, b) => a.shortNamePlanner.localeCompare(b.shortNamePlanner));

    console.log('distinctWorkouts', this.distinctWorkouts);
    console.log('distinctWorkoutsSorted', this.distinctWorkoutsSorted);

    // console.log('this.distinctWorkouts', this.distinctWorkouts);

    this.createSanitizeUrls();
    console.log(this.planner);
  }

  mountTable(module: number) {
    // Verificar se tem as 4 semanas, se não tiver, adicionar um valor null no local
    const days = [];
    let c = 0;
    for (let index = module; index <= 28; index += 7) {
      // console.log(`${module} lap ${c} => index: ${index}`);
      c++;
      days.push(
        this.planner?.trainingDays.find((day) => day.day === index)
          ? this.planner?.trainingDays.find((day) => day.day === index)
          : null
      );
    }

    return days;
  }

  getDistinctWorkouts(): (TrainingDay | undefined)[] {
    const workouts = this.planner?.trainingDays.map(
      (day) => day.exerciseGroupId
    );
    return [...new Set(workouts)].map((id) => {
      return this.planner?.trainingDays.find(
        (day) => day.exerciseGroupId === id
      );
    });
  }

  orderExMethods(em: ExerciseMethod[]) {
    // Checar se tem a prop 'order' no objeto, se tiver, ordenar pelo valor dela, se não, ordenar pelo id

    return em.sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order;
      } else {
        return a.id! - b.id!;
      }
    });
  }

  getExerciseSetName(id: number) {
    return this.distinctWorkouts.find(
      (workout) => workout.workout!.id === id
    ) &&
      this.distinctWorkouts.find((workout) => workout.workout!.id === id)
        ?.trainingDay.shortName
      ? this.distinctWorkouts.find((workout) => workout.workout!.id === id)
          ?.trainingDay.shortName
      : `Treino ${
          this.distinctWorkouts.find((workout) => workout.workout!.id === id)
            ?.index || 0
        }`;
  }
  getWorkoutMultiName(egId: number, emId: number) {
    const eg = this.distinctWorkouts.find(
      (workout) => workout.workout!.id === egId
    )?.workout;

    const em = eg?.exerciseMethods?.find((em) => em!.id === emId);

    return em?.exerciseConfigurations
      ?.map((e) => e!.exercise!.name)
      .join(' + ');
  }

  createSanitizeUrls() {
    this.getDistinctWorkouts().forEach((workout) => {
      workout!.exerciseGroup?.exerciseMethods?.forEach((method) => {
        method!.exerciseConfigurations!.forEach((config) => {
          const videoId = config!.exercise!.videoUrl!.split('/').pop();

          this.howToUrls.push({
            id: config!.id!,
            miniature: `https://img.youtube.com/vi/${videoId}/0.jpg`,
            originalUrl: config!.exercise!.videoUrl!,
            url: this.sanitizer.bypassSecurityTrustResourceUrl(
              config!.exercise!.videoUrl!
            ),
            showIframe: false,
            iframeLoaded: 0,
          });
        });
      });
    });

    console.log('how to urls => ', this.howToUrls);
  }

  secIframeLink(id: number) {
    return this.howToUrls.find((url) => url.id === id)!;
  }

  matExpansionOpened(event: any) {
    console.log('Salve! => ', event);
    const howToUrlsIndex = this.howToUrls.findIndex((h) => h.id == event.id);
    this.howToUrls[howToUrlsIndex].showIframe = true;
  }

  iframeLoaded(event: any) {
    console.log('Iframe loaded! => ', event);
    const howToUrlsIndex = this.howToUrls.findIndex((h) => h.id == event.id);

    this.howToUrls[howToUrlsIndex].iframeLoaded += 1;

    setTimeout(() => {
      this.howToUrls[howToUrlsIndex].iframeLoaded += 1;
    }, 500);
  }

  downloadPDF() {
    const a = document.createElement('a');
    const url = this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      this.sanitizer.bypassSecurityTrustResourceUrl(this.planner?.offlinePdf!)
    );

    a.href = url!;
    a.download = 'planner.pdf';
    a.click();
  }
  newTabPDF() {
    const a = document.createElement('a');
    const url = this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      this.sanitizer.bypassSecurityTrustResourceUrl(this.planner?.newTabPdf!)
    );

    a.href = url!;
    a.target = '_blank';
    a.click();
  }

  openPdf() {
    this.router.navigate(['pdf'], {
      relativeTo: this.activatedRoute,
    });
  }
}
