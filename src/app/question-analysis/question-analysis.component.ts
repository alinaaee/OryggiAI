//ANGULAR COMPONENTS
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//MATERIAL COMPONENTS
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

//OTHER COMPONENTS AND SERVICES
import Swal from 'sweetalert2';
import { HeaderComponent } from "../common/header/header.component";
import { OrganisationBasicsComponent } from "./organisation-basics/organisation-basics.component";
import { TechnologyInfrastructureComponent } from "./technology-infrastructure/technology-infrastructure.component";
import { WorkHoursComponent } from "./work-hours/work-hours.component";
import { AccessAndLoggingComponent } from "./access-and-logging/access-and-logging.component";
import { WizardStateService } from '../services/wizard-state.service';
import { QuestionService } from '../services/question.service';
import { ErrorLoggerService } from '../services/logger/error-logger.service';

@Component({
  selector: 'app-question-analysis',
  imports: [HeaderComponent, MatStepperModule, OrganisationBasicsComponent, TechnologyInfrastructureComponent, WorkHoursComponent, AccessAndLoggingComponent],
  templateUrl: './question-analysis.component.html',
  styleUrl: './question-analysis.component.css'
})
export class QuestionAnalysisComponent {

  constructor(private wizardState: WizardStateService, private questionService: QuestionService, private snackBar: MatSnackBar, private router: Router, private errorLog: ErrorLoggerService){}
  
  @ViewChild('orgBasics') orgBasicsComponent!: OrganisationBasicsComponent;
  @ViewChild('techInfra') techInfraComponent!: TechnologyInfrastructureComponent;
  @ViewChild('workHours') workHoursComponent!: WorkHoursComponent;
  @ViewChild('logs') logsComponent!: AccessAndLoggingComponent;

  saveAll() {
    if (!this.orgBasicsComponent.hasAnyAnswer() || !this.techInfraComponent.hasAnyAnswer() || !this.workHoursComponent.hasAnyAnswer() || !this.logsComponent.hasAnyAnswer()) {
      this.snackBar.open('Please answer at least one question in each section before saving.', 'Close', { duration: 3000 });
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save all the answers?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        try{
          const orgData = this.orgBasicsComponent.getAnswers();
          const techData = this.techInfraComponent.getAnswers();
          const workHoursData = this.workHoursComponent.getAnswers();
          const logsData = this.logsComponent.getAnswers();
          
          this.questionService.savePage('OrgBasics', orgData).subscribe();
          this.questionService.savePage('Tech', techData).subscribe();
          this.questionService.savePage('Hours', workHoursData).subscribe();
          this.questionService.savePage('Logs', logsData).subscribe();

          this.wizardState.setAnswers('organisationBasics', orgData);
          this.wizardState.setAnswers('technologyInfrastructure', techData);
          this.wizardState.setAnswers('workHours', workHoursData);
          this.wizardState.setAnswers('logs', logsData);
          console.log(orgData,  techData, workHoursData, logsData);
          this.snackBar.open('All answers have been saved.', 'Close',{
            duration: 3000
          });
          this.router.navigate(['/dashboard']);
        } catch(err: any){
          this.errorLog.logError(err);
        }
      }
    });
  }
}
