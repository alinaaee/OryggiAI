import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent }      from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionAnalysisComponent } from './question-analysis/question-analysis.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'questions', component: QuestionAnalysisComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '',  redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];