import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { PromptBatchService } from '../services/prompt-batch.service';
import { DashboardCountsComponent } from './dashboard-counts/dashboard-counts.component';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { AnomalySeverityComponent } from './anomaly-severity/anomaly-severity.component';
import { RecentAnomaliesComponent } from './recent-anomalies/recent-anomalies.component';
import { HeaderComponent }    from '../common/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    DashboardCountsComponent,
    MatButtonModule,
    MatIconModule,
    AnomalySeverityComponent,
    RecentAnomaliesComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
 export class DashboardComponent implements OnInit {
  anomalies: any[]    = [];
  chartData: number[] = [0, 0, 0, 0];

  constructor(private pbService: PromptBatchService) {}

 // src/app/dashboard/dashboard.component.ts
ngOnInit() {
  this.pbService.getLatestAiResponse().subscribe({
    next: ({ aiResponse }) => {
      if (!aiResponse) return;

      let records: any[];
      try {
        // raw aiResponse is already a JSON array string: “[ { … }, { … }, … ]”
        records = JSON.parse(aiResponse);
      } catch (err) {
        console.error('Invalid JSON from AIResponse:', aiResponse, err);
        return;
      }

      // 1) Feed your grid
      this.anomalies = records;

      // 2) Tally up severities into [critical,high,medium,low]
      this.chartData = records.reduce(
        ([c,h,m,l], r: any) => {
          const s = (r.severity || '').toLowerCase();
          if (s === 'critical') c++;
          if (s === 'high')     h++;
          if (s === 'medium')   m++;
          if (s === 'low')      l++;
          return [c,h,m,l];
        },
        [0,0,0,0]
      );
    },
    error: err => console.error(err)
  });
}

}