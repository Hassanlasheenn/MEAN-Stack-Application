import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  loadingImage: string = '/assets/images/loading.svg';
  isLoading!: boolean;

  constructor(private _loadingService: LoadingService){}

  ngOnInit(): void {
      this.onLoading();
  }

  onLoading(): void {
    this._loadingService.isLoading
    .pipe(takeUntil(this._destroy$))
    .subscribe((value: boolean) => {
      this.isLoading = value;
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
