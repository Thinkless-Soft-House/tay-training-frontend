import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { WorkoutsService } from 'src/app/services/workouts.service';
import { TrainingSheet } from '../workouts/workout-details/workout-details.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent {
  planner: TrainingSheet | null = null;

  howToUrls: { id: number; url: SafeResourceUrl }[] = [];

  constructor(
    private workoutsService: WorkoutsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
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

  getDistinctWorkouts() {
    const workouts = this.planner?.trainingDays.map(
      (day) => day.exerciseGroupId
    );
    return [...new Set(workouts)].map((id) => {
      return this.planner?.trainingDays.find(
        (day) => day.exerciseGroupId === id
      );
    });
  }

  createSanitizeUrls() {
    this.getDistinctWorkouts().forEach((workout) => {
      workout!.exerciseGroup?.exerciseMethods?.forEach((method) => {
        method!.exerciseConfigurations!.forEach((config) => {
          this.howToUrls.push({
            id: config!.id!,
            url: this.sanitizer.bypassSecurityTrustResourceUrl(
              config!.exercise!.videoUrl!
            ),
          });
        });
      });
    });
  }

  secIframeLink(id: number) {
    return this.howToUrls.find((url) => url.id === id)!.url;
  }
}
