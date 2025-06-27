//ANGULAR COMPONENTS
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

//SERVICES AND OTHER COMPONENTS 
import { QuestionService } from '../../services/question.service';
import { QuestionDto } from '../../models/question.model';

//MATERIAL IMPORTS
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-organisation-basics',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSliderModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './organisation-basics.component.html',
  styleUrl: './organisation-basics.component.css'
})
export class OrganisationBasicsComponent {
  questions: QuestionDto[] = [];
  answersMap: Record<string, any> = {};
  private readonly PAGE_KEY = 'OrgBasics';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestionsForPage(this.PAGE_KEY).subscribe({
      next: qs => this.questions = qs,
      error: err => console.error('Failed to load OrgBasics questions', err)
    });
  }

  onAnswerChange(questionID: string, value: any) {
    this.answersMap[questionID] = value;
  }

  getAnswers(): { [key: string]: any } {
    return this.answersMap;
  }

}
