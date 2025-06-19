// src/app/wizard/tech/tech.component.ts
import { Component, OnInit }   from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { Router }              from '@angular/router';
import { WizardService }       from '../../services/wizard.service';
import { WizardStateService }  from '../../services/wizard-state.service';
import { QuestionService }     from '../../services/question.service';
import { QuestionDto }         from '../../models/question.model';

@Component({
  selector: 'app-tech',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.css']
})
export class TechComponent implements OnInit {
  questions: QuestionDto[] = [];
  answersMap: Record<string, any> = {};
  private readonly PAGE_KEY = 'Tech';

  constructor(
    private questionService: QuestionService,
    private wizardService:   WizardService,
    private wizardState:     WizardStateService,
    private router:          Router
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestionsForPage(this.PAGE_KEY)
      .subscribe({
        next: qs => this.questions = qs,
        error: err => console.error('Failed to load Tech questions', err)
      });
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
          this.router.navigate(['/wizard/hours']);
        },
        error: err => console.error('Failed to save Tech', err)
      });
  }
}
