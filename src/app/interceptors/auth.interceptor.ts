// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token  = localStorage.getItem('token');
    const tenant = localStorage.getItem('tenantId');

    // If neither token nor tenant, just forward the original request
    if (!token && !tenant) {
      return next.handle(req);
    }

    // Build headers object
    const headers: Record<string,string> = {};
    if (token)  headers['Authorization'] = `Bearer ${token}`;
    if (tenant) headers['tenantId']     = tenant;

    // Clone once with both headers set
    const authReq = req.clone({ setHeaders: headers });
    return next.handle(authReq);
  }
}
