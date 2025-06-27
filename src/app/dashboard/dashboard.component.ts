import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { PromptBatchService } from '../services/prompt-batch.service';
import { DashboardCountsComponent } from './dashboard-counts/dashboard-counts.component';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { RecentAnomaliesComponent } from './recent-anomalies/recent-anomalies.component';
import { HeaderComponent }    from '../common/header/header.component';
import { AnomalySeverityComponent } from "./anomaly-severity/anomaly-severity.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, DashboardCountsComponent, MatButtonModule, MatIconModule, RecentAnomaliesComponent, AnomalySeverityComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  anomalies: any[]    = [];
  chartData: number[] = [0, 0, 0, 0];
  totalLogs = 0;
  totalAnomalies = 0;
  constructor(private pbService: PromptBatchService) {}

  ngOnInit() {
    this.pbService.getLatestAiResponse().subscribe({
      next: (response) => {
        const { aiResponse } = response || {};  

        if (!aiResponse) return;

        let parsed: any;
        try {
          parsed = JSON.parse(aiResponse);
        } catch (err) {
          console.error('Invalid JSON from AIResponse:', aiResponse, err);
          return;
        }
        console.log(parsed);
        this.totalLogs = parsed.totalLogs || 0;
        this.totalAnomalies = parsed.totalAnomalies || 0;
        this.anomalies = parsed.anomalies || [];

        this.chartData = this.anomalies.reduce(
          ([c, h, m, l], r: any) => {
            const s = (r.severity || '').toLowerCase();
            if (s === 'critical') c++;
            if (s === 'high') h++;
            if (s === 'medium') m++;
            if (s === 'low') l++;
            return [c, h, m, l];
          },
          [0, 0, 0, 0]
        );
      },
      error: err => console.error(err)
    });
  }

}