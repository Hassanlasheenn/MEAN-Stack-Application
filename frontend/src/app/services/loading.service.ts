import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private pendingRequests: number = 0;

  get isLoading(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  constructor() { }

  /**
   * @description method to show the loading spinner when pending requets property is more than 0
   * @returns {void} void
   */
  showLoading(): void {
    this.pendingRequests++;
    this.isLoadingSubject.next(this.pendingRequests > 0);
  }

/**
 * @description method to not show the loading spinner by checking on the pending requests less than 0
 * @return {void} void
 */
  hideLoading(): void {
    if(this.pendingRequests > 0) {
      this.pendingRequests--;
    }
    this.isLoadingSubject.next(this.pendingRequests > 0);
  }
}
