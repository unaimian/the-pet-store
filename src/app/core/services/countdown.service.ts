import { Injectable } from '@angular/core';
import { Observable, timer, map, shareReplay } from 'rxjs';

export interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  /**
   * Creates an observable that counts down to midnight
   */
  countdownToMidnight(): Observable<CountdownTime> {
    return timer(0, 1000).pipe(
      map(() => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);

        const remaining = Math.max(0, midnight.getTime() - now.getTime());

        return {
          hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((remaining / 1000 / 60) % 60),
          seconds: Math.floor((remaining / 1000) % 60)
        };
      }),
      shareReplay(1)
    );
  }
}
