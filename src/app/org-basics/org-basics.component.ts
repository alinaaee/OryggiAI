// src/app/org-basics/org-basics.component.ts
import { Component, OnInit }   from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { QuestionService, QuestionMaster } from '../services/question.service';
import { Router }               from '@angular/router';

@Component({
  selector: 'app-org-basics',
  standalone: true,
  // <-- import the modules, not NgForm
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './org-basics.component.html',
  styleUrls: ['./org-basics.component.css']
})
export class OrgBasicsComponent implements OnInit {
  private readonly COMPANY_NAME_ID = '4976f088-d090-407b-b63d-c3972976bacd';
  private readonly INDUSTRY_ID     = '4c1e3f88-cc71-4309-876b-dfb89634c941';
  private readonly EMP_COUNT_ID    = 'e6f59700-6e1b-47ff-9268-e0a9c11fe110';

  companyQuestion?: QuestionMaster;
  industryQuestion?: QuestionMaster;
  employeeCountQuestion?: QuestionMaster;

  companyName = '';
  industry    = '';
  employeeCount = 50;

  constructor(
    private qs: QuestionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.qs.getQuestions([
      this.COMPANY_NAME_ID,
      this.INDUSTRY_ID,
      this.EMP_COUNT_ID
    ]).subscribe(questions => {
      questions.forEach(q => {
        if (q.questionId === this.COMPANY_NAME_ID) {
          this.companyQuestion = q;
        }
        if (q.questionId === this.INDUSTRY_ID) {
          this.industryQuestion = q;
        }
        if (q.questionId === this.EMP_COUNT_ID) {
          this.employeeCountQuestion = q;
        }
      });
    });
  }

  next(form: any) {
    if (!form.valid) return;
    console.log('Org basics:', {
      companyName: this.companyName,
      industry: this.industry,
      employeeCount: this.employeeCount
    });
    this.router.navigate(['/tech']);
  }
}
