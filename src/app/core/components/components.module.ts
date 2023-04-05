import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialBundleModule } from '../material-bundle/material-bundle.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MasterTableComponent } from './master-table/master-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [HeaderComponent, SideMenuComponent, MasterTableComponent],
  imports: [
    CommonModule,
    MaterialBundleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [HeaderComponent, SideMenuComponent, MasterTableComponent],
})
export class ComponentsModule {}
