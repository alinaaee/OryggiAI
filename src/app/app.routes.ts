import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent }      from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionAnalysisComponent } from './question-analysis/question-analysis.component';
import { ControlledNavigationGuard } from './controlled-navigation.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'questions', component: QuestionAnalysisComponent, 
    canActivate: [AuthGuard, ControlledNavigationGuard] 
  },
  { path: 'dashboard', component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '',  redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];