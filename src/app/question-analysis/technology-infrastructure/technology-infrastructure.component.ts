import { Component } from '@angular/core';
import { QuestionDto } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-technology-infrastructure',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, FormsModule, MatSelectModule, MatSliderModule],
  templateUrl: './technology-infrastructure.component.html',
  styleUrl: './technology-infrastructure.component.css'
})
export class TechnologyInfrastructureComponent {
  questions: QuestionDto[] = [];
  answersMap: Record<string, any> = {};
  private readonly PAGE_KEY = 'Tech';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestionsForPage(this.PAGE_KEY).subscribe({
        next: qs => this.questions = qs,
        error: err => console.error('Failed to load Tech questions', err)
      });
  }

  getAnswers(): { [key: string]: any } {
    return this.answersMap;
  }
}
