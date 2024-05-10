import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from './../../../services/workouts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  slug: string = this.activatedRoute.snapshot.params['slug'];
  fileUrl: string = '';
  file: any = null;

  load: boolean = false;
  constructor(
    private workoutsService: WorkoutsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // const slug = activatedRoute.snapshot.params['slug'];
    // const id = slug.split('-')[0];
    // this.fileUrl = workoutsService.path + `/file/${id}`;
    // console.log(this.fileUrl);
  }

  ngOnInit(): void {
    this.getFile();
  }

  async getFile() {
    const slug = this.activatedRoute.snapshot.params['slug'];
    const id = slug.split('-')[0];

    const res = await this.workoutsService.getFileById(+id);

    const file = new File([res], 'filename.pdf', {
      type: 'application/pdf',
    });
    console.log(file);
    this.fileUrl = URL.createObjectURL(file);
    // console.log(this.fileUrl);

    this.load = true;
  }

  back() {
    // console.log('back', this.router.url);
    if (this.slug !== '91-desafio-turbina-resultados-treino-de-superiores')
      this.router.navigateByUrl(this.router.url.replace('/pdf', ''));
    else
      this.router.navigateByUrl(
        this.router.url.replace('/pdf', '/semana/1/treino/0')
      );
  }
}
