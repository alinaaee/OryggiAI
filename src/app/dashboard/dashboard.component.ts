//MATERIAL IMPORTS
import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';

//MATERIAL IMPORTS
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';

//OTHER IMPORTS(SERVICES AND OTHER COMPONENTS)
import { PromptBatchService } from '../services/prompt-batch.service';
import { DashboardCountsComponent } from './dashboard-counts/dashboard-counts.component';
import { RecentAnomaliesComponent } from './recent-anomalies/recent-anomalies.component';
import { HeaderComponent }    from '../common/header/header.component';
import { AnomalySeverityComponent } from "./anomaly-severity/anomaly-severity.component";
import { DeviceWiseSeverityComponent } from "./device-wise-severity/device-wise-severity.component";
import { TypeWiseSeverityComponent } from "./anomaly-severity/type-wise-severity/type-wise-severity.component";
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, DashboardCountsComponent, MatButtonModule, MatIconModule, RecentAnomaliesComponent, AnomalySeverityComponent, DeviceWiseSeverityComponent, TypeWiseSeverityComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  anomalies: any[]    = [];
  chartData: number[] = [0, 0, 0, 0];
  totalLogs = 0;
  totalAnomalies = 0;
  systemHealth = 0;
  constructor(private pbService: PromptBatchService, private dashboardService: DashboardService) {}

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
        console.log('today : ', parsed);
        this.totalLogs = parsed.totalLogs || 0;
        this.totalAnomalies = parsed.totalAnomalies || 0;
        this.systemHealth = parsed.systemHealth || 0;
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
    this.loadAiResponses('2025-06-27');
  }

  aiResponses: string[] = [];
  loadAiResponses(date: string): void {
    this.dashboardService.getAiResponsesByDate(date).subscribe({
      next: res => {
        this.aiResponses = res.aiResponses || [];
        console.log('by date logs:', res);
      },
      error: err => console.error('Error fetching AI responses', err)
    });
  }
}