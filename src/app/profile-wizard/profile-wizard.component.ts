// src/app/profile-wizard/profile-wizard.component.ts
import { Component, OnInit }    from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { Router }               from '@angular/router';

import { QuestionService }      from '../services/question.service';
import { WizardService }        from '../services/wizard.service';
import { WizardStateService }   from '../services/wizard-state.service';
import { QuestionDto }          from '../models/question.model';

@Component({
  selector: 'app-profile-wizard',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './profile-wizard.component.html',
  styleUrls: ['./profile-wizard.component.css']
})
export class ProfileWizardComponent implements OnInit {
  questions: QuestionDto[] = [];
  answersMap: Record<string, any> = {};
  private readonly PAGE_KEY = 'OrgBasics';

  constructor(
    private questionService: QuestionService,
    private wizardService:  WizardService,
    private wizardState:    WizardStateService,
    private router:         Router
  ) {}

  ngOnInit(): void {
    this.questionService
      .getQuestionsForPage(this.PAGE_KEY)
      .subscribe({
        next: qs => this.questions = qs,
        error: err => console.error('Failed to load OrgBasics questions', err)
      });
  }

  onAnswerChange(questionID: string, value: any) {
    this.answersMap[questionID] = value;
  }

  onSubmit(): void {
    const payload: Record<string,string> = {};
    this.questions.forEach(q => {
      const raw = this.answersMap[q.questionID] ?? '';
      let text = raw === ''
        ? '[not answered]'
        : q.inputType === 'select'
          ? q.answers.find(a => a.answerID === raw)?.answerText ?? '[not answered]'
          : String(raw);
      payload[q.questionID] = text;
    });

    this.wizardService.savePage(this.PAGE_KEY, payload)
      .subscribe({
        next: () => {
          this.wizardState.setAnswers(this.PAGE_KEY, payload);
          this.router.navigate(['/wizard/tech']);
        },
        error: err => console.error('Failed to save OrgBasics', err)
      });
  }
}
