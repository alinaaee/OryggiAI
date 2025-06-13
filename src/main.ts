import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './app/dashboard/dashboard.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'dashboard', component: DashboardComponent}
    ])
  ]
})
  .catch((err) => console.error(err));
