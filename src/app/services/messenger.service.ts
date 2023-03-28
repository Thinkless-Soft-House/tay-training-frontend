import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

interface snackBarParams {
  message: string;
  action: string;

  config?: MatSnackBarConfig;
}

@Injectable({
  providedIn: 'root',
})
export class MessengerService {
  constructor(private snackBar: MatSnackBar) {}

  private showMessage(params: snackBarParams, config: MatSnackBarConfig) {
    this.snackBar.open(params.message, params.action, config);
  }

  successMessage(params: snackBarParams) {
    const config = {
      duration: 3000,
      panelClass: ['success-snackbar'],
      ...params.config,
    };

    this.showMessage(params, config);
  }

  errorMessage(params: snackBarParams) {
    const config = {
      duration: 3000,
      panelClass: ['error-snackbar'],
      ...params.config,
    };

    this.showMessage(params, config);
  }

  warningMessage(params: snackBarParams) {
    const config = {
      duration: 3000,
      panelClass: ['warning-snackbar'],
      ...params.config,
    };

    this.showMessage(params, config);
  }

  infoMessage(params: snackBarParams) {
    const config = {
      duration: 3000,
      panelClass: ['info-snackbar'],
      ...params.config,
    };

    this.showMessage(params, config);
  }

  customMessage(params: snackBarParams, config: MatSnackBarConfig) {
    this.showMessage(params, config);
  }
}
