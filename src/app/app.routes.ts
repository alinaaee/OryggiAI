import { Routes } from '@angular/router';
import { AuthComponent }      from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { OrgBasicsComponent } from './org-basics/org-basics.component';

export const routes: Routes = [
  { path: 'auth',      component: AuthComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    // canActivate: [AuthGuard] 
  },
    { path: 'org',  component: OrgBasicsComponent },
  { path: '',   redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' }
];
