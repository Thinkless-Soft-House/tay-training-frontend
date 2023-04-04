import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialBundleModule } from '../material-bundle/material-bundle.module';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [HeaderComponent, SideMenuComponent],
  imports: [CommonModule, MaterialBundleModule],
  exports: [HeaderComponent, SideMenuComponent],
})
export class ComponentsModule {}
