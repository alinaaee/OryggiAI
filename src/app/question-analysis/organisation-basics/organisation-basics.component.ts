//ANGULAR COMPONENTS
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
import { QuestionFormComponent } from "../question-form/question-form.component";

@Component({
  selector: 'app-organisation-basics',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSliderModule, MatCheckboxModule, MatButtonModule, ReactiveFormsModule, QuestionFormComponent],
  templateUrl: './organisation-basics.component.html',
  styleUrl: './organisation-basics.component.css'
})
export class OrganisationBasicsComponent {

  constructor(private questionService: QuestionService, private fb: FormBuilder) {}

  questions: QuestionDto[] = [];
  form!: FormGroup;
  private readonly PAGE_KEY = 'OrgBasics';

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.questionService.getQuestionsForPage(this.PAGE_KEY).subscribe({
      next: qs => {
        this.questions = qs;
        qs.forEach(q => {
          const control = this.fb.control('', q.required ? Validators.required : []);
          this.form.addControl(q.questionID, control);
        });
      },
      error: err => console.error('Failed to load OrgBasics questions', err)
    });
  }

  getAnswers(): Record<string, string> {
    const raw = this.form.value;
    const result: Record<string, string> = {};

    for (const key in raw) {
      const val = raw[key];
      const question = this.questions.find(q => q.questionID === key);
      if (!question) continue;  
      if (Array.isArray(val)) {
        const labels = val.map(v => question.answers?.find(opt => opt.answerID === v)?.answerText || v);
        result[key] = labels.join(',');
      } else if (val !== undefined && val !== null && val !== '') {
        const label = question.answers?.find(opt => opt.answerID === val)?.answerText || val;
        result[key] = String(label);
      }
    }
    return result;
  }

  hasAnyAnswer(): boolean {
    return Object.values(this.form.value).some(val =>
      val !== null && val !== undefined && val !== '' && 
      !(Array.isArray(val) && val.length === 0)
    );
  }

  isValid(): boolean {
    return this.form.valid;
  }
}

