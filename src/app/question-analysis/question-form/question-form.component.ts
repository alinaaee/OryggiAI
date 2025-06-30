import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { QuestionDto } from '../../models/question.model';

@Component({
  selector: 'app-question-form',
  imports: [CommonModule, MatSelectModule, MatSliderModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css'
})
export class QuestionFormComponent {
  @Input() questions: QuestionDto[] = [];
  @Input() form!: FormGroup;
}
