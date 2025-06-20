import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

// Material stepper & form modules
import { MatStepperModule }   from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatSelectModule }    from '@angular/material/select';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { RouterOutlet }     from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterOutlet   ,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // One FormGroup per step
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  step4Form: FormGroup;
  step5Form: FormGroup;
  step6Form: FormGroup;

  constructor(private fb: FormBuilder) {
    // Each step needs exactly one control for now
    this.step1Form = this.fb.group({ answer: [''] });
    this.step2Form = this.fb.group({ answer: [''] });
    this.step3Form = this.fb.group({ answer: [''] });
    this.step4Form = this.fb.group({ answer: [''] });
    this.step5Form = this.fb.group({ answer: [''] });
    this.step6Form = this.fb.group({ answer: [''] });
  }

  onSubmit() {
    const payload = {
      organization: this.step1Form.value.answer,
      technology:   this.step2Form.value.answer,
      hours:        this.step3Form.value.answer,
      logs:         this.step4Form.value.answer,
      risk:         this.step5Form.value.answer,
      review:       this.step6Form.value.answer
    };
    console.log('Wizard submitted:', payload);
    // TODO: POST payload to your API endpoint
  }
}
