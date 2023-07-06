import { RouterModule } from '@angular/router';
import { ComponentsModule } from './core/shared/components/components.module';
import { MaterialBundleModule } from './core/material-bundle/material-bundle.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CpfValidatorDirective } from './core/shared/directives/cpf-validator.directive';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [AppComponent, ExamplePdfViewerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialBundleModule,
    ComponentsModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
