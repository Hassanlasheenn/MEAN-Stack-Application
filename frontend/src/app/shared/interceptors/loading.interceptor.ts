import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private _loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loadingService.showLoading();

    return next.handle(request)
    .pipe(
      tap(
        {
          next: (event) => {
            if(event.type === HttpEventType.Response) {
              this._loadingService.hideLoading();
            }
          },
          error: (_) => {
            this._loadingService.hideLoading();
          }
        }
      )
    );
  }
}
