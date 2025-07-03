//MATERIAL IMPORTS
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule }       from '@angular/common';

//MATERIAL IMPORTS
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';

//OTHER IMPORTS(SERVICES AND OTHER COMPONENTS)
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
  constructor(private dashboardService: DashboardService) {}

  //#region [Variables]
    latestDate = '';
    anomalies: any[]    = [];
    chartData: number[] = [0, 0, 0, 0];
    totalLogs = 0;
    totalAnomalies = 0;
    systemHealth = 0;
    //previous day stats
    prevTotalLogs = 0;
    prevTotalAnomalies = 0;
    prevSystemHealth = 0;
    logsChange = 0;
    anomaliesChange = 0;
    healthChange = 0;
    @ViewChild('companyName') companyName!: HeaderComponent;
  //#endregion [Variables]

  ngOnInit() {
    this.getLatestAIResponse();
  }

  getLatestAIResponse(){
    this.dashboardService.getLatestAiResponse().subscribe({
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
        // console.log('today : ', parsed);
        this.totalLogs = parsed.totalLogs || 0;
        this.totalAnomalies = parsed.totalAnomalies || 0;
        this.systemHealth = parsed.systemHealth || 0;
        this.anomalies = parsed.anomalies || [];
        if (parsed.companyName) {
          this.dashboardService.companyName = parsed.companyName;
          this.companyName.getCompanyName();
        } 

        // Extract latest date from anomalies
        const latestTimestamp = this.anomalies.map(a => a.timestamp).sort().reverse()[0];
        this.latestDate = latestTimestamp?.split(' ')[0] || '';
        // console.log('Latest anomaly timestamp:', latestTimestamp, 'Latest date:', latestDate);

        // Get previous day date
        if (this.latestDate) {
          const prevDate = this.getPreviousDate(this.latestDate);
          // console.log('Previous date to fetch:', prevDate);
          this.getPreviousDayStats(prevDate);
        }

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

  getPreviousDayStats(prevDate: string) {
    this.dashboardService.getAiResponsesByDate(prevDate).subscribe({
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
        this.prevTotalLogs = parsed.totalLogs || 0;
        this.prevTotalAnomalies = parsed.totalAnomalies || 0;
        this.prevSystemHealth = parsed.systemHealth || 0;
        // Calculate percent change
        this.logsChange = this.getPercentChange(this.prevTotalLogs, this.totalLogs);
        this.anomaliesChange = this.getPercentChange(this.prevTotalAnomalies, this.totalAnomalies);
        this.healthChange = this.getPercentDifference(this.prevSystemHealth, this.systemHealth);
      },
      error: err => console.error(err)
    });
  }

  //#region [Utility Methods]
  getPreviousDate(dateStr: string): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);
    // Format as YYYY-MM-DD
    return date.toISOString().slice(0, 10);
  }

  getPercentChange(prev: number, curr: number): number {
    if (prev === 0) return curr === 0 ? 0 : 100;
    return ((curr - prev) / prev) * 100;
  }

  getPercentDifference(prev: number, curr: number): number {
    return curr - prev;
  }
  //#endregion [Utility Methods]
}