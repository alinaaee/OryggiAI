import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../common/header/header.component";
import { MatStepperModule } from '@angular/material/stepper';
import { OrganisationBasicsComponent } from "./organisation-basics/organisation-basics.component";
import { TechnologyInfrastructureComponent } from "./technology-infrastructure/technology-infrastructure.component";
import { WorkHoursComponent } from "./work-hours/work-hours.component";
import { AccessAndLoggingComponent } from "./access-and-logging/access-and-logging.component";
import Swal from 'sweetalert2';
import { WizardStateService } from '../services/wizard-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-analysis',
  imports: [HeaderComponent, MatStepperModule, OrganisationBasicsComponent, TechnologyInfrastructureComponent, WorkHoursComponent, AccessAndLoggingComponent],
  templateUrl: './question-analysis.component.html',
  styleUrl: './question-analysis.component.css'
})
export class QuestionAnalysisComponent {

  constructor(private wizardState: WizardStateService, private router: Router){}
  
  @ViewChild('orgBasics') orgBasicsComponent!: OrganisationBasicsComponent;
  @ViewChild('techInfra') techInfraComponent!: TechnologyInfrastructureComponent;
  @ViewChild('workHours') workHoursComponent!: WorkHoursComponent;
  @ViewChild('logs') logsComponent!: AccessAndLoggingComponent;

  saveAll() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save all the answers?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const orgData = this.orgBasicsComponent.getAnswers();
        const techData = this.techInfraComponent.getAnswers();
        const workHoursData = this.workHoursComponent.getAnswers();
        const logsData = this.logsComponent.getAnswers();
        
        this.wizardState.setAnswers('organisationBasics', orgData);
        this.wizardState.setAnswers('technologyInfrastructure', techData);
        this.wizardState.setAnswers('workHours', workHoursData);
        this.wizardState.setAnswers('logs', logsData);
        console.log(orgData,  techData, workHoursData, logsData);
        Swal.fire('Saved!', 'All answers have been saved.', 'success');
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
