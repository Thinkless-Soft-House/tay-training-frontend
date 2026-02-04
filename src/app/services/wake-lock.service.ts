import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WakeLockService {
  private wakeLock: any = null;

  async requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await (navigator as any).wakeLock.request('screen');
        console.log('Wake Lock is active');

        this.wakeLock.addEventListener('release', () => {
          console.log('Wake Lock was released');
        });
      } catch (err: any) {
        console.error(`${err.name}, ${err.message}`);
      }
    } else {
      console.warn('Wake Lock API not supported');
    }
  }

  releaseWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release();
      this.wakeLock = null;
    }
  }
}
