//ANGULAR COMPONENTS
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

//MATERIAL COMPONENTS
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

//OTHER COMPONENTS AND SERVICES
import Swal from 'sweetalert2';
import { QuestionService } from '../services/question.service';
import { ErrorLoggerService } from '../services/error-logger.service';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionDto } from '../models/question.model';
import { ShiftModalComponent } from './shift-modal/shift-modal.component';
import { PAGE_KEYS } from '../generic classes/page-keys';

@Component({
  selector: 'app-question-analysis',
  imports: [CommonModule, MatStepperModule, MatButtonModule, QuestionFormComponent],
  templateUrl: './question-analysis.component.html',
  styleUrl: './question-analysis.component.css'
})
export class QuestionAnalysisComponent {
  constructor( private fb: FormBuilder, private questionService: QuestionService, private snackBar: MatSnackBar, private router: Router, private errorLog: ErrorLoggerService, private dialog: MatDialog) {}
  
  //#region [Variables]
    logo: string = 'assets/Logo/logo-Oryggi.png';
    allQuestions: QuestionDto[] = [];
    pageWiseQuestions: Record<string, QuestionDto[]> = {};
    forms: Record<string, FormGroup> = {};
    @ViewChild('stepper') stepper!: MatStepper;
    hiddenShiftQuestionID: string | null = null;
    shifts: { name: string; start: string; end: string }[] = [];
  //#endregion [Variables]

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(){
    this.questionService.getAllQuestions().subscribe({
      next: (questions) => {
        this.allQuestions = questions;
        this.pageWiseQuestions = questions.reduce((acc, q) => {
          acc[q.pageKey] = acc[q.pageKey] || [];
          acc[q.pageKey].push(q);
          return acc;
        }, {} as Record<string, QuestionDto[]>);

        Object.keys(this.pageWiseQuestions).forEach(pageKey => {
          const form = this.fb.group({});
          this.pageWiseQuestions[pageKey].forEach(q => {
            if (pageKey === PAGE_KEYS.HOURS && !q.isActive) {
              this.hiddenShiftQuestionID = q.questionID;
              form.addControl(q.questionID, this.fb.control(''));
            } else {
              form.addControl(q.questionID, this.fb.control('', q.required ? Validators.required : []));
            }
          });
          this.forms[pageKey] = form;
        });
      },
      error: (err) => this.errorLog.logError(err)
    });
  }

  getActiveQuestions(pageKey: string): QuestionDto[] {
    return (this.pageWiseQuestions[pageKey] || []).filter(q => q.isActive);
  }

  openShiftModal() {
    const dialogRef = this.dialog.open(ShiftModalComponent, {
      data: this.shifts,
      panelClass: ['md-screen-dialog']
    });

    dialogRef.afterClosed().subscribe(result => {
      if (Array.isArray(result)) {
        this.shifts = result;
        if (this.hiddenShiftQuestionID && this.forms[PAGE_KEYS.HOURS]) {
          const shiftData = JSON.stringify(this.shifts);
          this.forms[PAGE_KEYS.HOURS].patchValue({ [this.hiddenShiftQuestionID]: shiftData });
        }
      }
    });
  }
  
  saveAll() {
    const allAnswers: Record<string, Record<string, string>> = {};
    for (const pageKey of Object.keys(this.forms)) {
      const form = this.forms[pageKey];
      const questions = this.pageWiseQuestions[pageKey];
      const raw = form.value;
      const answers: Record<string, string> = {};
      const labelMap: Record<string, string> = {};
      questions.forEach(q => {
        q.answers?.forEach(a => labelMap[a.answerID] = a.answerText);
      });
      for (const key in raw) {
        const val = raw[key];
        if (val === undefined || val === null || val === '') continue;

        if (Array.isArray(val)) {
          const labels = val.map(v => labelMap[v] || v);
          answers[key] = labels.join(',');
        } else {
          answers[key] = labelMap[val] || String(val);
        }
      }
      if (Object.keys(answers).length === 0) {
        this.snackBar.open(`Please answer at least one question in ${pageKey} before saving.`, 'Close', { duration: 3000 });
        return;
      }
      allAnswers[pageKey] = answers;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save all the answers?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const requests = Object.entries(allAnswers).map(([pageKey, answers]) =>
          this.questionService.saveAnswers(pageKey, answers)
        );

        forkJoin(requests).subscribe({
          next: () => {
            this.snackBar.open('All answers have been saved.', 'Close', { duration: 3000 });
            this.router.navigate(['/dashboard']);
          },
          error: (err) => this.errorLog.logError(err)
        });
      }
    });
  }

  //#region [Stepper Navigation]
  nextStep() {
    if (this.stepper.selectedIndex < this.stepper._steps.length - 1) {
      this.stepper.next();
    }
  }

  previousStep() {
    if (this.stepper.selectedIndex > 0) {
      this.stepper.previous();
    }
  }
  //#endregion [Stepper Navigation]
}
