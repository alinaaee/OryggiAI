import { Component, OnInit }     from '@angular/core';
import { CommonModule }           from '@angular/common';
import { DashboardService }       from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-latest',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card bg-dark text-white p-3 rounded-4 mb-4">
      <h3>Latest AI Anomaly</h3>
      <pre *ngIf="aiResponse; else noData">{{ aiResponse }}</pre>
      <ng-template #noData><p>[No data available]</p></ng-template>
    </div>
  `,
  styles: [`
    .card { background-color: #292929; }
    pre { white-space: pre-wrap; margin: 0; }
  `]
})
export class DashboardLatestComponent implements OnInit {
  aiResponse = '';

  constructor(private svc: DashboardService) {}

  ngOnInit() {
    this.svc.getLatestResponse().subscribe({
      next: text => this.aiResponse = text,
      error: () => this.aiResponse = '[No data available]'
    });
  }
}
