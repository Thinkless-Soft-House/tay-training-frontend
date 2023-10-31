import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialBundleModule } from '../../material-bundle/material-bundle.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MasterTableComponent } from './master-table/master-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoadingComponent } from './loading/loading.component';
import { PdfViewerComponent } from 'src/app/pages/planner/pdf-viewer/pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    MasterTableComponent,
    LoadingComponent,
    PdfViewerComponent,
  ],
  imports: [
    CommonModule,
    MaterialBundleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxExtendedPdfViewerModule,
  ],
  exports: [
    HeaderComponent,
    SideMenuComponent,
    MasterTableComponent,
    PdfViewerComponent,
  ],
})
export class ComponentsModule {}
