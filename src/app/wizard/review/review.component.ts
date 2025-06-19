// src/app/wizard/review/review.component.ts
import { Component, OnInit }  from '@angular/core';
import { CommonModule }       from '@angular/common';
import { Router }             from '@angular/router';
import { WizardService }      from '../../services/wizard.service';
import { WizardStateService } from '../../services/wizard-state.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  allAnswers: Record<string, any> = {};
Object: any;

  constructor(
    private wizardState: WizardStateService,
    private wizardService: WizardService,
    private router:        Router
  ) {}

  ngOnInit(): void {
    this.allAnswers = this.wizardState.getAllAnswers();
  }

  finish(): void {
    // Optionally POST allAnswers as one final payload:
    this.wizardService.savePage('Review', this.allAnswers)
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: err => console.error('Failed to save Review', err)
      });
  }
}
