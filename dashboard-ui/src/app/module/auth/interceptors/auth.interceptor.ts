import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../../shared/authentication/services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    public tokenService: TokenService
  ) {}

  /**
   * Adds Bearer token to each request
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.tokenService.isLoggedIn()) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken()),
      });

      return next.handle(cloned);
    }

    return next.handle(request);
  }
}
