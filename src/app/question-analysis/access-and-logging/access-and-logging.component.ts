import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { QuestionDto } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-access-and-logging',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatSliderModule],
  templateUrl: './access-and-logging.component.html',
  styleUrl: './access-and-logging.component.css'
})
export class AccessAndLoggingComponent {
  questions: QuestionDto[] = [];
  answersMap: Record<string, any> = {};
  private readonly PAGE_KEY = 'Logs';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestionsForPage(this.PAGE_KEY).subscribe({
        next: qs => this.questions = qs,
        error: err => console.error('Failed to load Logs questions', err)
      });
  }

  getAnswers(): { [key: string]: any } {
    return this.answersMap;
  }

}
