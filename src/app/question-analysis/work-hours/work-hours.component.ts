import { Component } from '@angular/core';
import { QuestionDto } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-work-hours',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatSliderModule, MatCheckboxModule],
  templateUrl: './work-hours.component.html',
  styleUrl: './work-hours.component.css'
})
export class WorkHoursComponent {
  questions: QuestionDto[] = [];
  answersMap: Record<string, any> = {};
  private readonly PAGE_KEY = 'Hours';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestionsForPage(this.PAGE_KEY).subscribe({
      next: qs => this.questions = qs,
      error: err => console.error('Failed to load Hours questions', err)
    });
  }

  getAnswers(): { [key: string]: any } {
    return this.answersMap;
  }

}
