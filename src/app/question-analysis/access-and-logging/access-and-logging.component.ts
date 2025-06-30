import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { QuestionDto } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-access-and-logging',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatSliderModule, ReactiveFormsModule],
  templateUrl: './access-and-logging.component.html',
  styleUrl: './access-and-logging.component.css'
})
export class AccessAndLoggingComponent {

  constructor(private questionService: QuestionService, private fb: FormBuilder) {}
  
  questions: QuestionDto[] = [];
  form!: FormGroup;
  private readonly PAGE_KEY = 'Logs';

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
      if (Array.isArray(val)) {
        result[key] = val.join(',');  
      } else if (val !== undefined && val !== null && val !== '') {
        result[key] = String(val);    
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
