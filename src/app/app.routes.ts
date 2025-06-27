import { Routes } from '@angular/router';
import { AuthComponent }      from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { OrgBasicsComponent } from './org-basics/org-basics.component';
import { QuestionAnalysisComponent } from './question-analysis/question-analysis.component';
import { ProfileWizardComponent }  from './profile-wizard/profile-wizard.component';
import { TechComponent }       from './wizard/tech/tech.component';
import { HoursComponent } from './wizard/hours/hours.component';
import { LogsComponent }      from './wizard/logs/logs.component';
import { ReviewComponent }    from './wizard/review/review.component';

export const routes: Routes = [
  { path: 'auth',      component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] 
  },
  { path: 'org',  component: OrgBasicsComponent },
  { path: 'login', component: AuthComponent },
  { path: 'wizard',
    canActivate: [AuthGuard],
    children: [
      { path: '',       component: ProfileWizardComponent },  // /wizard
      { path: 'tech',   component: TechComponent    },       // /wizard/tech
      { path: 'hours',  component: HoursComponent   },       // /wizard/hours
      { path: 'logs',   component: LogsComponent    },       // /wizard/logs
      { path: 'review', component: ReviewComponent  }        // /wizard/review
    ]
  },
  { path: 'questions', component: QuestionAnalysisComponent},
  { path: '',  redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];