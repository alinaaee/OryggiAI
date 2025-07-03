import { Routes } from '@angular/router';
import { AuthComponent }      from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { QuestionAnalysisComponent } from './question-analysis/question-analysis.component';

export const routes: Routes = [
  { path: 'auth',      component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] 
  },
  { path: 'login', component: AuthComponent },
  { path: 'questions', component: QuestionAnalysisComponent},
  { path: '',  redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];