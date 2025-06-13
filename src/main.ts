import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { DashboardComponent } from './app/dashboard/dashboard.component';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    // <-- register HttpClientModule here
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideRouter([
      { path: 'dashboard', component: DashboardComponent}
    ])
  ]
}).catch((err) => console.error(err));;