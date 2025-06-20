// src/main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }               from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpClientModule }      from '@angular/common/http';
import { BrowserAnimationsModule }                  from '@angular/platform-browser/animations';

// Angular Material + forms
import { ReactiveFormsModule }             from '@angular/forms';
import { MatStepperModule }                from '@angular/material/stepper';
import { MatFormFieldModule }              from '@angular/material/form-field';
import { MatInputModule }                  from '@angular/material/input';
import { MatSelectModule }                 from '@angular/material/select';
import { MatButtonModule }                 from '@angular/material/button';
import { MatIconModule }                   from '@angular/material/icon';

import { AppComponent }    from './app/app.component';
import { routes }          from './app/app.routes';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    // 1) Router
    provideRouter(routes, withComponentInputBinding()),

    // 2) HTTP + your interceptor
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    importProvidersFrom(HttpClientModule),

    // 3) Animations (required by Material)
    importProvidersFrom(BrowserAnimationsModule),

    // 4) Forms + Material modules
    importProvidersFrom(
      ReactiveFormsModule,
      MatStepperModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
      MatIconModule
    )
  ]
}).catch(err => console.error(err));
