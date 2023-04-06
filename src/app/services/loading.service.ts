import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = false;
  constructor() {}

  changeLoadingState() {
    this.loading = !this.loading;
  }

  activeLoading() {
    this.loading = true;
  }
  deactiveLoading() {
    this.loading = false;
  }
}
