// src/app/org-basics/org-basics.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

// Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule }    from '@angular/material/select';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { QuestionDto }         from '../models/question.model';
import { QuestionService }     from '../services/question.service';

@Component({
  selector: 'app-org-basics',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './org-basics.component.html',
  styleUrls: ['./org-basics.component.css']
})
export class OrgBasicsComponent implements OnInit {
  questions: QuestionDto[] = [];
  answersMap: Record<string, string> = {}; // questionID → selected answerID or value

  constructor(private qs: QuestionService) {}

  ngOnInit() {
    // 🔹 Hard-coded pageKey for this step
    this.qs.getQuestionsForPage('OrgBasics').subscribe({
      next: qs => this.questions = qs,
      error: err => console.error('Failed to load OrgBasics questions', err)
    });
  }

  onAnswerChange(questionID: string, value: string) {
    this.answersMap[questionID] = value;
  }

  onSubmit() {
    console.log('Collected answers:', this.answersMap);
    // TODO: send this.answersMap to your tenant‐API to save
  }
}